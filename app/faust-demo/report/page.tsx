"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type ReportDraft = {
  generated_at?: string;
  user_location?: string;
  incident_status?: string;
  scam_status?: string;
  scam_type?: string;
  threat_level?: string;
  incident_summary?: string;
  extracted_evidence?: {
    urls?: string[];
    phone_numbers?: string[];
    emails?: string[];
    claimed_brands?: string[];
    verification_notes?: string[];
    money_lost?: boolean;
    money_lost_amounts?: string[];
    payment_methods?: string[];
  };
  conversation_transcript?: string;
  recovery_checklist?: string[];
  copy_paste_report_text?: string;
  report_files?: Record<string, string>;
};

function listToLines(value?: string[]): string {
  return Array.isArray(value) ? value.join("\n") : "";
}

function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();

  a.remove();
  window.URL.revokeObjectURL(url);
}

export default function FaustReportPage() {
  const [encryptedStateToken, setEncryptedStateToken] = useState<string | null>(
    null
  );
  const [openedWithPendingAnalysis, setOpenedWithPendingAnalysis] =
    useState(false);

  const [location, setLocation] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [incidentStatus, setIncidentStatus] = useState("");

  const [report, setReport] = useState<ReportDraft | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloadingZip, setIsDownloadingZip] = useState(false);
  const [error, setError] = useState("");

  const [editableIncidentStatus, setEditableIncidentStatus] = useState("");
  const [editableScamStatus, setEditableScamStatus] = useState("");
  const [editableScamType, setEditableScamType] = useState("");
  const [editableIncidentSummary, setEditableIncidentSummary] = useState("");
  const [editableMoneyLost, setEditableMoneyLost] = useState(false);
  const [editableMoneyAmounts, setEditableMoneyAmounts] = useState("");
  const [editablePaymentMethods, setEditablePaymentMethods] = useState("");
  const [editableUrls, setEditableUrls] = useState("");
  const [editablePhones, setEditablePhones] = useState("");
  const [editableEmails, setEditableEmails] = useState("");
  const [editableClaimedIdentities, setEditableClaimedIdentities] =
    useState("");
  const [editableVerificationNotes, setEditableVerificationNotes] =
    useState("");
  const [editableRecoveryChecklist, setEditableRecoveryChecklist] =
    useState("");
  const [editableTranscript, setEditableTranscript] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const token = window.sessionStorage.getItem("faust_encrypted_state_token");
      const pendingFlag =
        window.sessionStorage.getItem("faust_report_pending_analysis") === "true";

      setEncryptedStateToken(token);
      setOpenedWithPendingAnalysis(pendingFlag);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  function hydrateEditableFields(draft: ReportDraft) {
    const evidence = draft.extracted_evidence || {};

    setEditableIncidentStatus(draft.incident_status || "");
    setEditableScamStatus(draft.scam_status || "");
    setEditableScamType(draft.scam_type || "");
    setEditableIncidentSummary(draft.incident_summary || "");
    setEditableMoneyLost(Boolean(evidence.money_lost));
    setEditableMoneyAmounts(listToLines(evidence.money_lost_amounts));
    setEditablePaymentMethods(listToLines(evidence.payment_methods));
    setEditableUrls(listToLines(evidence.urls));
    setEditablePhones(listToLines(evidence.phone_numbers));
    setEditableEmails(listToLines(evidence.emails));
    setEditableClaimedIdentities(listToLines(evidence.claimed_brands));
    setEditableVerificationNotes(listToLines(evidence.verification_notes));
    setEditableRecoveryChecklist(listToLines(draft.recovery_checklist));
    setEditableTranscript(draft.conversation_transcript || "");
  }

  async function generateDraft() {
    if (!encryptedStateToken) {
      setError(
        "No conversation state found. Return to the demo and generate a report after sending messages."
      );
      return;
    }

    setIsGenerating(true);
    setError("");

    try {
      const response = await fetch("/api/faust/report/draft", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          encrypted_state_token: encryptedStateToken,
          user_location: location,
          incident_status: incidentStatus,
          additional_details: additionalDetails,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.detail || data?.message || "Could not generate report draft."
        );
      }

      const draft = data.report as ReportDraft;
      setReport(draft);
      hydrateEditableFields(draft);
      setIncidentStatus(draft.incident_status || "");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not generate report draft."
      );
    } finally {
      setIsGenerating(false);
    }
  }

  async function downloadBackendZipPackage() {
    if (!encryptedStateToken) {
      setError("No conversation state found.");
      return;
    }

    setIsDownloadingZip(true);
    setError("");

    try {
      const response = await fetch("/api/faust/report/package", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          encrypted_state_token: encryptedStateToken,
          user_location: location,
          incident_status: incidentStatus,
          additional_details: additionalDetails,
        }),
      });

      if (!response.ok) {
        let message = "Could not download report package.";

        try {
          const data = await response.json();
          message = data?.detail || data?.message || message;
        } catch {
          // Keep default message.
        }

        throw new Error(message);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const contentDisposition = response.headers.get("content-disposition");
      const filenameMatch = contentDisposition?.match(/filename="?([^"]+)"?/i);
      const filename = filenameMatch?.[1] || "faust_report_package.zip";

      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not download report package."
      );
    } finally {
      setIsDownloadingZip(false);
    }
  }

  const incidentSummaryFile = useMemo(() => {
    return `FAUST INCIDENT SUMMARY

Location / jurisdiction:
${location || "Not provided"}

Incident status:
${editableIncidentStatus || "Not provided"}

Scam status:
${editableScamStatus || "Not provided"}

Suspected scam type:
${editableScamType || "Not provided"}

Financial loss:
${editableMoneyLost ? "Yes" : "No or not confirmed"}

Money amount(s):
${editableMoneyAmounts || "- None identified"}

Payment method(s):
${editablePaymentMethods || "- None identified"}

Claimed brands / identities:
${editableClaimedIdentities || "- None identified"}

Incident summary:
${editableIncidentSummary || "No incident summary available."}

Additional details from user:
${additionalDetails || "None provided"}
`;
  }, [
    location,
    editableIncidentStatus,
    editableScamStatus,
    editableScamType,
    editableMoneyLost,
    editableMoneyAmounts,
    editablePaymentMethods,
    editableClaimedIdentities,
    editableIncidentSummary,
    additionalDetails,
  ]);

  const evidenceSummaryFile = useMemo(() => {
    return `FAUST EVIDENCE SUMMARY

Financial loss:
${editableMoneyLost ? "Yes" : "No or not confirmed"}

Money amount(s):
${editableMoneyAmounts || "- None identified"}

Payment method(s):
${editablePaymentMethods || "- None identified"}

URLs:
${editableUrls || "- None identified"}

Phone numbers:
${editablePhones || "- None identified"}

Emails:
${editableEmails || "- None identified"}

Claimed brands / identities:
${editableClaimedIdentities || "- None identified"}

Verification notes:
${editableVerificationNotes || "- None identified"}
`;
  }, [
    editableMoneyLost,
    editableMoneyAmounts,
    editablePaymentMethods,
    editableUrls,
    editablePhones,
    editableEmails,
    editableClaimedIdentities,
    editableVerificationNotes,
  ]);

  const transcriptFile = useMemo(() => {
    return `FAUST CONVERSATION TRANSCRIPT

${editableTranscript || "No conversation transcript available."}
`;
  }, [editableTranscript]);

  const recoveryChecklistFile = useMemo(() => {
    return `FAUST RECOVERY CHECKLIST

${editableRecoveryChecklist || "- No recovery checklist available."}
`;
  }, [editableRecoveryChecklist]);

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <Navbar />

      <section className="relative overflow-hidden px-6 pb-20 pt-32 sm:px-8 lg:px-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(46,196,182,0.18),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_35%)]" />

        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <Link
              href="/faust-demo"
              className="mb-5 inline-flex text-sm font-medium text-[#2EC4B6] hover:text-[#5bd8cd]"
            >
              ← Back to FAUST demo
            </Link>

            <div className="mb-4 inline-flex rounded-full border border-[#2EC4B6]/30 bg-[#2EC4B6]/10 px-4 py-2 text-sm font-medium text-[#2EC4B6]">
              FAUST Reporting
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Build a scam report package
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
              Generate an editable report draft from the current FAUST demo
              conversation, then download separate files for the incident
              summary, evidence, transcript, and recovery checklist.
            </p>
          </div>

          {!encryptedStateToken && (
            <div className="rounded-3xl border border-yellow-400/30 bg-yellow-500/10 p-6 text-yellow-100">
              <p className="font-semibold">No conversation found for reporting.</p>
              <p className="mt-2 text-sm leading-6">
                Return to the FAUST demo, send a few messages, and generate a
                report after the backend has analyzed the conversation.
              </p>
            </div>
          )}

          {openedWithPendingAnalysis && encryptedStateToken && (
            <div className="mb-6 rounded-3xl border border-yellow-300/40 bg-yellow-400/10 p-5 text-yellow-100">
              <p className="font-semibold">This may be a partial report.</p>
              <p className="mt-2 text-sm leading-6 text-yellow-50/90">
                Some messages were still waiting for analysis when this report
                was opened. The draft may not include the latest queued turns
                yet. Return to the demo page to let FAUST finish analyzing the
                rest of the conversation.
              </p>
            </div>
          )}

          {encryptedStateToken && (
            <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
              <aside className="h-fit rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl shadow-black/30 backdrop-blur">
                <h2 className="text-lg font-semibold text-white">
                  Report setup
                </h2>

                <div className="mt-5 space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Location / jurisdiction
                    </label>
                    <input
                      value={location}
                      onChange={(event) => setLocation(event.target.value)}
                      placeholder="San Francisco, CA, USA"
                      className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-[#2EC4B6]/60"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Incident status
                    </label>
                    <select
                      value={incidentStatus}
                      onChange={(event) =>
                        setIncidentStatus(event.target.value)
                      }
                      className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-[#2EC4B6]/60"
                    >
                      <option value="successful_scam">Successful scam</option>
                      <option value="attempted_scam">Attempted scam</option>
                      <option value="unclear">Unclear</option>
                      <option value="user_reported_concern">
                        User-reported concern
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Additional details
                    </label>
                    <textarea
                      value={additionalDetails}
                      onChange={(event) =>
                        setAdditionalDetails(event.target.value)
                      }
                      placeholder="Add details the conversation may not show, such as transaction hashes, screenshots, platform used, or bank contact status."
                      className="h-32 w-full resize-none rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-[#2EC4B6]/60"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={generateDraft}
                    disabled={isGenerating}
                    className="w-full rounded-xl bg-[#2EC4B6] px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#5bd8cd] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isGenerating ? "Generating..." : "Generate report draft"}
                  </button>

                  <button
                    type="button"
                    onClick={downloadBackendZipPackage}
                    disabled={isDownloadingZip}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isDownloadingZip
                      ? "Preparing ZIP..."
                      : "Download backend ZIP"}
                  </button>

                  <p className="text-xs leading-5 text-slate-500">
                    The ZIP uses the backend-generated report. The individual
                    TXT downloads below use your edits on this page.
                  </p>
                </div>

                {error && (
                  <div className="mt-5 rounded-2xl border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-100">
                    {error}
                  </div>
                )}
              </aside>

              <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl shadow-black/30 backdrop-blur">
                {!report ? (
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-8 text-center">
                    <p className="text-lg font-semibold text-white">
                      No report draft generated yet.
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      Enter a location if available, then generate the draft.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <EditableSection title="Incident details">
                      <Field label="Incident status">
                        <input
                          value={editableIncidentStatus}
                          onChange={(e) =>
                            setEditableIncidentStatus(e.target.value)
                          }
                          className="report-input"
                        />
                      </Field>

                      <Field label="Scam status">
                        <input
                          value={editableScamStatus}
                          onChange={(e) =>
                            setEditableScamStatus(e.target.value)
                          }
                          className="report-input"
                        />
                      </Field>

                      <Field label="Suspected scam type">
                        <input
                          value={editableScamType}
                          onChange={(e) => setEditableScamType(e.target.value)}
                          className="report-input"
                        />
                      </Field>

                      <Field label="Incident summary">
                        <textarea
                          value={editableIncidentSummary}
                          onChange={(e) =>
                            setEditableIncidentSummary(e.target.value)
                          }
                          className="report-textarea h-40"
                        />
                      </Field>
                    </EditableSection>

                    <EditableSection title="Financial loss">
                      <label className="flex items-center gap-3 text-sm text-slate-200">
                        <input
                          type="checkbox"
                          checked={editableMoneyLost}
                          onChange={(e) =>
                            setEditableMoneyLost(e.target.checked)
                          }
                          className="h-4 w-4"
                        />
                        Money was lost or sent
                      </label>

                      <Field label="Money amount(s), one per line">
                        <textarea
                          value={editableMoneyAmounts}
                          onChange={(e) =>
                            setEditableMoneyAmounts(e.target.value)
                          }
                          className="report-textarea h-24"
                        />
                      </Field>

                      <Field label="Payment method(s), one per line">
                        <textarea
                          value={editablePaymentMethods}
                          onChange={(e) =>
                            setEditablePaymentMethods(e.target.value)
                          }
                          className="report-textarea h-24"
                        />
                      </Field>
                    </EditableSection>

                    <EditableSection title="Evidence">
                      <Field label="URLs, one per line">
                        <textarea
                          value={editableUrls}
                          onChange={(e) => setEditableUrls(e.target.value)}
                          className="report-textarea h-24"
                        />
                      </Field>

                      <Field label="Phone numbers, one per line">
                        <textarea
                          value={editablePhones}
                          onChange={(e) => setEditablePhones(e.target.value)}
                          className="report-textarea h-24"
                        />
                      </Field>

                      <Field label="Emails, one per line">
                        <textarea
                          value={editableEmails}
                          onChange={(e) => setEditableEmails(e.target.value)}
                          className="report-textarea h-24"
                        />
                      </Field>

                      <Field label="Claimed brands / identities, one per line">
                        <textarea
                          value={editableClaimedIdentities}
                          onChange={(e) =>
                            setEditableClaimedIdentities(e.target.value)
                          }
                          className="report-textarea h-24"
                        />
                      </Field>

                      <Field label="Verification notes">
                        <textarea
                          value={editableVerificationNotes}
                          onChange={(e) =>
                            setEditableVerificationNotes(e.target.value)
                          }
                          className="report-textarea h-32"
                        />
                      </Field>
                    </EditableSection>

                    <EditableSection title="Transcript and recovery">
                      <Field label="Conversation transcript">
                        <textarea
                          value={editableTranscript}
                          onChange={(e) =>
                            setEditableTranscript(e.target.value)
                          }
                          className="report-textarea h-64"
                        />
                      </Field>

                      <Field label="Recovery checklist">
                        <textarea
                          value={editableRecoveryChecklist}
                          onChange={(e) =>
                            setEditableRecoveryChecklist(e.target.value)
                          }
                          className="report-textarea h-40"
                        />
                      </Field>
                    </EditableSection>

                    <EditableSection title="Download edited TXT files">
                      <div className="grid gap-3 sm:grid-cols-2">
                        <DownloadButton
                          label="Download incident summary"
                          onClick={() =>
                            downloadTextFile(
                              "01_incident_summary.txt",
                              incidentSummaryFile
                            )
                          }
                        />
                        <DownloadButton
                          label="Download evidence summary"
                          onClick={() =>
                            downloadTextFile(
                              "02_evidence_summary.txt",
                              evidenceSummaryFile
                            )
                          }
                        />
                        <DownloadButton
                          label="Download transcript"
                          onClick={() =>
                            downloadTextFile(
                              "03_conversation_transcript.txt",
                              transcriptFile
                            )
                          }
                        />
                        <DownloadButton
                          label="Download recovery checklist"
                          onClick={() =>
                            downloadTextFile(
                              "04_recovery_checklist.txt",
                              recoveryChecklistFile
                            )
                          }
                        />
                      </div>
                    </EditableSection>
                  </div>
                )}
              </section>
            </div>
          )}
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        .report-input {
          width: 100%;
          border-radius: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(0, 0, 0, 0.3);
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          color: white;
          outline: none;
        }

        .report-input:focus {
          border-color: rgba(46, 196, 182, 0.6);
        }

        .report-textarea {
          width: 100%;
          resize: vertical;
          border-radius: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(0, 0, 0, 0.3);
          padding: 1rem;
          font-size: 0.875rem;
          line-height: 1.6;
          color: white;
          outline: none;
        }

        .report-textarea:focus {
          border-color: rgba(46, 196, 182, 0.6);
        }
      `}</style>
    </main>
  );
}

function EditableSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
      <h2 className="mb-4 text-lg font-semibold text-white">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </span>
      {children}
    </label>
  );
}

function DownloadButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-xl bg-[#2EC4B6] px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#5bd8cd]"
    >
      {label}
    </button>
  );
}