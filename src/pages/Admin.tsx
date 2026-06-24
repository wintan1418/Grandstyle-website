import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { marked } from "marked";
import RichEditor from "../components/RichEditor";
import { adminApi, type PostDraft } from "../lib/adminApi";
import { uploadImage, cloudinaryConfigured } from "../lib/cloudinary";
import type { Post } from "../lib/sanity";

const PW_KEY = "gs_admin_pw";

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
  coverImageUrl: "",
  body: "",
  author: "",
  publishedAt: new Date().toISOString().slice(0, 10),
  status: "draft",
});

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");

const inputCls =
  "w-full bg-paper border border-line rounded-lg px-3.5 py-2.5 text-ink text-[15px] focus:outline-none focus:border-crimson focus:ring-2 focus:ring-crimson/10 transition-all duration-280 placeholder:text-ash/60";

const labelCls = "block text-[11px] font-medium uppercase tracking-[0.12em] text-ash";

type Filter = "all" | "published" | "draft";

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

  const coverInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = "Admin · Grandstyle Events";
    window.scrollTo(0, 0);
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

  // Try existing session password on mount.
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
  };

  const refresh = () => loadPosts(password).catch(() => {});

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

  // Cover image upload (the editor handles in-body images itself).
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

  // Passed to the editor: upload, surface errors here, return the URL to insert.
  const uploadInlineImage = async (file: File) => {
    setError("");
    try {
      return await uploadImage(file);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Image upload failed.");
      throw e;
    }
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
      published: posts.filter((p) => p.status === "published").length,
      draft: posts.filter((p) => p.status === "draft").length,
    }),
    [posts]
  );

  const visiblePosts = posts.filter((p) =>
    filter === "all" ? true : p.status === filter
  );

  // ── Login screen ──────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-cloud flex items-center justify-center px-5 py-24">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm bg-paper border border-line rounded-2xl shadow-elevated p-8 md:p-10"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-crimson">
            Grandstyle Events
          </p>
          <h1 className="mt-3 font-display text-h2">Journal Admin</h1>
          <p className="mt-2 text-meta text-ash">
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
              className={`${inputCls} mt-2`}
            />
          </div>
          {authError && (
            <p className="mt-3 text-[13px] text-crimson">{authError}</p>
          )}
          <button
            type="submit"
            disabled={loading || !pwInput.trim()}
            className="btn-primary mt-6 w-full disabled:opacity-50"
          >
            {loading ? "Checking…" : "Sign in"}
          </button>
          <Link
            to="/"
            className="mt-6 block text-center text-[13px] text-ash hover:text-ink transition-colors"
          >
            ← Back to site
          </Link>
        </form>
      </div>
    );
  }

  // ── Editor (two-pane: content + settings sidebar) ─────────────
  if (draft) {
    const statusPill =
      draft.status === "published"
        ? "bg-navy/10 text-navy"
        : "bg-ash/15 text-ash";
    return (
      <div className="min-h-screen bg-cloud">
        {/* Sticky editor toolbar */}
        <div className="sticky top-0 z-30 bg-paper/90 backdrop-blur border-b border-line">
          <div className="container-edge max-w-5xl flex items-center justify-between h-16">
            <button
              onClick={() => setDraft(null)}
              className="text-[13px] text-ash hover:text-ink transition-colors"
            >
              ← All posts
            </button>
            <div className="flex items-center gap-3">
              <span
                className={`hidden sm:inline-block rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] ${statusPill}`}
              >
                {draft._id ? draft.status : "new"}
              </span>
              <button
                onClick={() => save("draft")}
                disabled={saving}
                className="rounded-full border border-ink/20 px-4 py-2 text-[12px] font-medium uppercase tracking-[0.1em] text-ink hover:border-ink transition-colors disabled:opacity-50"
              >
                Save draft
              </button>
              <button
                onClick={() => save("published")}
                disabled={saving}
                className="rounded-full bg-crimson px-5 py-2 text-[12px] font-medium uppercase tracking-[0.1em] text-paper hover:bg-crimson-deep transition-colors disabled:opacity-50"
              >
                {saving ? "Saving…" : draft.status === "published" ? "Update" : "Publish"}
              </button>
            </div>
          </div>
        </div>

        <div className="container-edge max-w-5xl py-8 md:py-12">
          {error && (
            <p className="mb-6 rounded-lg bg-crimson/10 px-4 py-3 text-[13px] text-crimson">
              {error}
            </p>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 lg:gap-10 items-start">
            {/* Main content */}
            <div className="bg-paper border border-line rounded-2xl p-6 md:p-8">
              <input
                value={draft.title}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    title: e.target.value,
                    slug:
                      !draft._id && (!draft.slug || draft.slug === slugify(draft.title))
                        ? slugify(e.target.value)
                        : draft.slug,
                  })
                }
                placeholder="Post title"
                className="w-full bg-transparent font-display text-[clamp(1.6rem,3vw,2.25rem)] leading-tight text-ink placeholder:text-ash/40 focus:outline-none"
              />

              <div className="mt-5 border-t border-line pt-2">
                <RichEditor
                  value={draft.body}
                  onChange={(html) =>
                    setDraft((d) => (d ? { ...d, body: html } : d))
                  }
                  onUploadImage={cloudinaryConfigured ? uploadInlineImage : undefined}
                />
              </div>
            </div>

            {/* Settings sidebar */}
            <aside className="lg:sticky lg:top-24 space-y-6">
              {/* Cover */}
              <div className="bg-paper border border-line rounded-2xl p-5">
                <label className={labelCls}>Cover image</label>
                <div className="mt-3">
                  {draft.coverImageUrl ? (
                    <div className="relative group">
                      <img
                        src={draft.coverImageUrl}
                        alt=""
                        className="aspect-[16/10] w-full rounded-lg object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setDraft({ ...draft, coverImageUrl: "" })}
                        className="absolute top-2 right-2 rounded-full bg-ink/70 text-paper w-7 h-7 text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove image"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    cloudinaryConfigured && (
                      <button
                        type="button"
                        onClick={() => coverInputRef.current?.click()}
                        disabled={uploading}
                        className="aspect-[16/10] w-full rounded-lg border-2 border-dashed border-line flex flex-col items-center justify-center gap-1 text-ash hover:border-crimson hover:text-crimson transition-colors disabled:opacity-50"
                      >
                        <span className="text-2xl leading-none">＋</span>
                        <span className="text-[12px]">
                          {uploading ? "Uploading…" : "Upload image"}
                        </span>
                      </button>
                    )
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
                    className={`${inputCls} mt-3 text-[13px]`}
                    value={draft.coverImageUrl}
                    onChange={(e) =>
                      setDraft({ ...draft, coverImageUrl: e.target.value })
                    }
                    placeholder="…or paste an image URL"
                  />
                </div>
              </div>

              {/* Meta */}
              <div className="bg-paper border border-line rounded-2xl p-5 space-y-4">
                <div>
                  <label className={labelCls}>URL slug</label>
                  <input
                    className={`${inputCls} mt-2 text-[13px]`}
                    value={draft.slug}
                    onChange={(e) =>
                      setDraft({ ...draft, slug: slugify(e.target.value) })
                    }
                    placeholder="auto-from-title"
                  />
                  <span className="mt-1 block text-[11px] text-ash truncate">
                    /blog/{draft.slug || "your-title"}
                  </span>
                </div>

                <div>
                  <label className={labelCls}>Excerpt</label>
                  <textarea
                    className={`${inputCls} mt-2 text-[13px] resize-y`}
                    rows={3}
                    value={draft.excerpt}
                    onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })}
                    placeholder="Short summary for the list page"
                  />
                </div>

                <div>
                  <label className={labelCls}>Author</label>
                  <input
                    className={`${inputCls} mt-2 text-[13px]`}
                    value={draft.author}
                    onChange={(e) => setDraft({ ...draft, author: e.target.value })}
                    placeholder="Grandstyle Events"
                  />
                </div>

                <div>
                  <label className={labelCls}>Publish date</label>
                  <input
                    type="date"
                    className={`${inputCls} mt-2 text-[13px]`}
                    value={draft.publishedAt?.slice(0, 10) || ""}
                    onChange={(e) =>
                      setDraft({ ...draft, publishedAt: e.target.value })
                    }
                  />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    );
  }

  // ── Dashboard ─────────────────────────────────────────────────
  const tabs: { key: Filter; label: string }[] = [
    { key: "all", label: `All ${counts.all}` },
    { key: "published", label: `Published ${counts.published}` },
    { key: "draft", label: `Drafts ${counts.draft}` },
  ];

  return (
    <div className="min-h-screen bg-cloud">
      {/* Top bar */}
      <div className="bg-paper border-b border-line">
        <div className="container-edge max-w-4xl flex items-center justify-between h-20">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-crimson">
              Grandstyle Events
            </p>
            <h1 className="font-display text-h3">Journal Admin</h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={startNew} className="btn-primary">
              ＋ New post
            </button>
            <button
              onClick={logout}
              className="text-[13px] text-ash hover:text-ink transition-colors"
            >
              Log out
            </button>
          </div>
        </div>
      </div>

      <div className="container-edge max-w-4xl py-8 md:py-10">
        {notice && (
          <p className="mb-6 rounded-lg bg-gold/15 px-4 py-3 text-[13px] text-ink">
            {notice}
          </p>
        )}
        {error && (
          <p className="mb-6 rounded-lg bg-crimson/10 px-4 py-3 text-[13px] text-crimson">
            {error}
          </p>
        )}

        {/* Filter tabs */}
        <div className="flex items-center gap-2 mb-6">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setFilter(t.key)}
              className={`rounded-full px-4 py-1.5 text-[12px] font-medium tracking-wide transition-colors ${
                filter === t.key
                  ? "bg-ink text-paper"
                  : "bg-paper border border-line text-ash hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {loading && (
          <p className="py-20 text-center text-ash">Loading…</p>
        )}

        {!loading && posts.length === 0 && (
          <div className="bg-paper border border-line rounded-2xl py-20 text-center">
            <p className="font-display text-h3">No posts yet</p>
            <p className="mt-2 text-meta text-ash">
              Create your first story to get started.
            </p>
            <button onClick={startNew} className="btn-primary mt-6">
              ＋ Write your first post
            </button>
          </div>
        )}

        {!loading && posts.length > 0 && (
          <div className="bg-paper border border-line rounded-2xl overflow-hidden">
            {visiblePosts.length === 0 ? (
              <p className="py-16 text-center text-ash">
                No {filter} posts.
              </p>
            ) : (
              <ul className="divide-y divide-line">
                {visiblePosts.map((p) => (
                  <li
                    key={p._id}
                    className="flex items-center gap-4 px-4 md:px-5 py-4 hover:bg-cloud/50 transition-colors"
                  >
                    <div className="h-12 w-16 shrink-0 overflow-hidden rounded-md bg-cloud">
                      {p.coverImageUrl && (
                        <img
                          src={p.coverImageUrl}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <button
                      onClick={() => startEdit(p)}
                      className="min-w-0 flex-1 text-left"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em] ${
                            p.status === "published"
                              ? "bg-navy/10 text-navy"
                              : "bg-ash/15 text-ash"
                          }`}
                        >
                          {p.status}
                        </span>
                        <span className="text-[11px] text-ash">
                          {p.publishedAt
                            ? new Date(p.publishedAt).toLocaleDateString("en-GB")
                            : ""}
                        </span>
                      </div>
                      <p className="mt-1 truncate font-display text-[18px] text-ink">
                        {p.title}
                      </p>
                    </button>
                    <div className="flex items-center gap-3 shrink-0 text-[13px]">
                      {p.status === "published" && (
                        <Link
                          to={`/blog/${p.slug}`}
                          className="text-ash hover:text-ink transition-colors"
                        >
                          View
                        </Link>
                      )}
                      <button
                        onClick={() => startEdit(p)}
                        className="text-ink hover:text-crimson transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => remove(p)}
                        className="text-ash hover:text-crimson transition-colors"
                        aria-label="Delete"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <Link
          to="/"
          className="mt-8 inline-block text-[13px] text-ash hover:text-ink transition-colors"
        >
          ← Back to site
        </Link>
      </div>
    </div>
  );
};

export default Admin;
