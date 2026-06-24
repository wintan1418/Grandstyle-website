import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { marked } from "marked";
import RichEditor from "../components/RichEditor";
import { adminApi, type PostDraft } from "../lib/adminApi";
import { uploadImage, cloudinaryConfigured } from "../lib/cloudinary";
import { sanityConfigured, type Post } from "../lib/sanity";

const PW_KEY = "gs_admin_pw";
const AUTHOR_KEY = "gs_default_author";
const DATASET = (import.meta.env.VITE_SANITY_DATASET as string) || "production";

// Posts now store HTML. Older posts were authored in Markdown — convert those
// to HTML when loading them into the editor so they show formatted.
const looksLikeHtml = (s: string) => /<\/?[a-z][\s\S]*>/i.test(s);
const toEditorHtml = (body: string) => {
  if (!body) return "";
  return looksLikeHtml(body)
    ? body
    : (marked.parse(body, { async: false }) as string);
};

const emptyDraft = (): PostDraft => ({
  title: "",
  slug: "",
  excerpt: "",
  category: "",
  coverImageUrl: "",
  body: "",
  author:
    (typeof localStorage !== "undefined" && localStorage.getItem(AUTHOR_KEY)) ||
    "",
  publishedAt: new Date().toISOString().slice(0, 10),
  status: "draft",
});

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");

const fmtLong = (iso?: string) => {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
};

// Derive the list pill state: draft / live / scheduled (published in future).
type PillState = "draft" | "live" | "scheduled";
const pillOf = (p: Post): PillState => {
  if (p.status !== "published") return "draft";
  if (p.publishedAt && new Date(p.publishedAt).getTime() > Date.now())
    return "scheduled";
  return "live";
};
const PILL: Record<PillState, { label: string; cls: string }> = {
  draft: { label: "DRAFT", cls: "text-[#9a6a18] bg-[#F4E7CB]" },
  live: { label: "LIVE", cls: "text-[#2f6b46] bg-[#DDEBDD]" },
  scheduled: { label: "SCHEDULED", cls: "text-[#6e5f4c] bg-[#E6DCCB]" },
};

const labelCls =
  "text-[11px] font-bold uppercase tracking-[0.18em] text-[#A6303A]";
// Bordered, clearly-editable field used across the editor sidebar + settings.
const sideField =
  "w-full rounded-[7px] border border-[#cdbfa9] bg-[#F3ECE0] px-3 py-2 text-[14px] text-[#231C16] transition-colors focus:border-[#A6303A] focus:outline-none placeholder:text-[#a99a85]";

type Filter = "all" | "published" | "draft";
type View = "dashboard" | "posts" | "media" | "settings";

// Extract every image URL referenced by the posts (covers + inline body imgs).
const collectMedia = (posts: Post[]) => {
  const set = new Set<string>();
  posts.forEach((p) => {
    if (p.coverImageUrl) set.add(p.coverImageUrl);
    const body = p.body || "";
    const re = /<img[^>]+src="([^"]+)"/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(body))) set.add(m[1]);
  });
  return Array.from(set);
};

// ── Left navigation rail (shared) ────────────────────────────────
const RailIcon = ({ d }: { d: React.ReactNode }) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
);

const NAV: { key: View; label: string; icon: React.ReactNode }[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
  },
  {
    key: "posts",
    label: "Posts",
    icon: (
      <>
        <path d="M6 3h8l4 4v14H6z" />
        <path d="M14 3v4h4" />
        <path d="M9 12h6M9 16h5" />
      </>
    ),
  },
  {
    key: "media",
    label: "Media",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="8.5" cy="9.5" r="1.6" />
        <path d="M21 16l-5-5L4 20" />
      </>
    ),
  },
  {
    key: "settings",
    label: "Settings",
    icon: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.5 5.5l2 2M16.5 16.5l2 2M18.5 5.5l-2 2M7.5 16.5l-2 2" />
      </>
    ),
  },
];

const Rail = ({
  view,
  onNavigate,
  onLogout,
}: {
  view: View;
  onNavigate: (v: View) => void;
  onLogout: () => void;
}) => {
  const item = (active: boolean) =>
    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] text-left transition-colors ${
      active
        ? "bg-[rgba(201,154,91,0.18)] font-semibold text-[#F3E7D8]"
        : "text-[#caa78f] hover:bg-[rgba(231,214,198,0.08)] hover:text-[#F3E7D8]"
    }`;
  return (
    <aside className="hidden w-[212px] flex-none flex-col bg-[#4E1A21] px-[18px] py-[26px] text-[#E7D6C6] md:flex">
      <div className="font-spectral border-b border-[rgba(231,214,198,0.16)] px-2 pb-[22px] text-[21px] leading-[1.05] text-[#F3E7D8]">
        Grandstyle
        <br />
        <span className="text-[#C99A5B]">Journal</span>
      </div>

      <nav className="mt-[18px] flex flex-col gap-[3px]">
        {NAV.map((n) => (
          <button
            key={n.key}
            onClick={() => onNavigate(n.key)}
            className={item(view === n.key)}
          >
            <RailIcon d={n.icon} />
            {n.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto border-t border-[rgba(231,214,198,0.16)] pt-3">
        <div className="flex items-center gap-2.5 px-2 py-2">
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#C99A5B] text-[13px] font-bold text-[#4E1A21]">
            GE
          </div>
          <div className="text-[12.5px] leading-tight">
            <div className="font-semibold text-[#F3E7D8]">Editorial team</div>
            <div className="text-[#a98870]">grandstyle</div>
          </div>
        </div>
        <div className="mt-1 flex items-center gap-4 px-2 text-[12px]">
          <Link to="/" className="text-[#caa78f] transition-colors hover:text-[#F3E7D8]">
            View site ↗
          </Link>
          <button
            onClick={onLogout}
            className="text-[#caa78f] transition-colors hover:text-[#F3E7D8]"
          >
            Log out
          </button>
        </div>
      </div>
    </aside>
  );
};

// Mobile burgundy bar with a compact nav (rail is hidden below md).
const MobileBar = ({
  view,
  onNavigate,
  onLogout,
}: {
  view: View;
  onNavigate: (v: View) => void;
  onLogout: () => void;
}) => (
  <div className="bg-[#4E1A21] px-4 py-3 text-[#E7D6C6] md:hidden">
    <div className="flex items-center justify-between">
      <span className="font-spectral text-[17px] text-[#F3E7D8]">
        Grandstyle <span className="text-[#C99A5B]">Journal</span>
      </span>
      <div className="flex items-center gap-3 text-[12px]">
        <Link to="/" className="text-[#caa78f]">
          View site ↗
        </Link>
        <button onClick={onLogout} className="text-[#caa78f]">
          Log out
        </button>
      </div>
    </div>
    <div className="mt-2 flex gap-1.5 overflow-x-auto">
      {NAV.map((n) => (
        <button
          key={n.key}
          onClick={() => onNavigate(n.key)}
          className={`whitespace-nowrap rounded-full px-3 py-1 text-[12px] ${
            view === n.key
              ? "bg-[rgba(201,154,91,0.22)] font-semibold text-[#F3E7D8]"
              : "text-[#caa78f]"
          }`}
        >
          {n.label}
        </button>
      ))}
    </div>
  </div>
);

const cardShadow = "shadow-[0_24px_60px_-24px_rgba(70,46,32,0.34)]";
const redBtn =
  "rounded-[7px] bg-[#A6303A] px-5 py-2.5 text-[13px] font-bold text-[#F3E7D8] transition-colors hover:bg-[#8f2831]";

const Admin = () => {
  const [password, setPassword] = useState<string>(
    () => sessionStorage.getItem(PW_KEY) || ""
  );
  const [authed, setAuthed] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [authError, setAuthError] = useState("");

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState<PostDraft | null>(null);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [view, setView] = useState<View>("dashboard");

  // Media library: images uploaded this session + a copy-confirmation flag.
  const [sessionMedia, setSessionMedia] = useState<string[]>([]);
  const [copied, setCopied] = useState("");

  // Settings: default author persisted locally.
  const [defaultAuthor, setDefaultAuthor] = useState(
    () =>
      (typeof localStorage !== "undefined" &&
        localStorage.getItem(AUTHOR_KEY)) ||
      ""
  );

  const coverInputRef = useRef<HTMLInputElement>(null);
  const mediaInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = "Journal Admin · Grandstyle Events";
    window.scrollTo(0, 0);
    const id = "gs-admin-fonts";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Public+Sans:wght@400;500;600;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const loadPosts = async (pw: string) => {
    setLoading(true);
    setError("");
    try {
      const list = await adminApi.list(pw);
      setPosts(list);
      setAuthed(true);
      sessionStorage.setItem(PW_KEY, pw);
      setPassword(pw);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (password) {
      loadPosts(password).catch(() => {
        sessionStorage.removeItem(PW_KEY);
        setPassword("");
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    try {
      await loadPosts(pwInput.trim());
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : "Login failed.");
    }
  };

  const logout = () => {
    sessionStorage.removeItem(PW_KEY);
    setPassword("");
    setAuthed(false);
    setDraft(null);
    setPwInput("");
    setView("dashboard");
  };

  const refresh = () => loadPosts(password).catch(() => {});

  const navigate = (v: View) => {
    setDraft(null);
    setNotice("");
    setError("");
    setView(v);
  };

  const startNew = () => {
    setNotice("");
    setError("");
    setDraft(emptyDraft());
  };

  const startEdit = (p: Post) => {
    setNotice("");
    setError("");
    setDraft({
      ...p,
      body: toEditorHtml(p.body || ""),
      publishedAt: p.publishedAt ? p.publishedAt.slice(0, 10) : "",
    });
  };

  const onUploadCover = async (file: File) => {
    setUploading(true);
    setError("");
    try {
      const url = await uploadImage(file);
      setDraft((d) => (d ? { ...d, coverImageUrl: url } : d));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const uploadInlineImage = async (file: File) => {
    setError("");
    try {
      const url = await uploadImage(file);
      setSessionMedia((m) => [url, ...m]);
      return url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Image upload failed.");
      throw e;
    }
  };

  const onUploadMedia = async (file: File) => {
    setUploading(true);
    setError("");
    try {
      const url = await uploadImage(file);
      setSessionMedia((m) => [url, ...m]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const copyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(url);
      window.setTimeout(() => setCopied(""), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  const saveDefaultAuthor = () => {
    localStorage.setItem(AUTHOR_KEY, defaultAuthor);
    setNotice("Default author saved ✓");
  };

  const save = async (status: "draft" | "published") => {
    if (!draft) return;
    if (!draft.title.trim()) {
      setError("A title is required.");
      return;
    }
    setSaving(true);
    setError("");
    setNotice("");
    const payload: PostDraft = {
      ...draft,
      status,
      slug: draft.slug?.trim() || slugify(draft.title),
      publishedAt: draft.publishedAt
        ? new Date(draft.publishedAt).toISOString()
        : new Date().toISOString(),
    };
    try {
      if (draft._id) {
        await adminApi.update(password, payload);
      } else {
        await adminApi.create(password, payload);
      }
      setNotice(status === "published" ? "Published ✓" : "Saved as draft ✓");
      setDraft(null);
      setView("posts");
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (p: Post) => {
    if (!window.confirm(`Delete “${p.title}”? This cannot be undone.`)) return;
    setError("");
    try {
      await adminApi.remove(password, p._id);
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed.");
    }
  };

  const counts = useMemo(
    () => ({
      all: posts.length,
      published: posts.filter((p) => pillOf(p) === "live").length,
      scheduled: posts.filter((p) => pillOf(p) === "scheduled").length,
      draft: posts.filter((p) => p.status === "draft").length,
    }),
    [posts]
  );

  const media = useMemo(() => {
    const fromPosts = collectMedia(posts);
    return Array.from(new Set([...sessionMedia, ...fromPosts]));
  }, [posts, sessionMedia]);

  const visiblePosts = posts.filter((p) =>
    filter === "all" ? true : p.status === filter
  );

  // ── Login screen ──────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="font-publicsans flex min-h-screen items-center justify-center bg-[#E4DCCD] px-5 py-24">
        <form
          onSubmit={handleLogin}
          className={`w-full max-w-sm rounded-lg border border-[#DCD0BF] bg-[#ECE5D9] p-8 md:p-10 ${cardShadow}`}
        >
          <div className="font-spectral text-[24px] leading-[1.05] text-[#231C16]">
            Grandstyle <span className="text-[#A6303A]">Journal</span>
          </div>
          <p className="mt-3 text-[13px] text-[#6e5f4c]">
            Enter the admin password to manage your blog.
          </p>
          <div className="mt-8">
            <label className={labelCls}>Password</label>
            <input
              type="password"
              autoFocus
              value={pwInput}
              onChange={(e) => setPwInput(e.target.value)}
              placeholder="••••••••"
              className="mt-2 w-full rounded-[7px] border border-[#cdbfa9] bg-[#F3ECE0] px-3.5 py-2.5 text-[15px] text-[#231C16] focus:border-[#A6303A] focus:outline-none"
            />
          </div>
          {authError && (
            <p className="mt-3 text-[13px] text-[#A6303A]">{authError}</p>
          )}
          <button
            type="submit"
            disabled={loading || !pwInput.trim()}
            className="mt-6 w-full rounded-[7px] bg-[#A6303A] py-2.5 text-[13px] font-bold uppercase tracking-[0.08em] text-[#F3E7D8] transition-colors hover:bg-[#8f2831] disabled:opacity-50"
          >
            {loading ? "Checking…" : "Sign in"}
          </button>
          <Link
            to="/"
            className="mt-6 block text-center text-[13px] text-[#6e5f4c] transition-colors hover:text-[#231C16]"
          >
            ← Back to site
          </Link>
        </form>
      </div>
    );
  }

  // ── Editor ────────────────────────────────────────────────────
  if (draft) {
    return (
      <div className="font-publicsans min-h-screen bg-[#E4DCCD] p-0 md:p-8">
        <div
          className={`mx-auto flex min-h-screen max-w-[1200px] overflow-hidden bg-[#ECE5D9] text-[#25201C] md:min-h-[calc(100vh-4rem)] md:rounded-lg ${cardShadow}`}
        >
          <Rail view="posts" onNavigate={navigate} onLogout={logout} />

          <div className="flex min-w-0 flex-1 flex-col">
            <MobileBar view="posts" onNavigate={navigate} onLogout={logout} />

            {/* Top bar */}
            <div className="flex flex-none flex-wrap items-center justify-between gap-3 border-b border-[#DCD0BF] bg-[#F3ECE0] px-5 py-3 md:h-16 md:px-7 md:py-0">
              <div className="text-[13px] text-[#8a7d6a]">
                <button
                  onClick={() => navigate("posts")}
                  className="text-[#a99a85] transition-colors hover:text-[#4E1A21]"
                >
                  Posts
                </button>
                <span className="px-2">/</span>
                <span className="font-semibold text-[#4E1A21]">
                  {draft._id ? "Edit post" : "New post"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    draft.slug &&
                    window.open(`/blog/${draft.slug}`, "_blank", "noopener")
                  }
                  disabled={!draft.slug}
                  title={draft.slug ? "Open the public post" : "Save first to preview"}
                  className="rounded-[7px] border border-[#cdbfa9] px-4 py-2 text-[13px] font-semibold text-[#6e5f4c] transition-colors hover:border-[#A6303A] disabled:opacity-40"
                >
                  Preview
                </button>
                <button
                  onClick={() => save("draft")}
                  disabled={saving}
                  className="rounded-[7px] border border-[#cdbfa9] px-4 py-2 text-[13px] font-semibold text-[#4E1A21] transition-colors hover:border-[#A6303A] disabled:opacity-50"
                >
                  Save draft
                </button>
                <button
                  onClick={() => save("published")}
                  disabled={saving}
                  className={`${redBtn} disabled:opacity-50`}
                >
                  {saving
                    ? "Saving…"
                    : draft._id && draft.status === "published"
                    ? "Update"
                    : "Publish"}
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              {error && (
                <p className="mx-7 mt-5 rounded-lg bg-[#A6303A]/10 px-4 py-3 text-[13px] text-[#A6303A]">
                  {error}
                </p>
              )}

              <div className="flex flex-col gap-[26px] px-5 py-7 md:flex-row md:px-7">
                {/* Writing column */}
                <div className="min-w-0 flex-1">
                  <input
                    value={draft.category || ""}
                    onChange={(e) =>
                      setDraft({ ...draft, category: e.target.value })
                    }
                    placeholder="WEDDINGS · FEATURE (optional kicker)"
                    className="-mx-2 w-[calc(100%+1rem)] rounded-md bg-transparent px-2 py-1 text-[11px] font-bold uppercase tracking-[0.24em] text-[#A6303A] transition-colors placeholder:text-[#A6303A]/40 focus:bg-[#F3ECE0] focus:outline-none"
                  />
                  <input
                    value={draft.title}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        title: e.target.value,
                        slug:
                          !draft._id &&
                          (!draft.slug || draft.slug === slugify(draft.title))
                            ? slugify(e.target.value)
                            : draft.slug,
                      })
                    }
                    placeholder="Post title"
                    className="font-spectral -mx-2 mt-2 w-[calc(100%+1rem)] rounded-md bg-transparent px-2 py-1 text-[clamp(2rem,4.5vw,50px)] font-medium leading-[1.04] tracking-[-0.01em] text-[#231C16] transition-colors placeholder:text-[#231C16]/30 focus:bg-[#F3ECE0] focus:outline-none"
                  />
                  <div className="my-[22px] h-[2px] bg-gradient-to-r from-[#C99A5B] to-transparent" />

                  <RichEditor
                    value={draft.body}
                    onChange={(html) =>
                      setDraft((d) => (d ? { ...d, body: html } : d))
                    }
                    onUploadImage={
                      cloudinaryConfigured ? uploadInlineImage : undefined
                    }
                  />
                </div>

                {/* Metadata sidebar */}
                <aside className="flex w-full flex-none flex-col gap-5 md:w-[312px]">
                  {/* Cover image */}
                  <div>
                    <div className={`${labelCls} mb-2.5`}>Cover image</div>
                    {draft.coverImageUrl ? (
                      <div
                        className="relative flex h-[140px] items-end justify-between rounded-lg bg-cover bg-center p-[11px]"
                        style={{ backgroundImage: `url(${draft.coverImageUrl})` }}
                      >
                        <button
                          type="button"
                          onClick={() => coverInputRef.current?.click()}
                          className="rounded-md bg-[rgba(54,40,30,0.5)] px-2.5 py-1.5 text-[11px] font-semibold text-white"
                        >
                          {uploading ? "Uploading…" : "Replace"}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setDraft({ ...draft, coverImageUrl: "" })
                          }
                          className="rounded-md bg-[rgba(54,40,30,0.5)] px-2.5 py-1.5 text-[11px] font-semibold text-white"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => coverInputRef.current?.click()}
                        disabled={uploading || !cloudinaryConfigured}
                        className="flex h-[140px] w-full flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-[#cdbfa9] text-[#8a7d6a] transition-colors hover:border-[#A6303A] hover:text-[#A6303A] disabled:opacity-50"
                      >
                        <span className="text-2xl leading-none">＋</span>
                        <span className="text-[12px]">
                          {uploading ? "Uploading…" : "Upload image"}
                        </span>
                      </button>
                    )}
                    <input
                      ref={coverInputRef}
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) onUploadCover(f);
                        e.target.value = "";
                      }}
                    />
                    <input
                      className={`${sideField} mt-2.5 text-[13px]`}
                      value={draft.coverImageUrl}
                      onChange={(e) =>
                        setDraft({ ...draft, coverImageUrl: e.target.value })
                      }
                      placeholder="…or paste an image URL"
                    />
                  </div>

                  {/* URL slug */}
                  <div className="border-t border-[#DCD0BF] pt-4">
                    <div className={`${labelCls} mb-2`}>URL slug</div>
                    <div className="flex items-center rounded-[7px] border border-[#cdbfa9] bg-[#F3ECE0] px-3 py-2 text-[14px] focus-within:border-[#A6303A]">
                      <span className="text-[#a99a85]">/blog/</span>
                      <input
                        className="w-full bg-transparent text-[#231C16] focus:outline-none"
                        value={draft.slug}
                        onChange={(e) =>
                          setDraft({ ...draft, slug: slugify(e.target.value) })
                        }
                        placeholder="auto-from-title"
                      />
                    </div>
                  </div>

                  {/* Excerpt */}
                  <div className="border-t border-[#DCD0BF] pt-4">
                    <div className={`${labelCls} mb-2`}>Excerpt</div>
                    <textarea
                      rows={3}
                      className={`${sideField} resize-y text-[13.5px] leading-[1.55]`}
                      value={draft.excerpt}
                      onChange={(e) =>
                        setDraft({ ...draft, excerpt: e.target.value })
                      }
                      placeholder="Short summary for the list page"
                    />
                  </div>

                  {/* Author + date */}
                  <div className="border-t border-[#DCD0BF] pt-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className={`${labelCls} mb-1.5`}>Author</div>
                        <input
                          className={sideField}
                          value={draft.author}
                          onChange={(e) =>
                            setDraft({ ...draft, author: e.target.value })
                          }
                          placeholder="Grandstyle Events"
                        />
                      </div>
                      <div>
                        <div className={`${labelCls} mb-1.5`}>Date</div>
                        <input
                          type="date"
                          className={sideField}
                          value={draft.publishedAt?.slice(0, 10) || ""}
                          onChange={(e) =>
                            setDraft({ ...draft, publishedAt: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Shell for dashboard / posts / media / settings ────────────
  const recent = posts.slice(0, 5);
  const statCards = [
    { label: "All posts", value: counts.all },
    { label: "Published", value: counts.published },
    { label: "Drafts", value: counts.draft },
    { label: "Scheduled", value: counts.scheduled },
  ];
  const tabs: { key: Filter; label: string }[] = [
    { key: "all", label: `All ${counts.all}` },
    { key: "published", label: `Published ${counts.published}` },
    { key: "draft", label: `Drafts ${counts.draft}` },
  ];

  const header = (kicker: string, title: string, action?: React.ReactNode) => (
    <div className="flex flex-none items-end justify-between border-b border-[#DCD0BF] px-5 pb-4 pt-6 md:px-7">
      <div>
        <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#A6303A]">
          {kicker}
        </div>
        <h1 className="font-spectral mt-0.5 text-[28px] font-semibold text-[#231C16] md:text-[36px]">
          {title}
        </h1>
      </div>
      {action}
    </div>
  );

  return (
    <div className="font-publicsans min-h-screen bg-[#E4DCCD] p-0 md:p-8">
      <div
        className={`mx-auto flex min-h-screen max-w-[1200px] overflow-hidden bg-[#ECE5D9] text-[#25201C] md:min-h-[calc(100vh-4rem)] md:rounded-lg ${cardShadow}`}
      >
        <Rail view={view} onNavigate={navigate} onLogout={logout} />

        <div className="flex min-w-0 flex-1 flex-col">
          <MobileBar view={view} onNavigate={navigate} onLogout={logout} />

          {/* DASHBOARD */}
          {view === "dashboard" &&
            header(
              "Overview",
              "Dashboard",
              <button onClick={startNew} className={redBtn}>
                + New post
              </button>
            )}

          {/* POSTS */}
          {view === "posts" &&
            header(
              "Editorial",
              "All Posts",
              <button onClick={startNew} className={redBtn}>
                + New post
              </button>
            )}

          {/* MEDIA */}
          {view === "media" &&
            header(
              "Library",
              "Media",
              cloudinaryConfigured ? (
                <button
                  onClick={() => mediaInputRef.current?.click()}
                  disabled={uploading}
                  className={`${redBtn} disabled:opacity-50`}
                >
                  {uploading ? "Uploading…" : "+ Upload image"}
                </button>
              ) : undefined
            )}

          {/* SETTINGS */}
          {view === "settings" && header("Configuration", "Settings")}

          <div className="flex-1 overflow-y-auto px-5 py-5 md:px-7">
            {notice && (
              <p className="mb-5 rounded-lg bg-[#DDEBDD] px-4 py-3 text-[13px] text-[#2f6b46]">
                {notice}
              </p>
            )}
            {error && (
              <p className="mb-5 rounded-lg bg-[#A6303A]/10 px-4 py-3 text-[13px] text-[#A6303A]">
                {error}
              </p>
            )}
            {loading && view !== "settings" && (
              <p className="py-20 text-center text-[#6e5f4c]">Loading…</p>
            )}

            {/* ── DASHBOARD body ── */}
            {view === "dashboard" && !loading && (
              <>
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                  {statCards.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-lg border border-[#DCD0BF] bg-[#F3ECE0] p-5"
                    >
                      <div className="font-spectral text-[34px] leading-none text-[#231C16]">
                        {s.value}
                      </div>
                      <div className="mt-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#6e5f4c]">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <div className={labelCls}>Recent posts</div>
                  <button
                    onClick={() => navigate("posts")}
                    className="text-[13px] font-semibold text-[#A6303A] hover:underline"
                  >
                    View all →
                  </button>
                </div>
                <div className="mt-3">
                  {recent.length === 0 ? (
                    <p className="py-10 text-center text-[#6e5f4c]">
                      No posts yet.{" "}
                      <button
                        onClick={startNew}
                        className="font-semibold text-[#A6303A] hover:underline"
                      >
                        Write your first →
                      </button>
                    </p>
                  ) : (
                    recent.map((p, i) => {
                      const pill = PILL[pillOf(p)];
                      return (
                        <button
                          key={p._id}
                          onClick={() => startEdit(p)}
                          className={`flex w-full items-center justify-between gap-4 py-3 text-left ${
                            i < recent.length - 1
                              ? "border-b border-[#DCD0BF]"
                              : ""
                          }`}
                        >
                          <span className="font-spectral min-w-0 truncate text-[18px] text-[#231C16]">
                            {p.title}
                          </span>
                          <span className="flex flex-none items-center gap-3">
                            <span
                              className={`rounded-[5px] px-2 py-1 text-[11px] font-bold tracking-[0.04em] ${pill.cls}`}
                            >
                              {pill.label}
                            </span>
                            <span className="hidden text-[13px] text-[#6e5f4c] sm:block">
                              {fmtLong(p.publishedAt)}
                            </span>
                          </span>
                        </button>
                      );
                    })
                  )}
                </div>
              </>
            )}

            {/* ── POSTS body ── */}
            {view === "posts" && !loading && (
              <>
                <div className="mb-2 flex items-center gap-2">
                  {tabs.map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setFilter(t.key)}
                      className={`rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-colors ${
                        filter === t.key
                          ? "bg-[#4E1A21] text-[#F3E7D8]"
                          : "border border-[#cdbfa9] text-[#6e5f4c] hover:text-[#231C16]"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {posts.length === 0 && (
                  <div className="py-20 text-center">
                    <p className="font-spectral text-[24px] text-[#231C16]">
                      No posts yet
                    </p>
                    <p className="mt-2 text-[14px] text-[#6e5f4c]">
                      Create your first story to get started.
                    </p>
                    <button onClick={startNew} className={`${redBtn} mt-6`}>
                      + Write your first post
                    </button>
                  </div>
                )}

                {posts.length > 0 && visiblePosts.length === 0 && (
                  <p className="py-16 text-center text-[#6e5f4c]">
                    No {filter} posts.
                  </p>
                )}

                {visiblePosts.map((p, i) => {
                  const pill = PILL[pillOf(p)];
                  return (
                    <div
                      key={p._id}
                      className={`grid grid-cols-[1fr_auto] items-center gap-3 py-4 md:grid-cols-[1fr_130px_120px_auto] md:gap-4 ${
                        i < visiblePosts.length - 1
                          ? "border-b border-[#DCD0BF]"
                          : ""
                      }`}
                    >
                      <button
                        onClick={() => startEdit(p)}
                        className="font-spectral min-w-0 truncate text-left text-[18px] text-[#231C16] hover:text-[#A6303A] md:text-[20px]"
                      >
                        {p.title}
                      </button>
                      <div className="md:justify-self-start">
                        <span
                          className={`rounded-[5px] px-2 py-1 text-[11.5px] font-bold tracking-[0.04em] ${pill.cls}`}
                        >
                          {pill.label}
                        </span>
                      </div>
                      <div className="hidden text-right text-[13px] text-[#6e5f4c] md:block">
                        {fmtLong(p.publishedAt)}
                      </div>
                      <div className="flex items-center justify-end gap-3 text-[13px]">
                        {p.status === "published" && (
                          <Link
                            to={`/blog/${p.slug}`}
                            className="text-[#6e5f4c] transition-colors hover:text-[#231C16]"
                          >
                            View
                          </Link>
                        )}
                        <button
                          onClick={() => startEdit(p)}
                          className="text-[#4E1A21] transition-colors hover:text-[#A6303A]"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => remove(p)}
                          className="text-[#6e5f4c] transition-colors hover:text-[#A6303A]"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </>
            )}

            {/* ── MEDIA body ── */}
            {view === "media" && !loading && (
              <>
                <input
                  ref={mediaInputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) onUploadMedia(f);
                    e.target.value = "";
                  }}
                />
                <p className="mb-4 text-[13px] text-[#6e5f4c]">
                  Every image used across your posts, plus anything you upload
                  here. Click “Copy URL” to reuse one in a post.
                </p>
                {media.length === 0 ? (
                  <div className="py-20 text-center">
                    <p className="font-spectral text-[22px] text-[#231C16]">
                      No images yet
                    </p>
                    <p className="mt-2 text-[14px] text-[#6e5f4c]">
                      {cloudinaryConfigured
                        ? "Upload an image to start your library."
                        : "Image uploads are not configured."}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {media.map((url) => (
                      <div
                        key={url}
                        className="overflow-hidden rounded-lg border border-[#DCD0BF] bg-[#F3ECE0]"
                      >
                        <div className="aspect-[4/3] bg-[#E4DCCD]">
                          <img
                            src={url}
                            alt=""
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <button
                          onClick={() => copyUrl(url)}
                          className="w-full px-3 py-2 text-left text-[12px] font-semibold text-[#4E1A21] transition-colors hover:bg-[#E4DCCD]"
                        >
                          {copied === url ? "Copied ✓" : "Copy URL"}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* ── SETTINGS body ── */}
            {view === "settings" && (
              <div className="max-w-xl space-y-6">
                {/* Default author */}
                <div className="rounded-lg border border-[#DCD0BF] bg-[#F3ECE0] p-5">
                  <div className={labelCls}>Default author</div>
                  <p className="mt-1 text-[13px] text-[#6e5f4c]">
                    Pre-filled on every new post.
                  </p>
                  <div className="mt-3 flex gap-3">
                    <input
                      className={sideField}
                      value={defaultAuthor}
                      onChange={(e) => setDefaultAuthor(e.target.value)}
                      placeholder="Grandstyle Events"
                    />
                    <button
                      onClick={saveDefaultAuthor}
                      className="flex-none rounded-[7px] border border-[#cdbfa9] px-4 text-[13px] font-semibold text-[#4E1A21] transition-colors hover:border-[#A6303A]"
                    >
                      Save
                    </button>
                  </div>
                </div>

                {/* Connections */}
                <div className="rounded-lg border border-[#DCD0BF] bg-[#F3ECE0] p-5">
                  <div className={labelCls}>Connections</div>
                  <ul className="mt-3 space-y-2.5 text-[14px] text-[#231C16]">
                    <li className="flex items-center justify-between">
                      <span>Content store (Sanity)</span>
                      <span
                        className={`rounded-[5px] px-2 py-1 text-[11.5px] font-bold ${
                          sanityConfigured
                            ? "bg-[#DDEBDD] text-[#2f6b46]"
                            : "bg-[#F4E7CB] text-[#9a6a18]"
                        }`}
                      >
                        {sanityConfigured ? `CONNECTED · ${DATASET}` : "NOT SET"}
                      </span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Image uploads (Cloudinary)</span>
                      <span
                        className={`rounded-[5px] px-2 py-1 text-[11.5px] font-bold ${
                          cloudinaryConfigured
                            ? "bg-[#DDEBDD] text-[#2f6b46]"
                            : "bg-[#F4E7CB] text-[#9a6a18]"
                        }`}
                      >
                        {cloudinaryConfigured ? "CONNECTED" : "NOT SET"}
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Security */}
                <div className="rounded-lg border border-[#DCD0BF] bg-[#F3ECE0] p-5">
                  <div className={labelCls}>Security</div>
                  <p className="mt-2 text-[13px] leading-relaxed text-[#6e5f4c]">
                    The admin password is managed as a server environment
                    variable on Netlify (<code>ADMIN_PASSWORD</code>). To change
                    it, update that variable and redeploy.
                  </p>
                  <button
                    onClick={logout}
                    className="mt-4 rounded-[7px] border border-[#cdbfa9] px-4 py-2 text-[13px] font-semibold text-[#A6303A] transition-colors hover:border-[#A6303A]"
                  >
                    Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
