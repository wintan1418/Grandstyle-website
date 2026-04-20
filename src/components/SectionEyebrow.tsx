import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

type Tone = "crimson" | "paper" | "navy-soft" | "ink" | "gold";

type Props = {
  label: string;
  number: string;
  total?: string;
  tone?: Tone;
  className?: string;
};

const toneMap: Record<Tone, string> = {
  crimson: "text-crimson",
  paper: "text-paper",
  "navy-soft": "text-navy-soft",
  ink: "text-ink",
  gold: "text-gold",
};

const SectionEyebrow = ({
  label,
  number,
  total = "07",
  tone = "crimson",
  className = "",
}: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease }}
      className={`flex items-center gap-4 ${className}`}
    >
      <span
        className={`font-display text-[13px] leading-none ${toneMap[tone]} opacity-70`}
      >
        {number}
        <span className="mx-[3px] opacity-50">/</span>
        {total}
      </span>
      <span className={`h-px w-6 ${toneMap[tone]} opacity-40`} />
      <span className={`eyebrow ${toneMap[tone]}`}>{label}</span>
    </motion.div>
  );
};

export default SectionEyebrow;
