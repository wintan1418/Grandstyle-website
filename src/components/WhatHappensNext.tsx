import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    label: "Within 24 hrs",
    title: "First reply",
    body: "A named planner acknowledges your enquiry with a few sharpening questions.",
  },
  {
    label: "Day 2–4",
    title: "Discovery call",
    body: "A 30-minute call to hear the occasion in full — guests, venue, tone, budget.",
  },
  {
    label: "Week 1",
    title: "Tailored proposal",
    body: "Scope, vendor shortlist, itemised budget, and timeline — in your inbox.",
  },
  {
    label: "On signature",
    title: "Your date is ours",
    body: "40% deposit secures the date. A lead planner is assigned. Work begins.",
  },
];

const WhatHappensNext = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-ink/15">
      {steps.map((step, i) => (
        <motion.div
          key={step.title}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: i * 0.08, ease }}
          className="bg-paper/80 backdrop-blur-sm p-6 md:p-7"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-display text-xs text-gold tabular-nums">
              0{i + 1}
            </span>
            <span className="h-px w-4 bg-ink/30" />
            <span className="eyebrow text-ink/60">{step.label}</span>
          </div>
          <h4 className="font-display text-lg md:text-xl text-ink font-medium leading-[1.2]">
            {step.title}
          </h4>
          <p className="mt-2 text-sm text-ash leading-relaxed">{step.body}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default WhatHappensNext;
