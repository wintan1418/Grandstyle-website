import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const services = [
  {
    n: "01",
    title: "Weddings",
    italicWord: null,
    description:
      "Full creative direction, guest journey design, logistics and day-of orchestration for ceremonies from intimate to grand.",
    tags: ["Planning", "Design"],
  },
  {
    n: "02",
    title: "Corporate",
    italicWord: null,
    description:
      "Boardroom galas, product launches, AGMs and press dinners — staged with the precision your stakeholders expect.",
    tags: ["Production", "Script"],
  },
  {
    n: "03",
    title: "Private",
    italicWord: "chapters",
    description:
      "Milestones, anniversaries, rehearsal dinners, welcome weekends. Intimate by design, precise by nature.",
    tags: ["Intimate", "Bespoke"],
  },
  {
    n: "04",
    title: "Cultural",
    italicWord: "ceremonies",
    description:
      "Traditional and contemporary ceremonies — canopies, cultural weddings, final honours — held with the reverence they deserve.",
    tags: ["Heritage", "Ceremony"],
  },
  {
    n: "05",
    title: "Destination",
    italicWord: "affairs",
    description:
      "Multi-day itineraries at home and abroad: scouting, permits, crew, ground teams, and the subtleties travel does not forgive.",
    tags: ["Travel", "Logistics"],
  },
  {
    n: "06",
    title: "Production",
    italicWord: "& build",
    description:
      "Sound, lighting, multimedia, décor, florals and rentals — fabricated in-house, commissioned rather than catalogued.",
    tags: ["Fabrication", "Floristry"],
  },
];

const ServicesIndex = () => {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative bg-paper section-y"
    >
      <div className="container-edge">
        {/* Section head */}
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-end mb-12 md:mb-16">
          <span className="font-display italic text-[clamp(1.1rem,1.6vw,1.4rem)] text-crimson">
            (02)
          </span>
          <motion.h2
            id="services-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
            className="font-display text-ink font-normal text-[clamp(2rem,5.5vw,3.5rem)] leading-[0.95] tracking-[-0.01em]"
          >
            An index of{" "}
            <span className="italic text-crimson">disciplines</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.12, ease }}
            className="text-sm text-ash max-w-[32ch] md:text-right leading-relaxed"
          >
            Six practices, one studio. Engage us for the whole arc — or a
            single, surgical intervention.
          </motion.p>
        </div>

        {/* Service rows */}
        <ol className="border-t border-ink">
          {services.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.05, ease }}
              className="group relative border-b border-line"
            >
              <div
                className="
                  grid items-center gap-4 md:gap-8
                  grid-cols-[auto_1fr_auto]
                  md:grid-cols-[72px_1.2fr_1.8fr_160px_44px]
                  py-6 md:py-8
                  transition-[padding,background-color] duration-480 ease-standard
                  group-hover:pl-4 group-hover:pr-4
                "
              >
                <span className="mono-kicker text-ash">{s.n} —</span>
                <h3 className="font-display text-[clamp(1.5rem,3.2vw,2.375rem)] leading-none text-ink transition-colors duration-480 ease-standard group-hover:text-crimson group-hover:italic">
                  {s.title}
                  {s.italicWord && (
                    <span className="italic">{" "}{s.italicWord}</span>
                  )}
                </h3>
                <p className="hidden md:block text-sm text-ash leading-[1.55] max-w-[48ch]">
                  {s.description}
                </p>
                <div className="hidden md:flex gap-2 flex-wrap">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="mono-kicker text-ink/70 border border-line rounded-full px-3 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span
                  aria-hidden
                  className="w-9 h-9 md:w-11 md:h-11 rounded-full border border-ink inline-flex items-center justify-center text-ink text-sm transition-all duration-480 ease-standard group-hover:bg-ink group-hover:text-paper group-hover:-rotate-45"
                >
                  →
                </span>
              </div>
              <span
                aria-hidden
                className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-480 ease-standard"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(184,36,43,0.06) 50%, transparent 100%)",
                }}
              />
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ServicesIndex;
