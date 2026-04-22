import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";

const HERO_VIDEO =
  "https://res.cloudinary.com/wintan1418/video/upload/v1757499126/featured/GRAND_STYLE_IMASAYI_CANOPY_1_ajynib.mp4";

const HERO_POSTER =
  "https://res.cloudinary.com/wintan1418/video/upload/so_0,q_auto:best,f_jpg/featured/GRAND_STYLE_IMASAYI_CANOPY_1_ajynib.jpg";

const ease = [0.22, 1, 0.36, 1] as const;

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top, behavior: "smooth" });
};

const volYear = () => {
  const years = new Date().getFullYear() - 2012;
  const romans: Record<number, string> = {
    10: "X",
    11: "XI",
    12: "XII",
    13: "XIII",
    14: "XIV",
    15: "XV",
    16: "XVI",
    17: "XVII",
    18: "XVIII",
    19: "XIX",
    20: "XX",
  };
  return romans[years] || "XIV";
};

const today = new Date()
  .toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })
  .replace(/\//g, ".");

const Hero = () => {
  return (
    <section
      id="hero"
      aria-label="Grandstyle Events — cinematic introduction"
      className="relative bg-paper text-ink"
    >
      <div className="container-edge pt-28 md:pt-32 pb-16 md:pb-24">
        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-10 md:mb-14 mono-kicker text-ash"
        >
          <span className="text-ink">№ 001 — Prelude</span>
          <span className="hidden md:inline">
            An event company for occasions of consequence
          </span>
          <span>
            {today} / Vol. {volYear()}
          </span>
        </motion.div>

        {/* Staggered headline */}
        <h1 className="font-display font-normal text-ink leading-[0.92] tracking-[-0.02em] text-[clamp(3rem,11vw,11.25rem)]">
          <motion.span
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="block"
          >
            Events,
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.22, ease }}
            className="block pl-[6vw] md:pl-[9vw]"
          >
            <span className="italic text-crimson">executed</span> in
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.34, ease }}
            className="block pl-[14vw] md:pl-[20vw]"
          >
            full <span className="italic text-crimson">measure.</span>
          </motion.span>
        </h1>

        {/* 3-column grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease }}
          className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-[1.3fr_0.9fr_1fr] gap-10 md:gap-12 items-end"
        >
          {/* Lede column */}
          <div>
            <p className="mono-kicker text-crimson">— Since 2012</p>
            <p className="font-display text-[clamp(1.25rem,2vw,1.75rem)] leading-[1.25] text-ink/90 max-w-[34ch] mt-4">
              Grandstyle is a planning & production event company orchestrating{" "}
              <span className="italic text-crimson">
                weddings, galas and private chapters
              </span>{" "}
              with quiet precision and uncommon care.
            </p>
          </div>

          {/* Stats column */}
          <div className="flex flex-col gap-4">
            {[
              { num: "1,200+", lbl: "Events staged" },
              { num: "3", lbl: "Offices · Lagos · Ondo · Abuja" },
              {
                num: (
                  <>
                    13
                    <span className="text-[0.5em] text-crimson ml-1">yr</span>
                  </>
                ),
                lbl: "Tenure",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex items-baseline gap-4 pb-4 border-b border-dashed border-line"
              >
                <span className="font-display text-[clamp(2rem,3.2vw,2.75rem)] leading-none text-ink">
                  {stat.num}
                </span>
                <span className="mono-kicker text-ash">{stat.lbl}</span>
              </div>
            ))}
          </div>

          {/* CTA column */}
          <div className="flex flex-col gap-5 items-start">
            <MagneticButton
              onClick={() => scrollTo("enquire")}
              ariaLabel="Begin a conversation"
              className="group bg-ink text-paper rounded-full pl-7 pr-5 py-[14px] text-[12px] font-medium uppercase tracking-[0.16em] hover:bg-crimson transition-colors duration-480 ease-standard"
            >
              <span className="inline-flex items-center gap-3">
                <span>Begin a conversation</span>
                <span
                  aria-hidden
                  className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-paper text-ink text-[11px] transition-transform duration-480 ease-standard group-hover:translate-x-1 group-hover:rotate-45"
                >
                  ↗
                </span>
              </span>
            </MagneticButton>
            <span className="mono-kicker text-ash max-w-[28ch]">
              Currently accepting a limited number of engagements per season
            </span>
          </div>
        </motion.div>
      </div>

      {/* Feature image strip */}
      <div className="container-edge">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease }}
          className="relative aspect-[16/7] overflow-hidden bg-cloud"
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
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 50% 40% at 0% 0%, rgba(10,18,40,0.85) 0%, rgba(10,18,40,0) 65%), linear-gradient(180deg, rgba(10,18,40,0.12) 0%, rgba(10,18,40,0) 40%, rgba(10,18,40,0.25) 100%)",
            }}
          />
          <span className="absolute top-5 right-5 mono-kicker text-paper/80">
            № 001 / Film
          </span>
          <span className="absolute left-5 bottom-5 mono-kicker text-paper bg-ink/80 border border-paper/30 px-3 py-2">
            1,000-guest marquee setup · On location
          </span>
        </motion.div>

        {/* Caption row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 pt-6 border-t border-line">
          {[
            { k: "Operating from", v: "Lagos · Ondo · Abuja" },
            { k: "Reach", v: "Nigeria & beyond" },
            { k: "Tenure", v: "13 years" },
            { k: "Disciplines", v: "Weddings · Corporate · Social" },
          ].map((c, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="mono-kicker text-ash">{c.k}</span>
              <span className="font-display text-[clamp(1rem,1.4vw,1.25rem)] text-ink">
                {c.v}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
