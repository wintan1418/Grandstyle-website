import { motion } from "framer-motion";

const HERO_VIDEO =
  "https://res.cloudinary.com/wintan1418/video/upload/v1757499126/featured/GRAND_STYLE_IMASAYI_CANOPY_1_ajynib.mp4";

const HERO_POSTER =
  "https://res.cloudinary.com/wintan1418/image/upload/c_fill,w_1920,h_1080,g_auto,q_auto:best,f_auto/gallery/Vibrant_African_Weddings_qlff08";

const ease = [0.22, 1, 0.36, 1] as const;

const headlineWords = ["Events,", "executed", "in", "full", "measure."];

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top, behavior: "smooth" });
};

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative h-screen min-h-[640px] w-full overflow-hidden bg-ink"
      aria-label="Grandstyle Events — cinematic introduction"
    >
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={HERO_POSTER}
        aria-hidden="true"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,18,40,0.25) 0%, rgba(10,18,40,0.35) 45%, rgba(138,26,32,0.45) 85%, rgba(10,18,40,0.72) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 h-full container-edge flex flex-col justify-between pt-24 md:pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="flex items-center gap-4"
        >
          <span className="hairline bg-paper/80 w-8" />
          <p className="eyebrow text-paper/90">
            Event planning · Ondo, Nigeria · Since 2012
          </p>
        </motion.div>

        <div className="max-w-5xl">
          <h1 className="font-display text-display-xl text-paper font-medium leading-[0.95] tracking-tight text-balance">
            {headlineWords.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.15 + i * 0.08,
                  ease,
                }}
                className={`inline-block mr-[0.25em] ${
                  word === "full" ? "italic text-crimson" : ""
                }`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease }}
            className="mt-8 max-w-xl text-paper/85 text-body-lg leading-[1.55] font-light"
          >
            Strategic planning, design, and delivery for Nigeria's most
            meaningful occasions — corporate galas, bridal ceremonies, and the
            quiet specialty moments in between.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05, ease }}
            className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-5"
          >
            <button
              onClick={() => scrollTo("enquire")}
              className="inline-flex items-center bg-crimson text-paper px-9 py-4 text-[12px] font-medium uppercase tracking-[0.16em] transition-colors duration-280 ease-standard hover:bg-crimson-deep"
            >
              Start an Enquiry
            </button>
            <button
              onClick={() => scrollTo("featured-work")}
              className="inline-flex items-center gap-3 text-paper text-[12px] font-medium uppercase tracking-[0.16em] border-b border-paper/60 pb-1 hover:border-paper hover:text-paper transition-colors duration-280"
            >
              Explore our work
              <span aria-hidden>→</span>
            </button>
          </motion.div>
        </div>

        <motion.button
          onClick={() => scrollTo("manifesto")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4, ease }}
          aria-label="Scroll to next section"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 group"
        >
          <span className="eyebrow text-paper/70 group-hover:text-paper transition-colors duration-280">
            Scroll
          </span>
          <span className="relative block w-px h-12 bg-paper/30 overflow-hidden">
            <span className="absolute inset-x-0 top-0 h-1/2 bg-crimson animate-drift" />
          </span>
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
