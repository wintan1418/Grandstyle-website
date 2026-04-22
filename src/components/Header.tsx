import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";

const LOGO_URL =
  "https://res.cloudinary.com/wintan1418/image/upload/w_600,c_fit,q_auto:best,f_auto/v1743877057/logo%20folder/grandstyle%20logo.png";

const navItems = [
  { label: "About", target: "manifesto" },
  { label: "Services", target: "services" },
  { label: "Work", target: "featured-work" },
  { label: "Process", target: "process" },
  { label: "Contact", target: "enquire" },
];

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (!element) return;
  const offsetTop = element.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top: offsetTop, behavior: "smooth" });
};

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      if (Math.abs(y - lastY) > 6) {
        if (y > lastY && y > 180) setHidden(true);
        else setHidden(false);
        lastY = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleClick = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => scrollToSection(id), menuOpen ? 240 : 0);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-[transform,background-color,border-color] duration-480 ease-standard will-change-transform ${
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled
            ? "bg-paper border-b border-line/60 shadow-[0_1px_0_rgba(15,43,91,0.04)]"
            : "bg-transparent"
        }`}
      >
        <div className="container-edge flex items-center justify-between h-16 md:h-20">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="hidden md:inline-flex items-center group"
            aria-label="Grandstyle Events home"
          >
            <img
              src={LOGO_URL}
              alt="Grandstyle Events"
              className="h-14 lg:h-16 w-auto"
              width="72"
              height="72"
              style={{
                filter: scrolled ? "invert(1) hue-rotate(180deg)" : "none",
                transition: "filter 280ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />
          </a>
          <span className="md:hidden" aria-hidden />

          <nav className="hidden lg:flex items-center gap-10" aria-label="Primary">
            {navItems.map((item) => (
              <button
                key={item.target}
                onClick={() => handleClick(item.target)}
                className={`group relative text-[13px] font-body font-medium tracking-tight transition-colors duration-280 ${
                  scrolled ? "text-ink hover:text-crimson" : "text-paper hover:text-paper"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-2 left-0 h-px w-0 group-hover:w-full transition-all duration-480 ease-standard ${
                    scrolled ? "bg-crimson" : "bg-paper"
                  }`}
                />
              </button>
            ))}
          </nav>

          <div className="hidden lg:block">
            <MagneticButton
              onClick={() => handleClick("enquire")}
              ariaLabel="Start an Enquiry"
              className="group bg-crimson text-paper rounded-full pl-6 pr-4 py-[11px] text-[11px] font-medium uppercase tracking-[0.16em] shadow-[0_8px_22px_-12px_rgba(184,36,43,0.55)] hover:bg-crimson-deep hover:shadow-[0_14px_30px_-12px_rgba(184,36,43,0.7)] transition-[background-color,box-shadow] duration-480 ease-standard"
            >
              <span className="inline-flex items-center gap-[10px]">
                <span>Start an Enquiry</span>
                <span
                  aria-hidden
                  className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-paper/15 text-paper transition-transform duration-480 ease-standard group-hover:translate-x-[3px] group-hover:bg-paper/25"
                >
                  →
                </span>
              </span>
            </MagneticButton>
          </div>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className={`lg:hidden inline-flex flex-col gap-[5px] p-2 -mr-2 transition-colors duration-280 ${
              scrolled || menuOpen ? "text-ink" : "text-paper"
            }`}
          >
            <span
              className={`block h-px w-6 bg-current transition-transform duration-280 ease-standard ${
                menuOpen ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-current transition-opacity duration-160 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-px w-6 bg-current transition-transform duration-280 ease-standard ${
                menuOpen ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-paper lg:hidden pt-20"
          >
            <div className="container-edge py-8 flex flex-col h-full">
              <nav className="flex flex-col gap-6 mt-4" aria-label="Mobile">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.target}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.48,
                      delay: 0.08 + i * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={() => handleClick(item.target)}
                    className="text-left font-display text-3xl md:text-4xl text-ink hover:text-crimson transition-colors duration-280"
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.48, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mt-auto pt-10 border-t border-line"
              >
                <button
                  onClick={() => handleClick("enquire")}
                  className="btn-primary w-full"
                >
                  Start an Enquiry
                </button>
                <p className="eyebrow text-ash mt-6">
                  Lagos · Ondo · Abuja
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
