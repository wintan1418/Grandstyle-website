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

const Testimonial = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      7000
    );
    return () => clearInterval(id);
  }, []);

  const active = testimonials[index];

  return (
    <section
      id="testimonial"
      aria-labelledby="testimonial-heading"
      className="relative bg-royal-descent text-paper section-y overflow-hidden"
    >
      <div className="container-edge grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="md:col-span-10"
        >
          <p
            className="font-display text-gold leading-none select-none"
            style={{ fontSize: "clamp(4rem, 10vw, 8rem)" }}
            aria-hidden
          >
            &ldquo;
          </p>

          <h2 id="testimonial-heading" className="sr-only">
            What clients say
          </h2>

          <div className="relative -mt-6 md:-mt-10 min-h-[260px] md:min-h-[240px]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={active.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.7, ease }}
              >
                <p className="font-display italic text-display-lg font-light text-paper leading-[1.2] tracking-tight text-balance max-w-5xl">
                  {active.quote}
                </p>
                <footer className="mt-10 flex items-center gap-4">
                  <span className="hairline bg-gold w-10" />
                  <div>
                    <p className="eyebrow text-navy-soft mb-1">
                      {active.role} · {active.year}
                    </p>
                    <cite className="not-italic font-display text-lg text-paper">
                      {active.name}
                    </cite>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="md:col-span-2 flex md:flex-col gap-3 md:justify-self-end">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setIndex(i)}
              aria-label={`Read testimonial ${i + 1}`}
              className={`h-px transition-all duration-480 ease-standard ${
                i === index
                  ? "w-12 bg-crimson"
                  : "w-8 bg-navy-soft/60 hover:bg-navy-soft"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
