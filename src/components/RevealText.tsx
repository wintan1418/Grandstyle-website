import { motion } from "framer-motion";
import type { ReactNode } from "react";

type RevealTextProps = {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
  italicWords?: string[];
  crimsonWords?: string[];
  ashWords?: string[];
};

const ease = [0.22, 1, 0.36, 1] as const;

const RevealText = ({
  children,
  as = "span",
  className = "",
  delay = 0,
  stagger = 0.05,
  italicWords = [],
  crimsonWords = [],
  ashWords = [],
}: RevealTextProps) => {
  const words = children.split(" ");
  const content: ReactNode = words.map((word, i) => {
    const clean = word.replace(/[.,!?;:]/g, "").toLowerCase();
    const classes: string[] = ["inline-block", "mr-[0.22em]"];
    if (italicWords.some((w) => clean === w.toLowerCase()))
      classes.push("italic", "font-light");
    if (crimsonWords.some((w) => clean === w.toLowerCase()))
      classes.push("text-crimson");
    if (ashWords.some((w) => clean === w.toLowerCase()))
      classes.push("text-ash");
    return (
      <motion.span
        key={`${word}-${i}`}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: delay + i * stagger, ease }}
        className={classes.join(" ")}
      >
        {word}
      </motion.span>
    );
  });

  const Tag = as as keyof JSX.IntrinsicElements;
  return <Tag className={className}>{content}</Tag>;
};

export default RevealText;
