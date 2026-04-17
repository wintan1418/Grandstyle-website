import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const stages = [
  {
    number: "01",
    title: "Discover",
    body: "Consultation, brief, budget alignment, venue visit. We start by understanding the occasion, not pitching a package.",
  },
  {
    number: "02",
    title: "Design",
    body: "Concept, mood, vendor curation, timeline, contingencies. Every detail is decided before anyone sets a table.",
  },
  {
    number: "03",
    title: "Deliver",
    body: "Production, coordination, on-the-day execution. Our crew handles every moment — you stay present at your own event.",
  },
  {
    number: "04",
    title: "Reflect",
    body: "Wrap-up, media hand-off, post-event report. The evening ends, the craft continues.",
  },
];

const ProcessTeaser = () => {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="relative bg-paper section-y"
    >
      <div className="container-edge grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="lg:col-span-5 lg:sticky lg:top-32 self-start"
        >
          <p className="eyebrow text-crimson mb-5">How We Work</p>
          <h2
            id="process-heading"
            className="font-display text-h1 text-ink font-medium leading-[1.08] tracking-tight"
          >
            From first{" "}
            <span className="italic font-light text-ash">conversation</span>{" "}
            to last{" "}
            <span className="italic font-light text-ash">guest.</span>
          </h2>
          <p className="mt-8 max-w-md text-body text-ash leading-relaxed">
            Four stages, one standard. Clear deliverables at every step — and
            a named lead you can reach at any hour.
          </p>
          <button
            onClick={() => {
              const el = document.getElementById("enquire");
              if (!el) return;
              const top = el.getBoundingClientRect().top + window.scrollY - 72;
              window.scrollTo({ top, behavior: "smooth" });
            }}
            className="btn-ghost mt-10"
          >
            See our full process →
          </button>
        </motion.div>

        <ol className="lg:col-span-7 flex flex-col">
          {stages.map((stage, i) => (
            <motion.li
              key={stage.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease }}
              className="group relative grid grid-cols-[auto,1fr] gap-6 md:gap-10 py-8 md:py-10 border-b border-line last:border-b-0"
            >
              <div className="font-display text-[2.5rem] md:text-[3.5rem] leading-none text-gold font-medium tracking-tight">
                {stage.number}
              </div>
              <div>
                <h3 className="font-display text-h2 text-ink font-medium leading-[1.12]">
                  {stage.title}
                </h3>
                <p className="mt-3 max-w-xl text-body text-ash leading-relaxed">
                  {stage.body}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ProcessTeaser;
