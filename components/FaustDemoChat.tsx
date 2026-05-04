"use client";

import { useEffect, useMemo, useState } from "react";

type Speaker = "User" | "Other Person";

type DemoMessage = {
  turn: number;
  speaker: Speaker;
  text: string;
};

type Usage = {
  messages_used: number;
  messages_limit: number;
  verifier_credits_used: number;
  verifier_credits_limit: number;
  url_checks_used: number;
  url_checks_limit: number;
  contact_checks_used: number;
  contact_checks_limit: number;
};

type Progress = {
  latest_turn: number;
  message_pipeline_analyzed_turn: number;
  conversation_analyzed_turn: number;
  fully_analyzed_turn: number;
  pending_turns: number[];
  analysis_status: string;
};

type Alert = {
  source: string;
  message: string;
  severity?: string;
} | null;

type StoredDemoState = {
  demo_user_id: string;
  messages: DemoMessage[];
  turn: number;
  encrypted_state_token: string | null;
  usage: Usage | null;
  progress: Progress;
  alert: Alert;
};

type FaustDemoChatProps = {
  demoUserId?: string;
};

const STORAGE_KEY_PREFIX = "faustcloud_demo_v1";

const defaultProgress: Progress = {
  latest_turn: 0,
  message_pipeline_analyzed_turn: 0,
  conversation_analyzed_turn: 0,
  fully_analyzed_turn: 0,
  pending_turns: [],
  analysis_status: "empty",
};

const defaultUsage: Usage = {
  messages_used: 0,
  messages_limit: 30,
  verifier_credits_used: 0,
  verifier_credits_limit: 20,
  url_checks_used: 0,
  url_checks_limit: 5,
  contact_checks_used: 0,
  contact_checks_limit: 5,
};

function getStorageKey(demoUserId: string) {
  return `${STORAGE_KEY_PREFIX}_${demoUserId}`;
}

function createDefaultState(
  demoUserId: string = "stakeholder_demo"
): StoredDemoState {
  return {
    demo_user_id: demoUserId,
    messages: [],
    turn: 1,
    encrypted_state_token: null,
    usage: null,
    progress: defaultProgress,
    alert: null,
  };
}

function loadStoredState(demoUserId: string): StoredDemoState {
  if (typeof window === "undefined") {
    return createDefaultState(demoUserId);
  }

  const storageKey = getStorageKey(demoUserId);
  const raw = window.localStorage.getItem(storageKey);

  if (!raw) return createDefaultState(demoUserId);

  try {
    const parsed = JSON.parse(raw) as StoredDemoState;

    return {
      ...createDefaultState(demoUserId),
      ...parsed,
      demo_user_id: parsed.demo_user_id || demoUserId,
      progress: parsed.progress || defaultProgress,
      usage: parsed.usage || null,
    };
  } catch {
    return createDefaultState(demoUserId);
  }
}

function saveStoredState(state: StoredDemoState) {
  if (typeof window === "undefined") return;

  const storageKey = getStorageKey(state.demo_user_id || "stakeholder_demo");
  window.localStorage.setItem(storageKey, JSON.stringify(state));
}

export default function FaustDemoChat({
  demoUserId = "stakeholder_demo",
}: FaustDemoChatProps) {
  const [demoState, setDemoState] = useState<StoredDemoState>(() =>
    loadStoredState(demoUserId)
  );

  const [userText, setUserText] = useState("");
  const [otherText, setOtherText] = useState("");
  const [analysisQueue, setAnalysisQueue] = useState<DemoMessage[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [usageLoadedFromServer, setUsageLoadedFromServer] = useState(false);

  /**
   * 1. Load browser-stored conversation state first.
   * This restores visible messages and encrypted_state_token.
   */
  useEffect(() => {
    saveStoredState(demoState);
  }, [demoState]);

  /**
   * 2. Then fetch authoritative quota/usage from the server.
   * This prevents localStorage from showing stale 0 / 30 usage.
   */
  useEffect(() => {
    let cancelled = false;

    async function loadServerUsage() {
      try {
        const response = await fetch("/api/session", {
          cache: "no-store",
        });

        const data = await response.json();

        if (cancelled) return;

        if (data?.usage) {
          setDemoState((prev) => ({
            ...prev,
            demo_user_id: demoUserId,
            usage: data.usage,
          }));
        }

        setUsageLoadedFromServer(true);
      } catch {
        if (!cancelled) {
          setUsageLoadedFromServer(true);
        }
      }
    }

    loadServerUsage();

    return () => {
      cancelled = true;
    };
  }, [demoUserId]);

  /**
   * 3. Save state to localStorage after local/server state updates.
   * This stores visible chat and encrypted token, but quota is always refreshed
   * again from /api/session when the page opens.
   */
  useEffect(() => {
    saveStoredState(demoState);
  }, [demoState]);

  const usage = demoState.usage || defaultUsage;
  const progress = demoState.progress || defaultProgress;

  const queueLabel = useMemo(() => {
    const queuedTurns = analysisQueue.map((msg) => msg.turn);

    if (isAnalyzing && queuedTurns.length > 0) {
      return `Analyzing now · queued turns: ${queuedTurns.join(", ")}`;
    }

    if (isAnalyzing) {
      return "Analyzing latest message";
    }

    if (queuedTurns.length > 0) {
      return `Queued turns: ${queuedTurns.join(", ")}`;
    }

    return "Queue empty";
  }, [analysisQueue, isAnalyzing]);

  function clearConversation() {
    const fresh = createDefaultState(demoUserId);

    /**
     * Keep the server quota visible after clearing the local conversation.
     * Clear Conversation should reset chat/state only, not database usage.
     */
    fresh.usage = demoState.usage;

    setDemoState(fresh);
    setAnalysisQueue([]);
    setIsAnalyzing(false);
    setApiError(null);

    if (typeof window !== "undefined") {
      window.localStorage.removeItem(getStorageKey(demoUserId));
    }
  }

  function sendMessage(speaker: Speaker) {
    const text = speaker === "User" ? userText.trim() : otherText.trim();
    if (!text) return;

    const message: DemoMessage = {
      turn: demoState.turn,
      speaker,
      text,
    };

    const updatedState: StoredDemoState = {
      ...demoState,
      demo_user_id: demoUserId,
      messages: [...demoState.messages, message],
      turn: demoState.turn + 1,
    };

    setDemoState(updatedState);

    if (speaker === "User") {
      setUserText("");
    } else {
      setOtherText("");
    }

    setAnalysisQueue((prev) => [...prev, message]);
  }

  /**
   * Frontend mutex queue:
   * messages appear instantly, but backend analysis runs one message at a time.
   */
  useEffect(() => {
    if (isAnalyzing) return;
    if (analysisQueue.length === 0) return;

    const [nextMessage, ...remaining] = analysisQueue;

    async function analyzeNextMessage() {
      setIsAnalyzing(true);
      setApiError(null);
      setAnalysisQueue(remaining);

      try {
        const response = await fetch("/api/faust/analyze-turn", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            demo_user_id: demoUserId,
            message: nextMessage,
            encrypted_state_token: demoState.encrypted_state_token,
            usage: null,
            language: "English",
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.detail || data?.message || "Analysis request failed."
          );
        }

        setDemoState((prev) => ({
          ...prev,
          demo_user_id: demoUserId,
          encrypted_state_token: data.encrypted_state_token,
          usage: data.usage,
          progress: data.progress,
          alert: data.alert || null,
        }));
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Could not reach the FAUST backend.";

        setApiError(message);
      } finally {
        setIsAnalyzing(false);
      }
    }

    analyzeNextMessage();
  }, [analysisQueue, isAnalyzing, demoState, demoUserId]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl shadow-black/30 backdrop-blur">
        <div className="mb-4 flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Conversation Simulator
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Send messages as the user or the other person.
            </p>
          </div>

          <div className="rounded-full border border-[#2EC4B6]/30 bg-[#2EC4B6]/10 px-3 py-1 text-xs font-medium text-[#8BE3DA]">
            {queueLabel}
          </div>
        </div>

        {demoState.alert && (
          <div className="mb-4 rounded-2xl border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-100">
            <p className="font-semibold text-red-200">
              {demoState.alert.source}
            </p>
            <p className="mt-1 leading-6">{demoState.alert.message}</p>
          </div>
        )}

        {apiError && (
          <div className="mb-4 rounded-2xl border border-yellow-400/40 bg-yellow-500/10 p-4 text-sm text-yellow-100">
            <p className="font-semibold">Backend connection issue</p>
            <p className="mt-1 leading-6">{apiError}</p>
          </div>
        )}

        <div className="h-[460px] overflow-y-auto rounded-2xl border border-white/10 bg-black/25 p-4">
          {demoState.messages.length === 0 ? (
            <div className="flex h-full items-center justify-center text-center">
              <div>
                <p className="text-sm font-medium text-slate-300">
                  No messages yet.
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  Start by sending a message from either side.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {demoState.messages.map((message) => {
                const isUser = message.speaker === "User";

                return (
                  <div
                    key={message.turn}
                    className={`flex ${
                      isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                        isUser
                          ? "bg-[#2EC4B6] text-slate-950"
                          : "bg-slate-800 text-slate-100"
                      }`}
                    >
                      <p className="mb-1 text-[11px] font-medium opacity-70">
                        Turn {message.turn} · {message.speaker}
                      </p>
                      <p>{message.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div>
            <textarea
              value={userText}
              onChange={(event) => setUserText(event.target.value)}
              placeholder="Type as User..."
              className="h-24 w-full resize-none rounded-2xl border border-white/10 bg-black/30 p-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-[#2EC4B6]/60"
            />
            <button
              type="button"
              onClick={() => sendMessage("User")}
              className="mt-2 w-full rounded-xl bg-[#2EC4B6] px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#5bd8cd]"
            >
              Send as User
            </button>
          </div>

          <div>
            <textarea
              value={otherText}
              onChange={(event) => setOtherText(event.target.value)}
              placeholder="Type as Other Person..."
              className="h-24 w-full resize-none rounded-2xl border border-white/10 bg-black/30 p-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-red-400/60"
            />
            <button
              type="button"
              onClick={() => sendMessage("Other Person")}
              className="mt-2 w-full rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-400"
            >
              Send as Other Person
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={clearConversation}
          className="mt-4 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
        >
          Clear Conversation
        </button>
      </div>

      <aside className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl shadow-black/30 backdrop-blur">
        <h2 className="mb-4 text-lg font-semibold text-white">
          Analysis Status
        </h2>

        <div className="space-y-3 text-sm">
          <StatusCard
            label="Latest turn"
            value={`${progress.latest_turn || demoState.messages.length}`}
          />

          <StatusCard
            label="Message checks"
            value={`Complete through Turn ${
              progress.message_pipeline_analyzed_turn || 0
            }`}
          />

          <StatusCard
            label="Conversation review"
            value={
              (progress.conversation_analyzed_turn || 0) > 0
                ? `Complete through Turn ${progress.conversation_analyzed_turn}`
                : "Waiting for context"
            }
          />

          <StatusCard
            label="Full review"
            value={
              (progress.conversation_analyzed_turn || 0) > 0
                ? `Complete through Turn ${progress.fully_analyzed_turn || 0}`
                : "Waiting for enough context"
            }
          />

          <StatusCard
            label="Status"
            value={isAnalyzing ? "Analyzing" : progress.analysis_status || "empty"}
          />

          <div className="mt-6 rounded-2xl border border-[#2EC4B6]/20 bg-[#2EC4B6]/10 p-4">
            <p className="text-sm text-[#8BE3DA]">Demo usage</p>

            {!usageLoadedFromServer && (
              <p className="mt-2 text-xs text-slate-400">
                Loading latest quota...
              </p>
            )}

            <div className="mt-3 space-y-2 text-sm text-slate-200">
              <UsageRow
                label="Messages"
                used={usage.messages_used}
                limit={usage.messages_limit}
              />

              <UsageRow
                label="Verifier credits"
                used={usage.verifier_credits_used}
                limit={usage.verifier_credits_limit}
              />

              <UsageRow
                label="URL checks"
                used={usage.url_checks_used}
                limit={usage.url_checks_limit}
              />

              <UsageRow
                label="Contact checks"
                used={usage.contact_checks_used}
                limit={usage.contact_checks_limit}
              />
            </div>
          </div>

          <p className="pt-3 text-xs leading-5 text-slate-500">
            Messages appear instantly. FAUST analyzes queued messages one at a
            time using an encrypted backend state token.
          </p>
        </div>
      </aside>
    </div>
  );
}

function StatusCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-medium text-slate-200">{value}</p>
    </div>
  );
}

function UsageRow({
  label,
  used,
  limit,
}: {
  label: string;
  used: number;
  limit: number;
}) {
  const percent =
    limit > 0 ? Math.min(100, Math.round((used / limit) * 100)) : 0;

  return (
    <div>
      <div className="mb-1 flex justify-between">
        <span>{label}</span>
        <span>
          {used} / {limit}
        </span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-black/30">
        <div
          className="h-full rounded-full bg-[#2EC4B6]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}