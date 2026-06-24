import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Markdown from "../components/Markdown";
import { getPostBySlug, type Post } from "../lib/sanity";

const formatDate = (iso?: string) => {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
};

type State = "loading" | "ready" | "notfound" | "error";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [state, setState] = useState<State>("loading");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!slug) return;
    setState("loading");
    getPostBySlug(slug)
      .then((p) => {
        if (!p) {
          setState("notfound");
        } else {
          setPost(p);
          setState("ready");
          document.title = `${p.title} · Grandstyle Events`;
        }
      })
      .catch(() => setState("error"));
  }, [slug]);

  if (state === "loading") {
    return (
      <main id="main-content" className="container-edge pt-40 pb-section">
        <p className="text-ash text-center py-20">Loading…</p>
      </main>
    );
  }

  if (state === "notfound" || state === "error") {
    return (
      <main id="main-content" className="container-edge pt-40 pb-section text-center">
        <h1 className="font-display text-h1">
          {state === "notfound" ? "Story not found" : "Something went wrong"}
        </h1>
        <p className="mt-4 text-ash">
          {state === "notfound"
            ? "This story may have been moved or unpublished."
            : "Please try again in a moment."}
        </p>
        <Link to="/blog" className="btn-ghost mt-10">
          ← Back to the Journal
        </Link>
      </main>
    );
  }

  if (!post) return null;

  return (
    <main id="main-content" className="bg-paper">
      <article>
        {/* Header */}
        <header className="container-edge pt-32 md:pt-40 pb-10 max-w-prose mx-auto text-center">
          <Link
            to="/blog"
            className="mono-kicker text-crimson hover:text-crimson-deep transition-colors duration-280"
          >
            ← The Journal
          </Link>
          {post.category && (
            <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.24em] text-crimson">
              {post.category}
            </p>
          )}
          <h1 className="mt-4 font-display text-h1 text-balance">{post.title}</h1>
          <div className="mt-6 flex items-center justify-center gap-3 text-ash">
            {post.author && <span className="text-meta">{post.author}</span>}
            {post.author && post.publishedAt && (
              <span className="h-1 w-1 rounded-full bg-line" />
            )}
            <span className="mono-kicker">{formatDate(post.publishedAt)}</span>
          </div>
        </header>

        {/* Cover */}
        {post.coverImageUrl && (
          <div className="container-edge max-w-[1100px] mx-auto">
            <img
              src={post.coverImageUrl}
              alt={post.title}
              className="w-full rounded-lg aspect-[16/9] object-cover"
            />
          </div>
        )}

        {/* Body */}
        <div className="container-edge py-16 md:py-20">
          <div className="max-w-prose mx-auto">
            <Markdown source={post.body} />
          </div>
        </div>

        {/* Footer CTA */}
        <div className="container-edge pb-section">
          <div className="rule mb-12 max-w-prose mx-auto" />
          <div className="max-w-prose mx-auto text-center">
            <p className="font-display text-h3 text-balance">
              Planning something of your own?
            </p>
            <Link to="/#enquire" className="btn-primary mt-6">
              Start an Enquiry
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
};

export default BlogPost;
