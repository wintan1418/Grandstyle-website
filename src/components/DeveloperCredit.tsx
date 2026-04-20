import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const channels = [
  {
    label: "Portfolio",
    value: "oluwintan.com",
    href: "https://oluwintan.com",
    external: true,
  },
  {
    label: "WhatsApp",
    value: "+234 814 580 4206",
    href: "https://wa.me/2348145804206",
    external: true,
  },
  {
    label: "Email",
    value: "wintan1418@gmail.com",
    href: "mailto:wintan1418@gmail.com",
    external: false,
  },
  {
    label: "GitHub",
    value: "@wintan1418",
    href: "https://github.com/wintan1418",
    external: true,
  },
];

const DeveloperCredit = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group inline-flex items-baseline gap-[6px] text-sm text-paper/50 hover:text-paper transition-colors duration-280 ease-standard"
        aria-label="Open developer credit — Wintech"
      >
        <span>Developed by</span>
        <span className="font-display text-paper/80 group-hover:text-gold transition-colors duration-280 tracking-tight relative">
          Wintech
          <span className="absolute left-0 right-0 -bottom-[2px] h-px bg-gold w-0 group-hover:w-full transition-[width] duration-480 ease-standard" />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease }}
            className="fixed inset-0 z-[90] flex items-center justify-center px-5"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dev-credit-title"
          >
            <button
              aria-label="Close developer credit"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.48, ease }}
              className="relative w-full max-w-lg bg-paper text-ink shadow-elevated"
            >
              <span
                aria-hidden
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  background:
                    "linear-gradient(90deg, #0F2B5B 0%, #B8242B 50%, #B8914A 100%)",
                }}
              />

              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute top-4 right-4 w-9 h-9 inline-flex items-center justify-center text-ink/60 hover:text-ink transition-colors duration-280"
              >
                <svg viewBox="0 0 20 20" className="w-4 h-4" aria-hidden>
                  <line x1="3" y1="3" x2="17" y2="17" stroke="currentColor" strokeWidth="1.3" />
                  <line x1="17" y1="3" x2="3" y2="17" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </button>

              <div className="p-8 md:p-10">
                <p className="eyebrow text-crimson mb-5">Credit</p>
                <h3
                  id="dev-credit-title"
                  className="font-display text-3xl md:text-[2.25rem] font-medium leading-[1.05] tracking-tight"
                >
                  Designed & built by{" "}
                  <span className="italic font-light text-ash">Wintech</span>.
                </h3>
                <p className="mt-5 text-body text-ash leading-relaxed max-w-md">
                  Independent product design and front-end engineering — drop a
                  line on any of the channels below.
                </p>

                <ul className="mt-8 divide-y divide-line/80 border-y border-line/80">
                  {channels.map((c) => (
                    <li key={c.label}>
                      <a
                        href={c.href}
                        target={c.external ? "_blank" : undefined}
                        rel={c.external ? "noopener noreferrer" : undefined}
                        className="group flex items-center justify-between gap-6 py-4 transition-colors duration-280 ease-standard hover:text-crimson"
                      >
                        <span className="eyebrow text-ink/60 group-hover:text-crimson/80 transition-colors duration-280">
                          {c.label}
                        </span>
                        <span className="flex items-center gap-3">
                          <span className="font-display text-base md:text-lg">
                            {c.value}
                          </span>
                          <span
                            aria-hidden
                            className="transition-transform duration-480 ease-standard group-hover:translate-x-1 text-crimson"
                          >
                            →
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>

                <p className="mt-8 eyebrow text-ink/40">
                  oluwintan · lagos
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DeveloperCredit;
