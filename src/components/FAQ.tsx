import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionEyebrow from "./SectionEyebrow";

const ease = [0.22, 1, 0.36, 1] as const;

const faqs = [
  {
    question: "How much does a Grandstyle event typically cost?",
    answer:
      "Budgets vary widely with scale, venue, and the depth of services required. Rather than quote a standard rate, we build every proposal bespoke to your brief — itemised, transparent, and shaped by what your occasion actually needs. Share a few details and we'll come back with specifics.",
  },
  {
    question: "How far in advance should we book?",
    answer:
      "For weddings and peak-season galas, six to twelve months is ideal. Short-notice briefs are welcome — we've turned around full-scale events in as little as four weeks when the team has the capacity.",
  },
  {
    question: "Do you travel outside Nigeria?",
    answer:
      "Yes. We've delivered events across West Africa, Europe, and North America. Destination engagements are quoted with travel, accommodation, and local vendor coordination included transparently.",
  },
  {
    question: "What does payment look like?",
    answer:
      "Payment is structured in phases — a confirmation deposit on signing, further milestones through planning, and a final balance ahead of the event. Exact splits are agreed in your contract and tailored to the scale of the work.",
  },
  {
    question: "Is the deposit refundable?",
    answer:
      "The confirmation deposit secures your date against other enquiries. Refund and reschedule terms are set out clearly in every contract so both sides know exactly where they stand before signing.",
  },
  {
    question: "What is included in the contract?",
    answer:
      "Scope, deliverables, timeline, payment schedule, cancellation terms, contingency clauses, and named planning leads. Every contract is reviewed with you clause by clause before signature — no surprises, no small print.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative bg-cloud section-y"
    >
      <div className="container-edge grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-4 lg:sticky lg:top-28 self-start">
          <SectionEyebrow label="Frequently Asked" number="07" total="08" />
          <motion.h2
            id="faq-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
            className="font-display text-h1 text-ink font-medium leading-[1.08] tracking-tight mt-6"
          >
            The questions{" "}
            <span className="italic font-light text-ash">everyone asks,</span>{" "}
            answered plainly.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.12, ease }}
            className="mt-6 text-body text-ash leading-relaxed max-w-sm"
          >
            If yours isn't here, WhatsApp the team. We reply with specifics
            inside 24 business hours.
          </motion.p>
        </div>

        <ol className="lg:col-span-8 border-t border-line/80">
          {faqs.map((item, i) => {
            const open = openIndex === i;
            return (
              <motion.li
                key={item.question}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.05, ease }}
                className="border-b border-line/80"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  aria-controls={`faq-panel-${i}`}
                  className="w-full py-7 md:py-8 flex items-start justify-between gap-8 text-left group"
                >
                  <div className="flex items-start gap-6 md:gap-8">
                    <span className="font-display text-sm text-gold leading-snug mt-[6px] tabular-nums">
                      0{i + 1}
                    </span>
                    <h3 className="font-display text-lg md:text-2xl text-ink font-medium leading-[1.25] group-hover:text-crimson transition-colors duration-280 ease-standard">
                      {item.question}
                    </h3>
                  </div>
                  <span
                    aria-hidden
                    className="shrink-0 mt-2 md:mt-3 inline-flex items-center justify-center w-7 h-7 border border-ink/30 text-ink transition-colors duration-280 ease-standard group-hover:border-crimson group-hover:text-crimson"
                  >
                    <span
                      className="relative block w-3 h-3"
                      style={{
                        transition: "transform 480ms cubic-bezier(0.22,1,0.36,1)",
                        transform: open ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                    >
                      <span className="absolute top-1/2 left-0 right-0 h-px bg-current -translate-y-1/2" />
                      <span className="absolute top-0 bottom-0 left-1/2 w-px bg-current -translate-x-1/2" />
                    </span>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.48, ease }}
                      className="overflow-hidden"
                    >
                      <p className="pl-[50px] md:pl-[58px] pr-8 pb-8 text-body text-ash leading-relaxed max-w-2xl">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default FAQ;
