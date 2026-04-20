import { motion } from "framer-motion";
import SectionEyebrow from "./SectionEyebrow";

const ease = [0.22, 1, 0.36, 1] as const;

const stats = [
  { value: "13", label: "Years", note: "Since 2012" },
  { value: "1,200+", label: "Events Delivered", note: "Lagos · Ondo · Abuja" },
  { value: "40+", label: "On the Team", note: "Planners · Producers · Crew" },
];

const Manifesto = () => {
  return (
    <section
      id="manifesto"
      aria-labelledby="manifesto-heading"
      className="relative bg-paper section-y"
    >
      <div className="container-edge">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex">
            <SectionEyebrow
              label="A Manifesto"
              number="01"
              tone="crimson"
            />
          </div>

          <motion.h2
            id="manifesto-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease }}
            className="font-display text-display-lg font-medium text-ink leading-[1.08] tracking-tight text-balance mt-8"
          >
            We plan so you can be present.{" "}
            <span className="text-ash italic font-light">
              Thirteen years, thousands of guests, and the same obsession with
              detail behind every one of them.
            </span>
          </motion.h2>
        </div>

        <div className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-3 gap-px bg-line">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease }}
              className="bg-paper px-6 py-12 md:py-16 text-center"
            >
              <p className="font-display text-[3.25rem] md:text-[4.5rem] leading-none text-crimson font-medium tracking-tight">
                {stat.value}
              </p>
              <p className="eyebrow text-ink mt-6">{stat.label}</p>
              <p className="mt-2 text-sm text-ash">{stat.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
