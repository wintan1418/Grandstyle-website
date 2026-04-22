import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

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
