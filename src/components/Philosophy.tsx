import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BlurImage from "./BlurImage";

const ease = [0.22, 1, 0.36, 1] as const;

const slides = [
  {
    publicId: "gallery/grandstyle_image_wk4u64",
    caption: "Mid-service",
  },
  {
    publicId: "gallery/bamqjbs2skqkh3pa9zxk",
    caption: "Stage · final checks",
  },
  {
    publicId: "featured/Corporate%20Gatherings",
    caption: "Room · full house",
  },
  {
    publicId: "gallery/jkncqcyke3nr5p0o7jmb",
    caption: "The team · before doors",
  },
  {
    publicId: "services/Gala%20Dinners",
    caption: "Gala · mid-course",
  },
];

const principles = [
  {
    key: "Principle 01",
    name: "Measure",
    body: "Scale is a decision, not an ambition. Every gesture is matched to the room and the hour.",
  },
  {
    key: "Principle 02",
    name: "Restraint",
    body: "Editing is the work. We subtract until only the essential remains — then we perfect it.",
  },
  {
    key: "Principle 03",
    name: "Tempo",
    body: "Evenings breathe. We shape pace so guests forget time and remember feeling.",
  },
  {
    key: "Principle 04",
    name: "Care",
    body: "Logistics is a love language. Every cable, car and candle is accounted for — twice.",
  },
];

const Philosophy = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      5500
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="philosophy"
      aria-labelledby="philosophy-heading"
      className="relative bg-ink text-paper"
    >
      <div className="container-edge py-24 md:py-32">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="mono-kicker text-gold"
        >
          (03) — Philosophy
        </motion.p>

        <motion.h2
          id="philosophy-heading"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="font-display font-normal text-paper mt-6 max-w-[18ch] leading-[1.05] tracking-[-0.01em] text-[clamp(2.5rem,6vw,6rem)]"
        >
          The best events feel{" "}
          <span className="italic text-crimson">inevitable —</span>{" "}
          <span className="text-paper/85">
            as if the evening could have unfolded no other way.
          </span>
        </motion.h2>

        {/* Cinematic slide — crossfades through a few frames */}
        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.25, ease }}
          className="relative mt-20 md:mt-24"
        >
          <div className="relative aspect-[21/9] w-full overflow-hidden bg-ink">
            {slides.map((s, i) => (
              <div
                key={s.publicId}
                aria-hidden={i !== index}
                className="absolute inset-0 transition-opacity duration-[1400ms] ease-standard will-change-[opacity]"
                style={{ opacity: i === index ? 1 : 0 }}
              >
                <BlurImage
                  publicId={s.publicId}
                  w={2000}
                  h={857}
                  alt={s.caption}
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            ))}

            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(10,18,40,0.35) 0%, rgba(10,18,40,0.15) 45%, rgba(10,18,40,0.7) 100%)",
              }}
            />

            <span className="absolute top-5 left-5 mono-kicker text-paper/80">
              Still · {slides[index].caption}
            </span>
            <span className="absolute bottom-5 right-5 mono-kicker text-paper/80 tabular-nums">
              {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>

            <div className="absolute bottom-5 left-5 flex items-center gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.publicId}
                  onClick={() => setIndex(i)}
                  aria-label={`View frame ${i + 1}`}
                  className={`h-px transition-all duration-480 ease-standard ${
                    i === index ? "w-10 bg-paper" : "w-6 bg-paper/40 hover:bg-paper/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.figure>

        <div className="mt-20 md:mt-24 pt-8 border-t border-paper/20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {principles.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease }}
              className="flex flex-col"
            >
              <span className="mono-kicker text-gold">{p.key}</span>
              <h3 className="font-display text-[clamp(2rem,3vw,2.625rem)] leading-none text-paper mt-4">
                {p.name}
              </h3>
              <p className="text-sm leading-[1.6] text-paper/65 mt-3 max-w-[34ch]">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
