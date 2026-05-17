"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

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

type ScamStatus = "not_scammed" | "at_risk" | "victim" | "unclear";

type StoredDemoState = {
  demo_user_id: string;
  messages: DemoMessage[];
  turn: number;
  encrypted_state_token: string | null;
  usage: Usage | null;
  progress: Progress;
  alert: Alert;
  scam_status: ScamStatus;
  analysis_queue: DemoMessage[];
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
    scam_status: "unclear",
    analysis_queue: [],
  };
}

function loadStoredState(demoUserId: string): StoredDemoState {
  if (typeof window === "undefined") {
    return createDefaultState(demoUserId);
  }

  const storageKey = getStorageKey(demoUserId);
  const raw = window.localStorage.getItem(storageKey);

  if (!raw) {
    return createDefaultState(demoUserId);
  }

  try {
    const parsed = JSON.parse(raw) as StoredDemoState;

    return {
      ...createDefaultState(demoUserId),
      ...parsed,
      demo_user_id: parsed.demo_user_id || demoUserId,
      progress: parsed.progress || defaultProgress,
      usage: parsed.usage || null,
      scam_status: parsed.scam_status || "unclear",
      analysis_queue: parsed.analysis_queue || [],
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
  const router = useRouter();

  const [demoState, setDemoState] = useState<StoredDemoState>(() =>
    createDefaultState(demoUserId)
  );

  const [userText, setUserText] = useState("");
  const [otherText, setOtherText] = useState("");
  const [analysisHalted, setAnalysisHalted] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [usageLoadedFromServer, setUsageLoadedFromServer] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const analysisQueue = demoState.analysis_queue || [];

  useEffect(() => {
    setHasMounted(true);
    setDemoState(loadStoredState(demoUserId));
  }, [demoUserId]);

  useEffect(() => {
    if (!hasMounted) return;
    saveStoredState(demoState);
  }, [demoState, hasMounted]);

  useEffect(() => {
    if (!hasMounted) return;

    window.sessionStorage.setItem("faust_demo_user_id", demoUserId);

    if (demoState.encrypted_state_token) {
      window.sessionStorage.setItem(
        "faust_encrypted_state_token",
        demoState.encrypted_state_token
      );
    }
  }, [hasMounted, demoUserId, demoState.encrypted_state_token]);

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

  const usage = demoState.usage || defaultUsage;
  const progress = demoState.progress || defaultProgress;

  const messageLimitReached =
    usageLoadedFromServer && usage.messages_used >= usage.messages_limit;

  const hasPendingAnalysis =
    hasMounted && (isAnalyzing || analysisQueue.length > 0);

  const queueLabel = useMemo(() => {
    if (!hasMounted) {
      return "Queue empty";
    }

    const queuedTurns = analysisQueue.map((msg) => msg.turn);

    if (analysisHalted && queuedTurns.length > 0) {
      return `Analysis paused. ${queuedTurns.length} turn(s) waiting.`;
    }

    if (isAnalyzing) {
      return "FAUST is checking if this smells phishy...";
    }

    if (queuedTurns.length > 0) {
      return `Queued turns: ${queuedTurns.join(", ")}`;
    }

    return "Queue empty";
  }, [hasMounted, analysisQueue, isAnalyzing, analysisHalted]);

  function clearConversation() {
    const fresh = createDefaultState(demoUserId);
    fresh.usage = demoState.usage;

    setDemoState(fresh);
    setAnalysisHalted(false);
    setIsAnalyzing(false);
    setApiError(null);

    if (typeof window !== "undefined") {
      window.localStorage.removeItem(getStorageKey(demoUserId));
      window.sessionStorage.removeItem("faust_encrypted_state_token");
    }
  }

  function retryAnalysisQueue() {
    setApiError(null);
    setAnalysisHalted(false);
  }

  function openReportBuilder() {
    if (hasPendingAnalysis) {
      setApiError(
        "Please wait until FAUST finishes analyzing the queued messages before generating a report."
      );
      return;
    }

    if (!demoState.encrypted_state_token || demoState.messages.length === 0) {
      setApiError(
        "No analyzed conversation is available yet. Send a message and wait for FAUST to finish analyzing it."
      );
      return;
    }

    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("faust_demo_user_id", demoUserId);
      window.sessionStorage.setItem(
        "faust_encrypted_state_token",
        demoState.encrypted_state_token
      );
    }

    router.push("/faust-demo/report");
  }

  function openAccessRequest() {
    window.location.href = "/platform";
  }

  function sendMessage(speaker: Speaker) {
    if (messageLimitReached) return;

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
      analysis_queue: [...(demoState.analysis_queue || []), message],
    };

    setDemoState(updatedState);

    if (speaker === "User") {
      setUserText("");
    } else {
      setOtherText("");
    }

    setAnalysisHalted(false);
  }

  useEffect(() => {
    if (!hasMounted) return;
    if (isAnalyzing) return;
    if (analysisHalted) return;
    if (analysisQueue.length === 0) return;

    const nextMessage = analysisQueue[0];

    async function analyzeNextMessage() {
      setIsAnalyzing(true);
      setApiError(null);

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
          scam_status: data.scam_status || prev.scam_status || "unclear",
          analysis_queue: (prev.analysis_queue || []).filter(
            (msg) => msg.turn !== nextMessage.turn
          ),
        }));
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Could not reach the FAUST backend.";

        setApiError(message);
        setAnalysisHalted(true);
      } finally {
        setIsAnalyzing(false);
      }
    }

    analyzeNextMessage();
  }, [
    hasMounted,
    analysisQueue,
    analysisHalted,
    isAnalyzing,
    demoState.encrypted_state_token,
    demoUserId,
  ]);

  const reportButtonStyle = useMemo(() => {
    if (demoState.scam_status === "victim") {
      return {
        label: "Generate Recovery Report",
        className:
          "w-full rounded-xl border border-red-400/70 bg-red-500/15 px-4 py-3 text-sm font-semibold text-red-100 shadow-[0_0_22px_rgba(248,113,113,0.35)] transition hover:bg-red-500/25 hover:shadow-[0_0_30px_rgba(248,113,113,0.5)] disabled:cursor-not-allowed disabled:opacity-50",
      };
    }

    if (demoState.scam_status === "at_risk") {
      return {
        label: "Generate Safety Report",
        className:
          "w-full rounded-xl border border-yellow-300/70 bg-yellow-400/15 px-4 py-3 text-sm font-semibold text-yellow-100 shadow-[0_0_22px_rgba(250,204,21,0.28)] transition hover:bg-yellow-400/25 hover:shadow-[0_0_30px_rgba(250,204,21,0.42)] disabled:cursor-not-allowed disabled:opacity-50",
      };
    }

    return {
      label: "Generate Report",
      className:
        "w-full rounded-xl bg-[#2EC4B6] px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#5bd8cd] disabled:cursor-not-allowed disabled:opacity-50",
    };
  }, [demoState.scam_status]);

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

        {messageLimitReached && (
          <div className="mb-4 rounded-2xl border border-[#2EC4B6]/35 bg-[#2EC4B6]/10 p-4 text-sm text-[#D7FFFB]">
            <p className="font-semibold text-[#8BE3DA]">Demo limit reached.</p>
            <p className="mt-1 leading-6 text-slate-200">
              FAUST has done its shift for this account. Request extended access
              if you need a longer evaluation.
            </p>

            <button
              type="button"
              onClick={openAccessRequest}
              className="mt-3 rounded-xl bg-[#2EC4B6] px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-[#5bd8cd]"
            >
              Request extended access
            </button>
          </div>
        )}

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

            {analysisQueue.length > 0 && (
              <button
                type="button"
                onClick={retryAnalysisQueue}
                className="mt-3 rounded-xl bg-yellow-300 px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-yellow-200"
              >
                Retry queued analysis
              </button>
            )}
          </div>
        )}

        <div className="h-[460px] overflow-y-auto rounded-2xl border border-white/10 bg-black/25 p-4">
          {demoState.messages.length === 0 ? (
            <div className="flex h-full items-center justify-center text-center">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5">
                <p className="text-sm font-semibold text-slate-200">
                  No messages yet.
                </p>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Even scammers need a first turn.
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
              disabled={messageLimitReached}
              className="h-24 w-full resize-none rounded-2xl border border-white/10 bg-black/30 p-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-[#2EC4B6]/60 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => sendMessage("User")}
              disabled={messageLimitReached}
              className="mt-2 w-full rounded-xl bg-[#2EC4B6] px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#5bd8cd] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send as User
            </button>
          </div>

          <div>
            <textarea
              value={otherText}
              onChange={(event) => setOtherText(event.target.value)}
              placeholder="Type as Other Person..."
              disabled={messageLimitReached}
              className="h-24 w-full resize-none rounded-2xl border border-white/10 bg-black/30 p-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-red-400/60 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => sendMessage("Other Person")}
              disabled={messageLimitReached}
              className="mt-2 w-full rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send as Other Person
            </button>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={openReportBuilder}
            disabled={
              hasPendingAnalysis ||
              !demoState.encrypted_state_token ||
              demoState.messages.length === 0
            }
            className={reportButtonStyle.className}
          >
            {hasPendingAnalysis ? "Analyzing..." : reportButtonStyle.label}
          </button>

          <button
            type="button"
            onClick={clearConversation}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
          >
            Clear Conversation
          </button>
        </div>
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
            value={
              isAnalyzing
                ? "Analyzing"
                : analysisHalted
                  ? "Analysis paused"
                  : progress.analysis_status || "empty"
            }
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
            FAUST analyzes queued messages using an encrypted backend state
            token.
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