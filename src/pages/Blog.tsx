import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getPublishedPosts, type Post } from "../lib/sanity";

const ease = [0.22, 1, 0.36, 1] as const;

const formatDate = (iso?: string) => {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
};

const Blog = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    getPublishedPosts()
      .then(setPosts)
      .catch(() => setError(true));
  }, []);

  return (
    <main id="main-content" className="bg-paper">
      {/* Masthead */}
      <header className="container-edge pt-32 md:pt-44 pb-12 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <span className="eyebrow text-crimson">The Journal</span>
          <h1 className="mt-5 font-display text-display-lg leading-[1.02] text-balance max-w-[16ch]">
            Notes on celebration, craft &amp; ceremony.
          </h1>
          <p className="mt-6 text-body-lg text-ash max-w-prose">
            Stories from behind the scenes — the planning, the detail, and the
            moments that make an event unforgettable.
          </p>
        </motion.div>
      </header>

      <section className="container-edge pb-section">
        <div className="rule" />

        {error && (
          <p className="py-24 text-center text-ash">
            We couldn&apos;t load the journal right now. Please try again later.
          </p>
        )}

        {!error && posts === null && (
          <p className="py-24 text-center text-ash">Loading…</p>
        )}

        {!error && posts !== null && posts.length === 0 && (
          <div className="py-24 text-center">
            <p className="font-display text-h2 text-balance">
              Stories are on the way.
            </p>
            <p className="mt-4 text-ash">
              Our first journal entries will appear here soon.
            </p>
            <Link to="/#enquire" className="btn-ghost mt-10">
              Start an Enquiry
            </Link>
          </div>
        )}

        {posts && posts.length > 0 && (
          <ul>
            {posts.map((post, i) => (
              <motion.li
                key={post._id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease }}
                className="border-b border-line"
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-6 md:gap-12 py-10 md:py-14"
                >
                  {/* Text column */}
                  <div className="order-2 md:order-1 max-w-[60ch]">
                    <div className="flex items-center gap-4">
                      <span className="font-display text-[13px] text-crimson opacity-70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px w-6 bg-line" />
                      <span className="mono-kicker text-ash">
                        {formatDate(post.publishedAt)}
                      </span>
                    </div>
                    <h2 className="mt-4 font-display leading-[1.08] text-[clamp(1.6rem,3.4vw,2.6rem)] text-pretty transition-colors duration-280 group-hover:text-crimson">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="mt-3 text-body text-ash line-clamp-2 max-w-[52ch]">
                        {post.excerpt}
                      </p>
                    )}
                    <span className="mt-6 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.16em] text-ink transition-colors duration-280 group-hover:text-crimson">
                      Read story
                      <span className="transition-transform duration-480 ease-standard group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </div>

                  {/* Thumbnail */}
                  <div className="order-1 md:order-2 w-full md:w-[300px] lg:w-[360px]">
                    <div className="aspect-[4/3] overflow-hidden rounded-md bg-cloud">
                      {post.coverImageUrl ? (
                        <img
                          src={post.coverImageUrl}
                          alt={post.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-800 ease-standard group-hover:scale-[1.05]"
                        />
                      ) : (
                        <div className="h-full w-full bg-flag-whisper opacity-90" />
                      )}
                    </div>
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default Blog;
