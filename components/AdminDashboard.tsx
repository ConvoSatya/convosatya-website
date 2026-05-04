"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type DemoAccount = {
  username: string;
  display_name: string | null;
  email: string | null;
  active: boolean;

  messages_limit: number;
  messages_used: number;

  verifier_credits_limit: number;
  verifier_credits_used: number;

  url_checks_limit: number;
  url_checks_used: number;

  contact_checks_limit: number;
  contact_checks_used: number;

  notes: string | null;
  created_at: string;
  updated_at: string;
};

type CreateAccountForm = {
  username: string;
  password: string;
  display_name: string;
  email: string;
  messages_limit: number;
  verifier_credits_limit: number;
  url_checks_limit: number;
  contact_checks_limit: number;
  notes: string;
};

const defaultCreateForm: CreateAccountForm = {
  username: "",
  password: "",
  display_name: "",
  email: "",
  messages_limit: 30,
  verifier_credits_limit: 20,
  url_checks_limit: 5,
  contact_checks_limit: 5,
  notes: "",
};

export default function AdminDashboard() {
  const router = useRouter();

  const [accounts, setAccounts] = useState<DemoAccount[]>([]);
  const [createForm, setCreateForm] =
    useState<CreateAccountForm>(defaultCreateForm);

  const [selectedUsername, setSelectedUsername] = useState<string | null>(null);
  const [editDrafts, setEditDrafts] = useState<Record<string, Partial<DemoAccount>>>(
    {}
  );

  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const selectedAccount = useMemo(() => {
    if (!selectedUsername) return null;
    return accounts.find((account) => account.username === selectedUsername) || null;
  }, [accounts, selectedUsername]);

  useEffect(() => {
    loadAccounts();
  }, []);

  async function loadAccounts() {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/admin/accounts", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to load accounts.");
      }

      const loadedAccounts = data?.accounts || [];
      setAccounts(loadedAccounts);

      if (!selectedUsername && loadedAccounts.length > 0) {
        setSelectedUsername(loadedAccounts[0].username);
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to load accounts."
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", {
      method: "POST",
    });

    router.push("/");
    router.refresh();
  }

  async function handleCreateAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsCreating(true);
    setErrorMessage("");
    setStatusMessage("");

    try {
      const response = await fetch("/api/admin/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: createForm.username.trim(),
          password: createForm.password,
          display_name: createForm.display_name.trim() || null,
          email: createForm.email.trim() || null,
          messages_limit: Number(createForm.messages_limit),
          verifier_credits_limit: Number(createForm.verifier_credits_limit),
          url_checks_limit: Number(createForm.url_checks_limit),
          contact_checks_limit: Number(createForm.contact_checks_limit),
          notes: createForm.notes.trim() || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.detail || data?.message || "Failed to create account.");
      }

      setCreateForm(defaultCreateForm);
      setStatusMessage(`Created account: ${data.account.username}`);
      await loadAccounts();
      setSelectedUsername(data.account.username);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to create account."
      );
    } finally {
      setIsCreating(false);
    }
  }

  async function handleSaveAccount(username: string) {
    const draft = editDrafts[username] || {};
    const current = accounts.find((account) => account.username === username);

    if (!current) return;

    setErrorMessage("");
    setStatusMessage("");

    try {
      const response = await fetch(
        `/api/admin/accounts/${encodeURIComponent(username)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            active:
              typeof draft.active === "boolean" ? draft.active : current.active,
            messages_limit: Number(
              draft.messages_limit ?? current.messages_limit
            ),
            verifier_credits_limit: Number(
              draft.verifier_credits_limit ?? current.verifier_credits_limit
            ),
            url_checks_limit: Number(
              draft.url_checks_limit ?? current.url_checks_limit
            ),
            contact_checks_limit: Number(
              draft.contact_checks_limit ?? current.contact_checks_limit
            ),
            notes:
              typeof draft.notes === "string" ? draft.notes : current.notes || "",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.detail || data?.message || "Failed to update account.");
      }

      setStatusMessage(`Updated account: ${username}`);

      setEditDrafts((prev) => {
        const copy = { ...prev };
        delete copy[username];
        return copy;
      });

      await loadAccounts();
      setSelectedUsername(username);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to update account."
      );
    }
  }

  async function handleResetUsage(username: string) {
    const confirmed = window.confirm(
      `Reset all usage counters for ${username}? This cannot be undone.`
    );

    if (!confirmed) return;

    setErrorMessage("");
    setStatusMessage("");

    try {
      const response = await fetch(
        `/api/admin/accounts/${encodeURIComponent(username)}/reset`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.detail || data?.message || "Failed to reset usage.");
      }

      setStatusMessage(`Reset usage for: ${username}`);
      await loadAccounts();
      setSelectedUsername(username);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to reset usage."
      );
    }
  }

  async function handleDeleteAccount(username: string) {
    const confirmed = window.confirm(
        `Delete account ${username}? This will permanently remove the stakeholder credential and usage record.`
    );

    if (!confirmed) return;

    const secondConfirmed = window.confirm(
        `Are you absolutely sure you want to delete ${username}?`
    );

    if (!secondConfirmed) return;

    setErrorMessage("");
    setStatusMessage("");

    try {
        const response = await fetch(
        `/api/admin/accounts/${encodeURIComponent(username)}`,
        {
            method: "DELETE",
        }
        );

        const data = await response.json();

        if (!response.ok) {
        throw new Error(data?.detail || data?.message || "Failed to delete account.");
        }

        setStatusMessage(`Deleted account: ${username}`);

        setSelectedUsername(null);

        await loadAccounts();
    } catch (error) {
        setErrorMessage(
        error instanceof Error ? error.message : "Failed to delete account."
        );
    }
    }

  function updateDraft(username: string, patch: Partial<DemoAccount>) {
    setEditDrafts((prev) => ({
      ...prev,
      [username]: {
        ...prev[username],
        ...patch,
      },
    }));
  }

  function getDraftValue<K extends keyof DemoAccount>(
    account: DemoAccount,
    key: K
  ): DemoAccount[K] {
    const draft = editDrafts[account.username];
    if (draft && key in draft) {
      return draft[key] as DemoAccount[K];
    }
    return account[key];
  }

  const totalMessagesUsed = accounts.reduce(
    (sum, account) => sum + account.messages_used,
    0
  );

  const totalVerifierCreditsUsed = accounts.reduce(
    (sum, account) => sum + account.verifier_credits_used,
    0
  );

  const activeAccounts = accounts.filter((account) => account.active).length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/30 backdrop-blur md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-4 inline-flex rounded-full border border-[#2EC4B6]/30 bg-[#2EC4B6]/10 px-4 py-2 text-sm font-medium text-[#2EC4B6]">
            Admin Dashboard
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Demo Access Manager
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            Create stakeholder credentials, adjust quota limits, activate or
            deactivate accounts, and reset usage counters.
          </p>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-200"
        >
          Admin logout
        </button>
      </div>

      {(statusMessage || errorMessage) && (
        <div
          className={`rounded-2xl border p-4 text-sm ${
            errorMessage
              ? "border-red-400/40 bg-red-500/10 text-red-100"
              : "border-[#2EC4B6]/40 bg-[#2EC4B6]/10 text-[#8BE3DA]"
          }`}
        >
          {errorMessage || statusMessage}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Accounts" value={`${accounts.length}`} sub={`${activeAccounts} active`} />
        <MetricCard label="Messages used" value={`${totalMessagesUsed}`} sub="Across all demo users" />
        <MetricCard label="Verifier credits used" value={`${totalVerifierCreditsUsed}`} sub="Across all demo users" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[390px_1fr]">
        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl shadow-black/30 backdrop-blur">
          <h2 className="text-lg font-semibold text-white">Create account</h2>
          <p className="mt-1 text-sm text-slate-400">
            Generate a username/password pair for an approved stakeholder.
          </p>

          <form onSubmit={handleCreateAccount} className="mt-5 space-y-4">
            <TextInput
              label="Username"
              value={createForm.username}
              onChange={(value) =>
                setCreateForm((prev) => ({ ...prev, username: value }))
              }
              placeholder="yc_demo_002"
              required
            />

            <TextInput
              label="Password"
              value={createForm.password}
              onChange={(value) =>
                setCreateForm((prev) => ({ ...prev, password: value }))
              }
              placeholder="Strong temporary password"
              type="password"
              required
            />

            <TextInput
              label="Display name"
              value={createForm.display_name}
              onChange={(value) =>
                setCreateForm((prev) => ({ ...prev, display_name: value }))
              }
              placeholder="Stakeholder name"
            />

            <TextInput
              label="Email"
              value={createForm.email}
              onChange={(value) =>
                setCreateForm((prev) => ({ ...prev, email: value }))
              }
              placeholder="person@example.com"
              type="email"
            />

            <div className="grid grid-cols-2 gap-3">
              <NumberInput
                label="Messages"
                value={createForm.messages_limit}
                onChange={(value) =>
                  setCreateForm((prev) => ({
                    ...prev,
                    messages_limit: value,
                  }))
                }
              />

              <NumberInput
                label="Verifier credits"
                value={createForm.verifier_credits_limit}
                onChange={(value) =>
                  setCreateForm((prev) => ({
                    ...prev,
                    verifier_credits_limit: value,
                  }))
                }
              />

              <NumberInput
                label="URL checks"
                value={createForm.url_checks_limit}
                onChange={(value) =>
                  setCreateForm((prev) => ({
                    ...prev,
                    url_checks_limit: value,
                  }))
                }
              />

              <NumberInput
                label="Contact checks"
                value={createForm.contact_checks_limit}
                onChange={(value) =>
                  setCreateForm((prev) => ({
                    ...prev,
                    contact_checks_limit: value,
                  }))
                }
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Notes
              </label>
              <textarea
                value={createForm.notes}
                onChange={(event) =>
                  setCreateForm((prev) => ({
                    ...prev,
                    notes: event.target.value,
                  }))
                }
                placeholder="Optional internal note"
                className="h-24 w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-[#2EC4B6]/60"
              />
            </div>

            <button
              type="submit"
              disabled={isCreating}
              className="w-full rounded-xl bg-[#2EC4B6] px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#5bd8cd] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isCreating ? "Creating..." : "Create credential"}
            </button>
          </form>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl shadow-black/30 backdrop-blur">
          <div className="mb-5 flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Demo accounts
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Select an account to update limits or reset usage.
              </p>
            </div>

            <button
              type="button"
              onClick={loadAccounts}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
            >
              Refresh
            </button>
          </div>

          {isLoading ? (
            <div className="rounded-2xl border border-white/10 bg-black/20 p-6 text-sm text-slate-400">
              Loading accounts...
            </div>
          ) : accounts.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-black/20 p-6 text-sm text-slate-400">
              No accounts yet. Create the first stakeholder credential.
            </div>
          ) : (
            <div className="grid gap-4 xl:grid-cols-[280px_1fr]">
              <div className="max-h-[640px] space-y-2 overflow-y-auto pr-1">
                {accounts.map((account) => (
                  <button
                    key={account.username}
                    type="button"
                    onClick={() => setSelectedUsername(account.username)}
                    className={`w-full rounded-2xl border p-4 text-left transition ${
                      selectedUsername === account.username
                        ? "border-[#2EC4B6]/50 bg-[#2EC4B6]/10"
                        : "border-white/10 bg-black/20 hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-white">
                        {account.username}
                      </p>
                      <span
                        className={`rounded-full px-2 py-1 text-[11px] font-semibold ${
                          account.active
                            ? "bg-emerald-400/10 text-emerald-300"
                            : "bg-red-400/10 text-red-300"
                        }`}
                      >
                        {account.active ? "Active" : "Inactive"}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-slate-500">
                      {account.display_name || account.email || "No display info"}
                    </p>

                    <div className="mt-3 space-y-1 text-xs text-slate-400">
                      <p>
                        Messages: {account.messages_used} /{" "}
                        {account.messages_limit}
                      </p>
                      <p>
                        Verifier: {account.verifier_credits_used} /{" "}
                        {account.verifier_credits_limit}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {selectedAccount ? (
                <AccountEditor
                    account={selectedAccount}
                    getDraftValue={getDraftValue}
                    updateDraft={updateDraft}
                    onSave={handleSaveAccount}
                    onReset={handleResetUsage}
                    onDelete={handleDeleteAccount}
                />
              ) : (
                <div className="rounded-2xl border border-white/10 bg-black/20 p-6 text-sm text-slate-400">
                  Select an account.
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function AccountEditor({
  account,
  getDraftValue,
  updateDraft,
  onSave,
  onReset,
  onDelete,
}: {
  account: DemoAccount;
  getDraftValue: <K extends keyof DemoAccount>(
    account: DemoAccount,
    key: K
  ) => DemoAccount[K];
  updateDraft: (username: string, patch: Partial<DemoAccount>) => void;
  onSave: (username: string) => void;
  onReset: (username: string) => void;
  onDelete: (username: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
      <div className="mb-5 flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">
            {account.username}
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Created {formatDate(account.created_at)}
          </p>
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input
            type="checkbox"
            checked={Boolean(getDraftValue(account, "active"))}
            onChange={(event) =>
              updateDraft(account.username, {
                active: event.target.checked,
              })
            }
            className="h-4 w-4 accent-[#2EC4B6]"
          />
          Active
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <ReadOnlyField label="Display name" value={account.display_name || "-"} />
        <ReadOnlyField label="Email" value={account.email || "-"} />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <EditableLimit
          label="Message limit"
          used={account.messages_used}
          value={Number(getDraftValue(account, "messages_limit"))}
          onChange={(value) =>
            updateDraft(account.username, { messages_limit: value })
          }
        />

        <EditableLimit
          label="Verifier credit limit"
          used={account.verifier_credits_used}
          value={Number(getDraftValue(account, "verifier_credits_limit"))}
          onChange={(value) =>
            updateDraft(account.username, {
              verifier_credits_limit: value,
            })
          }
        />

        <EditableLimit
          label="URL check limit"
          used={account.url_checks_used}
          value={Number(getDraftValue(account, "url_checks_limit"))}
          onChange={(value) =>
            updateDraft(account.username, { url_checks_limit: value })
          }
        />

        <EditableLimit
          label="Contact check limit"
          used={account.contact_checks_used}
          value={Number(getDraftValue(account, "contact_checks_limit"))}
          onChange={(value) =>
            updateDraft(account.username, { contact_checks_limit: value })
          }
        />
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Internal notes
        </label>
        <textarea
          value={String(getDraftValue(account, "notes") || "")}
          onChange={(event) =>
            updateDraft(account.username, { notes: event.target.value })
          }
          className="h-24 w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-[#2EC4B6]/60"
        />
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => onSave(account.username)}
          className="flex-1 rounded-xl bg-[#2EC4B6] px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#5bd8cd]"
        >
          Save changes
        </button>

        <button
          type="button"
          onClick={() => onReset(account.username)}
          className="flex-1 rounded-xl border border-yellow-400/30 bg-yellow-500/10 px-4 py-3 text-sm font-semibold text-yellow-100 transition hover:bg-yellow-500/20"
        >
          Reset usage
        </button>

        <button
            type="button"
            onClick={() => onDelete(account.username)}
            className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-100 transition hover:bg-red-500/20"
        >
            Delete account
        </button>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl shadow-black/30 backdrop-blur">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-bold text-white">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{sub}</p>
    </div>
  );
}

function TextInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-[#2EC4B6]/60"
      />
    </div>
  );
}

function NumberInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-slate-300">
        {label}
      </label>
      <input
        type="number"
        min={0}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full rounded-2xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white outline-none focus:border-[#2EC4B6]/60"
      />
    </div>
  );
}

function EditableLimit({
  label,
  used,
  value,
  onChange,
}: {
  label: string;
  used: number;
  value: number;
  onChange: (value: number) => void;
}) {
  const percent = value > 0 ? Math.min(100, Math.round((used / value) * 100)) : 0;

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <label className="text-sm font-medium text-slate-300">{label}</label>
        <span className="text-xs text-slate-500">
          Used {used} / {value}
        </span>
      </div>

      <input
        type="number"
        min={0}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-[#2EC4B6]/60"
      />

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-[#2EC4B6]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-medium text-slate-200">{value}</p>
    </div>
  );
}

function formatDate(value: string) {
  if (!value || value === "None") return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString();
}