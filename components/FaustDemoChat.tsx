"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import { useRouter } from "next/navigation";

type Speaker = "User" | "Other Person";

type DriveSaveStatus = "pending" | "saved" | "failed";
type AnalysisStatus = "not_ready" | "queued" | "analyzing" | "done" | "failed";

type DemoMessage = {
  id: string;
  turn: number;
  speaker: Speaker;
  text: string;
  message_type?: "text" | "media";
  media_kind?: "image" | "video";
  media_url?: string | null;

  drive_status?: DriveSaveStatus;
  analysis_status?: AnalysisStatus;
  drive_error?: string | null;
  analysis_error?: string | null;

  drive_media_file_id?: string | null;
  drive_media_file_name?: string | null;
  drive_media_folder_id?: string | null;
  original_filename?: string | null;
  media_mime_type?: string | null;
};

type PendingMediaAttachment = {
  file: File;
  previewUrl: string;
  media_kind: "image" | "video";
  original_filename: string;
  mime_type: string | null;
};

type AnalysisJob = {
  id: string;
  turn: number;
  speaker: Speaker;
  text: string;
  message_type: "text" | "media";
  media_kind?: "image" | "video";
  filename?: string;
  image_base64?: string;
  frames_base64?: string[];

  drive_media_file_id?: string | null;
  drive_media_file_name?: string | null;
  drive_media_folder_id?: string | null;
  original_filename?: string | null;
  media_mime_type?: string | null;
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

type DriveStatus = {
  connected: boolean;
  folder_id?: string | null;
  folder_name?: string | null;
  google_account_email?: string | null;
  connected_at?: string | null;
  updated_at?: string | null;
};

type StoredDemoState = {
  demo_user_id: string;
  messages: DemoMessage[];
  turn: number;
  encrypted_state_token: string | null;
  usage: Usage | null;
  progress: Progress;
  alert: Alert;
  scam_status: ScamStatus;
  analysis_queue: AnalysisJob[];
};

type FaustDemoChatProps = {
  demoUserId?: string;
};

type DriveSnapshot = {
  version: "faust_frontend_snapshot_v1";
  demo_user_id: string;
  saved_at: string;
  demo_state: StoredDemoState;
};

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

function safeRandomId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}_${crypto.randomUUID()}`;
  }

  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function sanitizeStateForDrive(state: StoredDemoState): StoredDemoState {
  return {
    ...state,
    messages: state.messages.map((message) => ({
      ...message,
      media_url:
        message.message_type === "media" ? null : message.media_url || null,
    })),
    analysis_queue: (state.analysis_queue || []).filter(
      (job) => job.message_type === "text"
    ),
  };
}

function buildDriveSnapshot(
  state: StoredDemoState,
  demoUserId: string
): DriveSnapshot {
  return {
    version: "faust_frontend_snapshot_v1",
    demo_user_id: demoUserId,
    saved_at: new Date().toISOString(),
    demo_state: sanitizeStateForDrive(state),
  };
}

function normalizeRestoredState(
  value: unknown,
  demoUserId: string
): StoredDemoState | null {
  if (!value || typeof value !== "object") return null;

  const snapshot = value as Partial<DriveSnapshot>;

  if (snapshot.version !== "faust_frontend_snapshot_v1") return null;
  if (!snapshot.demo_state || typeof snapshot.demo_state !== "object") {
    return null;
  }

  const restored = snapshot.demo_state as Partial<StoredDemoState>;

  const messages = Array.isArray(restored.messages)
    ? restored.messages.map((message) => ({
        ...message,
        drive_status: message.drive_status || "saved",
        analysis_status: message.analysis_status || "done",
        drive_error: message.drive_error || null,
        analysis_error: message.analysis_error || null,
      }))
    : [];

  return {
    ...createDefaultState(demoUserId),
    ...restored,
    demo_user_id: demoUserId,
    messages,
    turn:
      typeof restored.turn === "number" && restored.turn > 0
        ? restored.turn
        : 1,
    encrypted_state_token: restored.encrypted_state_token || null,
    usage: restored.usage || null,
    progress: restored.progress || defaultProgress,
    alert: restored.alert || null,
    scam_status: restored.scam_status || "unclear",
    analysis_queue: Array.isArray(restored.analysis_queue)
      ? restored.analysis_queue
      : [],
  };
}

export default function FaustDemoChat({
  demoUserId = "stakeholder_demo",
}: FaustDemoChatProps) {
  const router = useRouter();

  const userMediaInputRef = useRef<HTMLInputElement | null>(null);
  const otherMediaInputRef = useRef<HTMLInputElement | null>(null);
  const saveTimerRef = useRef<number | null>(null);
  const restoreStartedRef = useRef(false);
  const lastSavedSnapshotRef = useRef<string>("");

  const [demoState, setDemoState] = useState<StoredDemoState>(() =>
    createDefaultState(demoUserId)
  );

  const [userText, setUserText] = useState("");
  const [otherText, setOtherText] = useState("");

  const [userPendingMedia, setUserPendingMedia] =
    useState<PendingMediaAttachment | null>(null);
  const [otherPendingMedia, setOtherPendingMedia] =
    useState<PendingMediaAttachment | null>(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [usageLoadedFromServer, setUsageLoadedFromServer] = useState(false);

  const [driveStatus, setDriveStatus] = useState<DriveStatus | null>(null);
  const [driveLoading, setDriveLoading] = useState(true);
  const [driveError, setDriveError] = useState<string | null>(null);
  const [driveRestoreComplete, setDriveRestoreComplete] = useState(false);
  const [isRestoringDriveBackup, setIsRestoringDriveBackup] = useState(false);
  const [isSavingDriveBackup, setIsSavingDriveBackup] = useState(false);
  const [driveSavingMessageId, setDriveSavingMessageId] = useState<
    string | null
  >(null);
  const [driveBackupNote, setDriveBackupNote] = useState<string | null>(null);

  const [isRestoringMedia, setIsRestoringMedia] = useState(false);
  const [mediaRestoreNote, setMediaRestoreNote] = useState<string | null>(null);

  const analysisQueue = demoState.analysis_queue || [];
  const usage = demoState.usage || defaultUsage;
  const progress = demoState.progress || defaultProgress;

  const driveConnected = Boolean(driveStatus?.connected);

  const messageLimitReached =
    usageLoadedFromServer && usage.messages_used >= usage.messages_limit;

  const pendingDriveTextMessages = demoState.messages.filter(
    (message) =>
      message.drive_status === "pending" && message.message_type !== "media"
  );

  const pendingDriveMessages = demoState.messages.filter(
    (message) => message.drive_status === "pending"
  );

  const canType =
    driveConnected &&
    driveRestoreComplete &&
    !isRestoringDriveBackup &&
    !messageLimitReached &&
    !isClearing;

  const canSendUser =
    canType && (userText.trim().length > 0 || Boolean(userPendingMedia));

  const canSendOther =
    canType && (otherText.trim().length > 0 || Boolean(otherPendingMedia));

  const reportHasPendingAnalysis =
    isAnalyzing ||
    analysisQueue.length > 0 ||
    pendingDriveMessages.length > 0 ||
    isSavingDriveBackup;

  async function saveSnapshotToDrive(state: StoredDemoState) {
    const snapshot = buildDriveSnapshot(state, demoUserId);

    const response = await fetch("/api/faust/drive/backup/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({
        snapshot,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.detail || data?.message || "Could not save backup.");
    }

    lastSavedSnapshotRef.current = JSON.stringify({
      version: snapshot.version,
      demo_user_id: snapshot.demo_user_id,
      demo_state: snapshot.demo_state,
    });

    return data;
  }

  async function restoreMediaPreviewsFromDrive(state: StoredDemoState) {
    const mediaMessagesToRestore = state.messages.filter(
      (message) =>
        message.message_type === "media" &&
        message.drive_status === "saved" &&
        message.drive_media_file_id &&
        !message.media_url
    );

    if (mediaMessagesToRestore.length === 0) {
      return state;
    }

    setIsRestoringMedia(true);
    setMediaRestoreNote("Restoring media previews...");

    let updatedState = state;

    for (const message of mediaMessagesToRestore) {
      try {
        const response = await fetch("/api/faust/drive/media/restore", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
          body: JSON.stringify({
            drive_file_id: message.drive_media_file_id,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.detail || data?.message || "Could not restore media."
          );
        }

        const mediaDataUrl = data?.media?.media_data_url;

        if (!mediaDataUrl) {
          throw new Error("Media restore response did not include media data.");
        }

        updatedState = {
          ...updatedState,
          messages: updatedState.messages.map((item) =>
            item.id === message.id
              ? {
                  ...item,
                  media_url: mediaDataUrl,
                  drive_error: null,
                }
              : item
          ),
        };
      } catch (error) {
        updatedState = {
          ...updatedState,
          messages: updatedState.messages.map((item) =>
            item.id === message.id
              ? {
                  ...item,
                  drive_error:
                    error instanceof Error
                      ? error.message
                      : "Could not restore media preview.",
                }
              : item
          ),
        };
      }
    }

    setIsRestoringMedia(false);
    setMediaRestoreNote("Media restored.");

    return updatedState;
  }

  function fileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Could not read file."));
        }
      };

      reader.onerror = () => reject(new Error("Could not read file."));
      reader.readAsDataURL(file);
    });
  }

  function seekVideo(video: HTMLVideoElement, time: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const onSeeked = () => {
        video.removeEventListener("seeked", onSeeked);
        video.removeEventListener("error", onError);
        resolve();
      };

      const onError = () => {
        video.removeEventListener("seeked", onSeeked);
        video.removeEventListener("error", onError);
        reject(new Error("Could not seek video."));
      };

      video.addEventListener("seeked", onSeeked);
      video.addEventListener("error", onError);
      video.currentTime = time;
    });
  }

  function extractVideoFrames(file: File, maxFrames = 4): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) {
        reject(new Error("Could not create video frame canvas."));
        return;
      }

      const objectUrl = URL.createObjectURL(file);
      const frames: string[] = [];

      video.preload = "metadata";
      video.muted = true;
      video.playsInline = true;
      video.src = objectUrl;

      function cleanup() {
        URL.revokeObjectURL(objectUrl);
      }

      video.onerror = () => {
        cleanup();
        reject(new Error("Could not load video file."));
      };

      video.onloadedmetadata = async () => {
        try {
          const duration = video.duration;

          if (!Number.isFinite(duration) || duration <= 0) {
            throw new Error("Could not read video duration.");
          }

          canvas.width = video.videoWidth || 640;
          canvas.height = video.videoHeight || 360;

          const sampleCount = Math.min(maxFrames, 4);
          const times =
            sampleCount === 1
              ? [Math.min(0.1, duration)]
              : Array.from({ length: sampleCount }, (_, index) => {
                  const ratio = (index + 1) / (sampleCount + 1);
                  return Math.max(
                    0.1,
                    Math.min(duration - 0.1, duration * ratio)
                  );
                });

          for (const time of times) {
            await seekVideo(video, time);
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            frames.push(canvas.toDataURL("image/png"));
          }

          cleanup();
          resolve(frames);
        } catch (error) {
          cleanup();
          reject(
            error instanceof Error
              ? error
              : new Error("Could not extract video frames.")
          );
        }
      };
    });
  }

  useEffect(() => {
    window.sessionStorage.setItem("faust_demo_user_id", demoUserId);

    if (demoState.encrypted_state_token) {
      window.sessionStorage.setItem(
        "faust_encrypted_state_token",
        demoState.encrypted_state_token
      );
    }
  }, [demoUserId, demoState.encrypted_state_token]);

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

  useEffect(() => {
    let cancelled = false;

    async function loadDriveStatus() {
      try {
        setDriveLoading(true);
        setDriveError(null);

        const response = await fetch("/api/faust/drive/status", {
          method: "POST",
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.detail || data?.message || "Could not load Drive status."
          );
        }

        if (!cancelled) {
          setDriveStatus(data.drive);
        }
      } catch (error) {
        if (!cancelled) {
          setDriveError(
            error instanceof Error
              ? error.message
              : "Could not load Drive status."
          );
        }
      } finally {
        if (!cancelled) {
          setDriveLoading(false);
        }
      }
    }

    loadDriveStatus();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!driveConnected) {
      setDriveRestoreComplete(false);
      restoreStartedRef.current = false;
      return;
    }

    if (restoreStartedRef.current) return;

    restoreStartedRef.current = true;

    async function restoreFromDrive() {
      try {
        setIsRestoringDriveBackup(true);
        setDriveBackupNote("Restoring conversation...");

        const response = await fetch("/api/faust/drive/backup/restore", {
          method: "POST",
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.detail || data?.message || "Could not restore conversation."
          );
        }

        const restored = data?.backup?.restored;
        const snapshot = data?.backup?.snapshot;

        if (restored && snapshot) {
          const restoredState = normalizeRestoredState(snapshot, demoUserId);

          if (restoredState) {
            const stateWithMedia = await restoreMediaPreviewsFromDrive(
              restoredState
            );

            setDemoState(stateWithMedia);

            lastSavedSnapshotRef.current = JSON.stringify({
              version: "faust_frontend_snapshot_v1",
              demo_user_id: demoUserId,
              demo_state: sanitizeStateForDrive(stateWithMedia),
            });

            setDriveBackupNote("Conversation restored.");
          } else {
            setDriveBackupNote("Could not read saved conversation.");
          }
        } else {
          setDriveBackupNote("Ready to start.");
        }

        setDriveRestoreComplete(true);
      } catch (error) {
        setDriveError(
          error instanceof Error
            ? error.message
            : "Could not restore conversation."
        );
        setDriveRestoreComplete(true);
      } finally {
        setIsRestoringDriveBackup(false);
      }
    }

    restoreFromDrive();
  }, [driveConnected, demoUserId]);

  useEffect(() => {
    if (!driveConnected) return;
    if (!driveRestoreComplete) return;
    if (isRestoringDriveBackup) return;
    if (driveSavingMessageId) return;

    const pendingMessage = demoState.messages.find(
      (message) =>
        message.drive_status === "pending" && message.message_type !== "media"
    );

    if (!pendingMessage) return;

    const messageToPersist = pendingMessage;

    async function persistPendingTextMessage() {
      setDriveSavingMessageId(messageToPersist.id);
      setIsSavingDriveBackup(true);
      setDriveBackupNote("Securing message...");

      try {
        await saveSnapshotToDrive(demoState);

        setDemoState((prev) => ({
          ...prev,
          messages: prev.messages.map((message) =>
            message.id === messageToPersist.id
              ? {
                  ...message,
                  drive_status: "saved",
                  analysis_status: "queued",
                  drive_error: null,
                }
              : message
          ),
          analysis_queue: [
            ...(prev.analysis_queue || []),
            {
              id: messageToPersist.id,
              turn: messageToPersist.turn,
              speaker: messageToPersist.speaker,
              text: messageToPersist.text,
              message_type: "text",
            },
          ],
        }));

        setDriveBackupNote("Message secured.");
      } catch (error) {
        setDemoState((prev) => ({
          ...prev,
          messages: prev.messages.map((message) =>
            message.id === messageToPersist.id
              ? {
                  ...message,
                  drive_status: "failed",
                  analysis_status: "not_ready",
                  drive_error:
                    error instanceof Error
                      ? error.message
                      : "Could not save securely.",
                }
              : message
          ),
        }));

        setDriveBackupNote("Could not save securely. Message was not checked.");
      } finally {
        setDriveSavingMessageId(null);
        setIsSavingDriveBackup(false);
      }
    }

    persistPendingTextMessage();
  }, [
    demoState,
    demoUserId,
    driveConnected,
    driveRestoreComplete,
    isRestoringDriveBackup,
    driveSavingMessageId,
  ]);

  useEffect(() => {
    if (!driveConnected) return;
    if (!driveRestoreComplete) return;
    if (isRestoringDriveBackup) return;
    if (driveSavingMessageId) return;
    if (pendingDriveTextMessages.length > 0) return;

    const safeState = sanitizeStateForDrive(demoState);

    const snapshotIdentity = JSON.stringify({
      version: "faust_frontend_snapshot_v1",
      demo_user_id: demoUserId,
      demo_state: safeState,
    });

    if (snapshotIdentity === lastSavedSnapshotRef.current) return;

    if (saveTimerRef.current) {
      window.clearTimeout(saveTimerRef.current);
    }

    saveTimerRef.current = window.setTimeout(async () => {
      try {
        setIsSavingDriveBackup(true);
        await saveSnapshotToDrive(demoState);
        setDriveBackupNote("Backup ready.");
      } catch (error) {
        setDriveError(
          error instanceof Error ? error.message : "Could not save backup."
        );
      } finally {
        setIsSavingDriveBackup(false);
      }
    }, 700);

    return () => {
      if (saveTimerRef.current) {
        window.clearTimeout(saveTimerRef.current);
      }
    };
  }, [
    demoState,
    demoUserId,
    driveConnected,
    driveRestoreComplete,
    isRestoringDriveBackup,
    driveSavingMessageId,
    pendingDriveTextMessages.length,
  ]);

  useEffect(() => {
    if (!driveConnected) return;
    if (!driveRestoreComplete) return;
    if (isAnalyzing) return;
    if (analysisQueue.length === 0) return;

    const nextJob = analysisQueue[0];

    async function analyzeNextJob() {
      setIsAnalyzing(true);
      setApiError(null);

      setDemoState((prev) => ({
        ...prev,
        messages: prev.messages.map((message) =>
          message.id === nextJob.id
            ? {
                ...message,
                analysis_status: "analyzing",
                analysis_error: null,
              }
            : message
        ),
      }));

      try {
        let response: Response;

        if (nextJob.message_type === "media") {
          const requestBody: Record<string, unknown> = {
            encrypted_state_token: demoState.encrypted_state_token,
            turn: nextJob.turn,
            speaker: nextJob.speaker,
            caption: nextJob.text,
            media_kind: nextJob.media_kind,
            filename: nextJob.filename || "uploaded_media",
            language: "English",

            message_id: nextJob.id,
            drive_media_file_id: nextJob.drive_media_file_id || null,
            drive_media_file_name: nextJob.drive_media_file_name || null,
            drive_media_folder_id: nextJob.drive_media_folder_id || null,
            original_filename: nextJob.original_filename || null,
            media_mime_type: nextJob.media_mime_type || null,
          };

          if (nextJob.media_kind === "image") {
            requestBody.image_base64 = nextJob.image_base64;
          } else {
            requestBody.frames_base64 = nextJob.frames_base64 || [];
          }

          response = await fetch("/api/faust/media/analyze-turn", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          });
        } else {
          response = await fetch("/api/faust/analyze-turn", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              demo_user_id: demoUserId,
              message: {
                turn: nextJob.turn,
                speaker: nextJob.speaker,
                text: nextJob.text,
                message_type: "text",
              },
              encrypted_state_token: demoState.encrypted_state_token,
              usage: null,
              language: "English",
            }),
          });
        }

        const contentType = response.headers.get("content-type") || "";

        let data: any = null;

        if (contentType.includes("application/json")) {
          data = await response.json();
        } else {
          const text = await response.text();
          throw new Error(
            `Safety check returned an unexpected response. Status: ${
              response.status
            }. Preview: ${text.slice(0, 160)}`
          );
        }

        if (!response.ok) {
          throw new Error(
            data?.detail || data?.message || "Safety check failed."
          );
        }

        setDemoState((prev) => ({
          ...prev,
          demo_user_id: demoUserId,
          encrypted_state_token: data.encrypted_state_token,
          usage: data.usage || prev.usage,
          progress: data.progress || prev.progress,
          alert: data.alert || null,
          scam_status: data.scam_status || prev.scam_status || "unclear",
          analysis_queue: (prev.analysis_queue || []).filter(
            (job) => job.id !== nextJob.id
          ),
          messages: prev.messages.map((message) =>
            message.id === nextJob.id
              ? {
                  ...message,
                  analysis_status: "done",
                  analysis_error: null,
                }
              : message
          ),
        }));

        setDriveBackupNote("Safety check complete.");
      } catch (error) {
        setApiError("Message not analyzed. Please try again later.");

        setDemoState((prev) => ({
          ...prev,
          analysis_queue: (prev.analysis_queue || []).filter(
            (job) => job.id !== nextJob.id
          ),
          messages: prev.messages.map((message) =>
            message.id === nextJob.id
              ? {
                  ...message,
                  analysis_status: "failed",
                  analysis_error: "Message not analyzed. Please try again later.",
                }
              : message
          ),
        }));
      } finally {
        setIsAnalyzing(false);
      }
    }

    analyzeNextJob();
  }, [
    analysisQueue,
    isAnalyzing,
    driveConnected,
    driveRestoreComplete,
    demoState.encrypted_state_token,
    demoUserId,
  ]);

  const queueLabel = useMemo(() => {
    if (!driveConnected) {
      return driveLoading ? "Checking Drive..." : "Google Drive required";
    }

    if (!driveRestoreComplete || isRestoringDriveBackup) {
      return "Restoring conversation";
    }

    if (isRestoringMedia) {
      return "Restoring media";
    }

    if (pendingDriveMessages.length > 0 || isSavingDriveBackup || isClearing) {
      return "Saving securely";
    }

    if (isAnalyzing || analysisQueue.length > 0) {
      return "Checking messages";
    }

    return "Ready";
  }, [
    analysisQueue.length,
    driveConnected,
    driveLoading,
    driveRestoreComplete,
    isAnalyzing,
    isClearing,
    isRestoringDriveBackup,
    isRestoringMedia,
    isSavingDriveBackup,
    pendingDriveMessages.length,
  ]);

  const reportButtonStyle = useMemo(() => {
    if (demoState.scam_status === "victim") {
      return {
        label: "Create Recovery Report",
        className:
          "w-full rounded-xl border border-red-400/70 bg-red-500/15 px-4 py-3 text-sm font-semibold text-red-100 shadow-[0_0_22px_rgba(248,113,113,0.35)] transition hover:bg-red-500/25 hover:shadow-[0_0_30px_rgba(248,113,113,0.5)] disabled:cursor-not-allowed disabled:opacity-50",
      };
    }

    if (demoState.scam_status === "at_risk") {
      return {
        label: "Create Safety Report",
        className:
          "w-full rounded-xl border border-yellow-300/70 bg-yellow-400/15 px-4 py-3 text-sm font-semibold text-yellow-100 shadow-[0_0_22px_rgba(250,204,21,0.28)] transition hover:bg-yellow-400/25 hover:shadow-[0_0_30px_rgba(250,204,21,0.42)] disabled:cursor-not-allowed disabled:opacity-50",
      };
    }

    return {
      label: "Create Report",
      className:
        "w-full rounded-xl bg-[#2EC4B6] px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#5bd8cd] disabled:cursor-not-allowed disabled:opacity-50",
    };
  }, [demoState.scam_status]);

  function connectGoogleDrive() {
    window.location.href = "/api/faust/drive/oauth/start";
  }

  async function deleteMediaFilesFromDrive(driveFileIds: string[]) {
    const uniqueFileIds = Array.from(
      new Set(
        driveFileIds
          .map((fileId) => String(fileId || "").trim())
          .filter(Boolean)
      )
    );

    if (uniqueFileIds.length === 0) {
      return;
    }

    const response = await fetch("/api/faust/drive/media/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({
        drive_file_ids: uniqueFileIds,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const detail = data?.detail;

      if (typeof detail === "string") {
        throw new Error(detail);
      }

      if (detail?.message) {
        throw new Error(detail.message);
      }

      throw new Error("Could not delete encrypted media from Drive.");
    }

    const failedFileIds = data?.delete_result?.failed_file_ids || [];

    if (Array.isArray(failedFileIds) && failedFileIds.length > 0) {
      throw new Error("Some encrypted media files could not be deleted.");
    }
  }

  async function clearConversation() {
    if (!driveConnected || !driveRestoreComplete || isClearing) return;

    const previousState = demoState;
    const fresh = createDefaultState(demoUserId);
    fresh.usage = previousState.usage;

    const mediaFileIds = previousState.messages
      .map((message) => message.drive_media_file_id)
      .filter((fileId): fileId is string => Boolean(fileId));

    try {
      setIsClearing(true);
      setApiError(null);
      setDriveError(null);

      if (mediaFileIds.length > 0) {
        setDriveBackupNote("Deleting encrypted media...");
        await deleteMediaFilesFromDrive(mediaFileIds);
      }

      setDriveBackupNote("Clearing conversation...");
      await saveSnapshotToDrive(fresh);

      setDemoState(fresh);
      setUserText("");
      setOtherText("");

      if (userPendingMedia?.previewUrl) {
        URL.revokeObjectURL(userPendingMedia.previewUrl);
      }

      if (otherPendingMedia?.previewUrl) {
        URL.revokeObjectURL(otherPendingMedia.previewUrl);
      }

      setUserPendingMedia(null);
      setOtherPendingMedia(null);
      setIsAnalyzing(false);
      setDriveBackupNote("Conversation cleared.");

      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem("faust_encrypted_state_token");
        window.sessionStorage.removeItem("faust_report_pending_analysis");
      }
    } catch (error) {
      setDemoState(previousState);

      const message =
        error instanceof Error
          ? error.message
          : "Could not clear the saved conversation.";

      setDriveError(message);

      setDriveBackupNote(
        "Could not fully clear the conversation from Drive. The chat was kept unchanged."
      );
    } finally {
      setIsClearing(false);
    }
  }

  function openReportBuilder() {
    if (!driveConnected) {
      setApiError("Connect Google Drive before creating a report.");
      return;
    }

    if (!demoState.encrypted_state_token || demoState.messages.length === 0) {
      setApiError(
        "No checked conversation is available yet. Send a message and wait for FAUST to check at least one turn."
      );
      return;
    }

    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("faust_demo_user_id", demoUserId);
      window.sessionStorage.setItem(
        "faust_encrypted_state_token",
        demoState.encrypted_state_token
      );

      window.sessionStorage.setItem(
        "faust_report_pending_analysis",
        reportHasPendingAnalysis ? "true" : "false"
      );
    }

    router.push("/faust-demo/report");
  }

  function openAccessRequest() {
    window.location.href = "/platform";
  }

  function sendTextTurn(speaker: Speaker) {
    const text = speaker === "User" ? userText.trim() : otherText.trim();

    if (!canType || !text) return;

    const id = safeRandomId("msg");

    setDemoState((prev) => {
      const message: DemoMessage = {
        id,
        turn: prev.turn,
        speaker,
        text,
        message_type: "text",
        drive_status: "pending",
        analysis_status: "not_ready",
        drive_error: null,
        analysis_error: null,
      };

      return {
        ...prev,
        demo_user_id: demoUserId,
        messages: [...prev.messages, message],
        turn: prev.turn + 1,
      };
    });

    if (speaker === "User") {
      setUserText("");
    } else {
      setOtherText("");
    }

    setApiError(null);
    setDriveBackupNote("Securing message...");
  }

  async function sendMediaTurn(
    speaker: Speaker,
    attachment: PendingMediaAttachment
  ) {
    if (!canType) return;

    const caption = speaker === "User" ? userText.trim() : otherText.trim();
    const id = safeRandomId("media");
    const previewUrl = attachment.previewUrl;
    const createdTurn = demoState.turn;

    setDemoState((prev) => {
      const message: DemoMessage = {
        id,
        turn: prev.turn,
        speaker,
        text: caption,
        message_type: "media",
        media_kind: attachment.media_kind,
        media_url: previewUrl,
        drive_status: "pending",
        analysis_status: "not_ready",
        drive_error: null,
        analysis_error: null,
        original_filename: attachment.original_filename,
        media_mime_type: attachment.mime_type,
        drive_media_file_id: null,
        drive_media_file_name: null,
        drive_media_folder_id: null,
      };

      return {
        ...prev,
        demo_user_id: demoUserId,
        messages: [...prev.messages, message],
        turn: prev.turn + 1,
      };
    });

    if (speaker === "User") {
      setUserText("");
      setUserPendingMedia(null);
    } else {
      setOtherText("");
      setOtherPendingMedia(null);
    }

    setApiError(null);
    setDriveBackupNote("Securing media...");

    try {
      const mediaBase64 = await fileToDataUrl(attachment.file);

      const mediaSaveResponse = await fetch("/api/faust/drive/media/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({
          message_id: id,
          turn: createdTurn,
          speaker,
          media_kind: attachment.media_kind,
          original_filename: attachment.original_filename,
          mime_type: attachment.mime_type,
          caption,
          media_base64: mediaBase64,
        }),
      });

      const mediaSaveData = await mediaSaveResponse.json();

      if (!mediaSaveResponse.ok) {
        throw new Error(
          mediaSaveData?.detail ||
            mediaSaveData?.message ||
            "Could not save media securely."
        );
      }

      const savedMedia = mediaSaveData.media;

      let framesBase64: string[] | undefined = undefined;

      if (attachment.media_kind === "video") {
        setDriveBackupNote("Preparing video for safety check...");
        framesBase64 = await extractVideoFrames(attachment.file, 4);
      }

      const analysisJob: AnalysisJob = {
        id,
        turn: createdTurn,
        speaker,
        text: caption,
        message_type: "media",
        media_kind: attachment.media_kind,
        filename: attachment.original_filename || "uploaded_media",
        image_base64:
          attachment.media_kind === "image" ? mediaBase64 : undefined,
        frames_base64:
          attachment.media_kind === "video" ? framesBase64 || [] : undefined,

        drive_media_file_id: savedMedia?.drive_file_id || null,
        drive_media_file_name: savedMedia?.drive_file_name || null,
        drive_media_folder_id: savedMedia?.drive_folder_id || null,
        original_filename:
          savedMedia?.original_filename || attachment.original_filename || null,
        media_mime_type: savedMedia?.mime_type || attachment.mime_type || null,
      };

      const nextStateForSnapshot = await new Promise<StoredDemoState>(
        (resolve) => {
          setDemoState((prev) => {
            const updated: StoredDemoState = {
              ...prev,
              demo_user_id: demoUserId,
              messages: prev.messages.map((message) =>
                message.id === id
                  ? {
                      ...message,
                      drive_status: "saved",
                      analysis_status: "queued",
                      drive_error: null,
                      drive_media_file_id: savedMedia?.drive_file_id || null,
                      drive_media_file_name: savedMedia?.drive_file_name || null,
                      drive_media_folder_id:
                        savedMedia?.drive_folder_id || null,
                      original_filename:
                        savedMedia?.original_filename ||
                        attachment.original_filename ||
                        null,
                      media_mime_type:
                        savedMedia?.mime_type || attachment.mime_type || null,
                    }
                  : message
              ),
              analysis_queue: [...(prev.analysis_queue || []), analysisJob],
            };

            resolve(updated);
            return updated;
          });
        }
      );

      setDriveBackupNote("Media secured.");

      try {
        await saveSnapshotToDrive(nextStateForSnapshot);
        setDriveBackupNote("Checking media...");
      } catch (error) {
        setDriveError(
          error instanceof Error
            ? error.message
            : "Could not save media conversation snapshot."
        );
      }
    } catch (error) {
      setDemoState((prev) => ({
        ...prev,
        messages: prev.messages.map((message) =>
          message.id === id
            ? {
                ...message,
                drive_status: "failed",
                analysis_status: "not_ready",
                drive_error:
                  error instanceof Error
                    ? error.message
                    : "Media could not be saved securely.",
              }
            : message
        ),
      }));

      setDriveBackupNote("Could not save media securely. It was not checked.");
    }
  }

  function sendTurn(speaker: Speaker) {
    const pendingMedia =
      speaker === "User" ? userPendingMedia : otherPendingMedia;

    if (pendingMedia) {
      sendMediaTurn(speaker, pendingMedia);
      return;
    }

    sendTextTurn(speaker);
  }

  function handleMediaFileSelected(
    speaker: Speaker,
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file || !canType) return;

    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (!isImage && !isVideo) {
      setApiError("Please upload an image or video file.");
      return;
    }

    const attachment: PendingMediaAttachment = {
      file,
      previewUrl: URL.createObjectURL(file),
      media_kind: isVideo ? "video" : "image",
      original_filename: file.name || "uploaded_media",
      mime_type: file.type || null,
    };

    if (speaker === "User") {
      if (userPendingMedia?.previewUrl) {
        URL.revokeObjectURL(userPendingMedia.previewUrl);
      }
      setUserPendingMedia(attachment);
    } else {
      if (otherPendingMedia?.previewUrl) {
        URL.revokeObjectURL(otherPendingMedia.previewUrl);
      }
      setOtherPendingMedia(attachment);
    }

    setApiError(null);
    setDriveBackupNote(null);
  }

  function removePendingMedia(speaker: Speaker) {
    if (speaker === "User") {
      if (userPendingMedia?.previewUrl) {
        URL.revokeObjectURL(userPendingMedia.previewUrl);
      }
      setUserPendingMedia(null);
    } else {
      if (otherPendingMedia?.previewUrl) {
        URL.revokeObjectURL(otherPendingMedia.previewUrl);
      }
      setOtherPendingMedia(null);
    }
  }

  function renderPendingMediaPreview(
    speaker: Speaker,
    attachment: PendingMediaAttachment | null
  ) {
    if (!attachment) return null;

    const isUser = speaker === "User";

    return (
      <div
        className={`mt-2 rounded-2xl border p-3 ${
          isUser
            ? "border-[#2EC4B6]/30 bg-[#2EC4B6]/10"
            : "border-red-400/30 bg-red-500/10"
        }`}
      >
        <div className="mb-2 flex items-center justify-between gap-3">
          <p
            className={`truncate text-xs ${
              isUser ? "text-[#8BE3DA]" : "text-red-200"
            }`}
          >
            Attached {attachment.media_kind}: {attachment.original_filename}
          </p>

          <button
            type="button"
            onClick={() => removePendingMedia(speaker)}
            className="shrink-0 text-xs text-slate-300 transition hover:text-white"
          >
            Remove
          </button>
        </div>

        {attachment.media_kind === "image" ? (
          <img
            src={attachment.previewUrl}
            alt="Pending media"
            className="max-h-40 rounded-xl object-contain"
          />
        ) : (
          <video
            src={attachment.previewUrl}
            controls
            className="max-h-40 rounded-xl"
          />
        )}

        <p className="mt-2 text-[11px] text-slate-400">
          Optional: add a caption, then send.
        </p>
      </div>
    );
  }

  const safetyStatus = isAnalyzing
    ? "Checking"
    : analysisQueue.length > 0
      ? "Waiting"
      : "Ready";

  const backupStatus = driveLoading
    ? "Checking"
    : driveConnected
      ? "Connected"
      : "Required";

  function renderMessageStatus(message: DemoMessage) {
    if (message.drive_status === "failed") {
      return (
        <span className="text-red-300">
          ⚠ Message not saved.
        </span>
      );
    }

    if (message.analysis_status === "failed" && message.drive_status === "saved") {
      return (
        <span className="text-yellow-300">
          ⚠ Message not analyzed.
        </span>
      );
    }

    if (message.analysis_status === "done") {
      return (
        <span
          className="font-semibold text-indigo-600"
          title="Saved and analyzed"
        >
          ✓✓
        </span>
      );
    }

    if (message.analysis_status === "analyzing") {
      return (
        <span className="text-indigo-600">
          ✓ Analyzing...
        </span>
      );
    }

    if (message.analysis_status === "queued") {
      return (
        <span className="text-indigo-600">
          ✓ Analyzing...
        </span>
      );
    }

    if (message.drive_status === "saved") {
      return (
        <span
          className="font-semibold text-indigo-600"
          title="Saved securely"
        >
          ✓
        </span>
      );
    }

    if (message.drive_status === "pending") {
      return (
        <span className="text-indigo-600">
          Securing...
        </span>
      );
    }

    return null;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl shadow-black/30 backdrop-blur">
        <div className="mb-4 flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Conversation Simulator
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Use Recipient for the person receiving the suspicious message. Use
              Sender for the person or account that may be trying to scam them.
            </p>
          </div>

          <div className="rounded-full border border-[#2EC4B6]/30 bg-[#2EC4B6]/10 px-3 py-1 text-xs font-medium text-[#8BE3DA]">
            {queueLabel}
          </div>
        </div>

        {!driveConnected && (
          <div className="mb-4 rounded-2xl border border-[#2EC4B6]/35 bg-[#2EC4B6]/10 p-5 text-sm text-slate-100">
            <p className="font-semibold text-[#8BE3DA]">
              Connect Google Drive to start
            </p>

            <p className="mt-2 leading-6 text-slate-200">
              FAUST saves this demo conversation privately to your Google Drive
              before checking messages.
            </p>

            <p className="mt-2 text-xs leading-5 text-slate-400">
              You stay in control. FAUST only uses limited Drive access for
              files it creates in this demo.
            </p>

            {driveError && (
              <p className="mt-3 rounded-xl border border-red-400/40 bg-red-500/10 px-3 py-2 text-xs text-red-200">
                {driveError}
              </p>
            )}

            <button
              type="button"
              onClick={connectGoogleDrive}
              disabled={driveLoading}
              className="mt-4 rounded-xl bg-[#2EC4B6] px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-[#5bd8cd] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {driveLoading ? "Checking Drive..." : "Connect Google Drive"}
            </button>
          </div>
        )}

        {driveConnected && (
          <div className="mb-4 rounded-2xl border border-emerald-400/25 bg-emerald-500/10 p-4 text-sm text-emerald-100">
            <p className="font-semibold text-emerald-200">
              Secure backup connected
            </p>

            <p className="mt-1 leading-6 text-slate-200">
              FAUST saves this conversation privately to your Google Drive.
            </p>

            {(driveBackupNote || mediaRestoreNote || isSavingDriveBackup) && (
              <p className="mt-2 text-xs leading-5 text-emerald-100/75">
                {isClearing
                  ? "Clearing conversation..."
                  : isSavingDriveBackup
                    ? "Saving securely..."
                    : isRestoringDriveBackup || isRestoringMedia
                      ? "Restoring conversation..."
                      : driveBackupNote || mediaRestoreNote || "Backup ready."}
              </p>
            )}
          </div>
        )}

        {messageLimitReached && (
          <div className="mb-4 rounded-2xl border border-[#2EC4B6]/35 bg-[#2EC4B6]/10 p-4 text-sm text-[#D7FFFB]">
            <p className="font-semibold text-[#8BE3DA]">Demo limit reached.</p>
            <p className="mt-1 leading-6 text-slate-200">
              FAUST has reached the message limit for this account. Request
              extended access if you need a longer evaluation.
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
            <p className="font-semibold">Notice</p>
            <p className="mt-1 leading-6">{apiError}</p>
          </div>
        )}

        <div className="h-[460px] overflow-y-auto rounded-2xl border border-white/10 bg-black/25 p-4">
          {demoState.messages.length === 0 ? (
            <div className="flex h-full items-center justify-center text-center">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5">
                <p className="text-sm font-semibold text-slate-200">
                  {driveConnected
                    ? driveRestoreComplete
                      ? "No messages yet."
                      : "Restoring conversation..."
                    : "Connect Google Drive to begin."}
                </p>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  {driveConnected
                    ? driveRestoreComplete
                      ? "Add a message to see how FAUST checks it."
                      : "Your saved conversation is being restored."
                    : "Your conversation will be saved securely before analysis."}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {demoState.messages.map((message) => {
                const isUser = message.speaker === "User";

                return (
                  <div
                    key={message.id}
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
                        Turn {message.turn} ·{" "}
                        {message.speaker === "User" ? "Recipient" : "Sender"}
                        {message.message_type === "media"
                          ? ` · ${message.media_kind || "media"}`
                          : ""}
                      </p>

                      {message.message_type === "media" &&
                        message.media_url &&
                        message.media_kind === "image" && (
                          <img
                            src={message.media_url}
                            alt="Uploaded media"
                            className="mb-2 max-h-64 rounded-xl object-contain"
                          />
                        )}

                      {message.message_type === "media" &&
                        message.media_url &&
                        message.media_kind === "video" && (
                          <video
                            src={message.media_url}
                            controls
                            className="mb-2 max-h-64 rounded-xl"
                          />
                        )}

                      {message.text.trim().length > 0 && (
                        <p className="whitespace-pre-wrap">{message.text}</p>
                      )}

                      <div
                        className={`mt-1 flex items-center justify-end gap-1 text-[11px] ${
                          isUser ? "text-slate-800/70" : "text-slate-400"
                        }`}
                      >
                        {renderMessageStatus(message)}
                      </div>
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
              placeholder={
                driveConnected
                  ? driveRestoreComplete
                    ? userPendingMedia
                      ? "Add an optional caption..."
                      : "Type as Recipient..."
                    : "Restoring conversation..."
                  : "Connect Google Drive to start..."
              }
              disabled={!canType}
              className="h-24 w-full resize-none rounded-2xl border border-white/10 bg-black/30 p-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-[#2EC4B6]/60 disabled:cursor-not-allowed disabled:opacity-50"
            />

            {renderPendingMediaPreview("User", userPendingMedia)}

            <div className="mt-2 grid grid-cols-[48px_1fr] gap-2">
              <input
                ref={userMediaInputRef}
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={(event) => handleMediaFileSelected("User", event)}
              />

              <button
                type="button"
                onClick={() => userMediaInputRef.current?.click()}
                disabled={!canType}
                title="Attach image or video as Recipient"
                className="rounded-xl border border-[#2EC4B6]/40 bg-[#2EC4B6]/10 px-4 py-3 text-lg font-bold text-[#8BE3DA] transition hover:bg-[#2EC4B6]/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                +
              </button>

              <button
                type="button"
                onClick={() => sendTurn("User")}
                disabled={!canSendUser}
                className="rounded-xl bg-[#2EC4B6] px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#5bd8cd] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Send as Recipient
              </button>
            </div>
          </div>

          <div>
            <textarea
              value={otherText}
              onChange={(event) => setOtherText(event.target.value)}
              placeholder={
                driveConnected
                  ? driveRestoreComplete
                    ? otherPendingMedia
                      ? "Add an optional caption..."
                      : "Type as Sender..."
                    : "Restoring conversation..."
                  : "Connect Google Drive to start..."
              }
              disabled={!canType}
              className="h-24 w-full resize-none rounded-2xl border border-white/10 bg-black/30 p-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-red-400/60 disabled:cursor-not-allowed disabled:opacity-50"
            />

            {renderPendingMediaPreview("Other Person", otherPendingMedia)}

            <div className="mt-2 grid grid-cols-[48px_1fr] gap-2">
              <input
                ref={otherMediaInputRef}
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={(event) =>
                  handleMediaFileSelected("Other Person", event)
                }
              />

              <button
                type="button"
                onClick={() => otherMediaInputRef.current?.click()}
                disabled={!canType}
                title="Attach image or video as Sender"
                className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-lg font-bold text-red-200 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                +
              </button>

              <button
                type="button"
                onClick={() => sendTurn("Other Person")}
                disabled={!canSendOther}
                className="rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Send as Sender
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={openReportBuilder}
            disabled={
              !driveConnected ||
              !driveRestoreComplete ||
              !demoState.encrypted_state_token ||
              demoState.messages.length === 0
            }
            className={reportButtonStyle.className}
          >
            {reportHasPendingAnalysis
              ? `${reportButtonStyle.label} · partial`
              : reportButtonStyle.label}
          </button>

          <button
            type="button"
            onClick={clearConversation}
            disabled={isClearing || !driveConnected || !driveRestoreComplete}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isClearing ? "Clearing..." : "Clear Chat"}
          </button>
        </div>
      </div>

      <aside className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl shadow-black/30 backdrop-blur">
        <h2 className="mb-4 text-lg font-semibold text-white">FAUST Status</h2>

        <div className="space-y-3 text-sm">
          <StatusCard label="Secure backup" value={backupStatus} />

          <StatusCard
            label="Messages"
            value={`${usage.messages_used} / ${usage.messages_limit}`}
          />

          <StatusCard label="Safety check" value={safetyStatus} />

          <StatusCard
            label="Conversation review"
            value={
              (progress.conversation_analyzed_turn || 0) > 0
                ? `Complete through Turn ${progress.conversation_analyzed_turn}`
                : "Waiting for context"
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
            <span className="font-semibold text-[#8BE3DA]">Recipient</span> is the
            FAUST user who may be at risk.
            <span className="ml-2 font-semibold text-red-200">Sender</span> is the
            person or account FAUST checks for scam risk.
          </p>

          <p className="pt-3 text-xs leading-5 text-slate-500">
            Video checks use sampled frames, not every moment of the video.
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