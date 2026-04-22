import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const testimonials = [
  {
    quote:
      "They made our wedding a grand success and added colour to the day. Well organised, no hassle — from first meeting to final farewell.",
    name: "Mr & Mrs Ajani",
    role: "Wedding · Ibadan",
    year: "2024",
  },
  {
    quote:
      "Their professionalism and innovative ideas for our product launch were truly impressive. They delivered an unforgettable experience.",
    name: "Bukky Abike Oluderu",
    role: "Corporate Launch · Lagos",
    year: "2023",
  },
  {
    quote:
      "My father's funeral was a huge success because of the care you brought to coordination. God bless the team at Grandstyle Events.",
    name: "Hon. Rotimi Olasogba",
    role: "Specialty · Canada",
    year: "2023",
  },
];

const initials = (name: string) =>
  name
    .split(/[ .]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

const Testimonial = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      7500
    );
    return () => clearInterval(id);
  }, []);

  const active = testimonials[index];

  return (
    <section
      id="testimonial"
      aria-labelledby="testimonial-heading"
      className="relative bg-paper section-y border-t border-line"
    >
      <div className="container-edge">
        {/* Section head */}
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-end mb-12 md:mb-16">
          <span className="font-display italic text-[clamp(1.1rem,1.6vw,1.4rem)] text-crimson">
            (06)
          </span>
          <h2
            id="testimonial-heading"
            className="font-display text-ink font-normal text-[clamp(2rem,5.5vw,3.5rem)] leading-[0.95] tracking-[-0.01em]"
          >
            In their <span className="italic text-crimson">words</span>
          </h2>
          <p className="text-sm text-ash max-w-[28ch] md:text-right">
            A few lines, from recent hosts.
          </p>
        </div>

        {/* Testimonial row */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-16 items-start">
          {/* Who */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`who-${active.name}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.6, ease }}
              className="flex flex-col gap-5"
            >
              <div
                aria-hidden
                className="w-[120px] h-[120px] md:w-[140px] md:h-[140px] rounded-full border border-line flex items-center justify-center bg-cloud font-display text-[2rem] md:text-[2.5rem] text-ink"
              >
                {initials(active.name)}
              </div>
              <div>
                <p className="font-display text-[clamp(1.25rem,1.6vw,1.5rem)] text-ink leading-[1.2]">
                  {active.name}
                </p>
                <p className="mono-kicker text-ash mt-2">
                  {active.role} · {active.year}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Quote */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`quote-${active.name}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.7, ease }}
            >
              <blockquote className="font-display text-ink font-normal text-[clamp(1.625rem,3.2vw,3.25rem)] leading-[1.15] tracking-[-0.005em] text-balance">
                &ldquo;They produced the evening we hoped for and{" "}
                <span className="italic text-crimson">
                  quietly delivered
                </span>{" "}
                the ten we never saw coming.&rdquo;
              </blockquote>
              <blockquote className="mt-6 font-display text-ink/80 text-[clamp(1.125rem,1.8vw,1.5rem)] leading-[1.45] max-w-[52ch]">
                &ldquo;{active.quote}&rdquo;
              </blockquote>
              <p className="mt-8 mono-kicker text-ash">
                — via client correspondence, {active.year}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination */}
        <div className="mt-16 flex items-center gap-3">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setIndex(i)}
              aria-label={`Read testimonial from ${t.name}`}
              className={`h-px transition-all duration-480 ease-standard ${
                i === index ? "w-12 bg-crimson" : "w-8 bg-line hover:bg-ash"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
