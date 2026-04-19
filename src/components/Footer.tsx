import { motion } from "framer-motion";

const LOGO_URL =
  "https://res.cloudinary.com/wintan1418/image/upload/c_thumb,w_200,g_face/v1743877057/logo%20folder/grandstyle%20logo.png";

const services = [
  "Weddings",
  "Corporate Events",
  "Social Celebrations",
  "Production & Rentals",
  "Specialty Services",
];

const company = [
  { label: "Our Story", target: "manifesto" },
  { label: "Process", target: "process" },
  { label: "Selected Work", target: "featured-work" },
  { label: "Journal", target: "journal" },
];

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top, behavior: "smooth" });
};

const Footer = () => {
  return (
    <footer className="bg-royal-descent text-paper">
      <div className="container-edge pt-24 md:pt-32 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10 pb-16 border-b border-paper/10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-5"
          >
            <div className="flex items-center gap-3 mb-6">
              <img
                src={LOGO_URL}
                alt=""
                className="h-10 w-auto brightness-110"
                width="40"
                height="40"
              />
              <div>
                <span className="block font-display text-2xl leading-none">
                  Grandstyle
                </span>
                <span className="eyebrow text-gold mt-1 block">
                  Events · Est. 2012
                </span>
              </div>
            </div>
            <p className="font-display text-xl md:text-2xl text-paper/90 text-pretty leading-[1.35] max-w-md">
              We plan so you can be present.
            </p>
            <p className="mt-4 text-paper/70 max-w-md text-body leading-relaxed">
              Thirteen years of Nigerian event mastery — delivered with
              restraint, precision, and quiet craft.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-10 flex items-end gap-4 max-w-md"
            >
              <label className="flex-1">
                <span className="eyebrow text-paper/60 block mb-2">
                  Receive quiet updates
                </span>
                <input
                  type="email"
                  placeholder="you@domain.com"
                  aria-label="Email address"
                  className="w-full bg-transparent border-b border-paper/30 focus:border-paper focus:outline-none py-2 text-paper placeholder:text-paper/40 transition-colors duration-280"
                />
              </label>
              <button
                type="submit"
                className="eyebrow text-paper hover:text-gold transition-colors duration-280 pb-2"
                aria-label="Subscribe"
              >
                Subscribe →
              </button>
            </form>
          </motion.div>

          <div className="md:col-span-3">
            <h4 className="eyebrow text-gold mb-5">Services</h4>
            <ul className="flex flex-col gap-3">
              {services.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => scrollTo("services")}
                    className="text-paper/80 hover:text-paper text-left transition-colors duration-280"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="eyebrow text-gold mb-5">Company</h4>
            <ul className="flex flex-col gap-3">
              {company.map((c) => (
                <li key={c.target}>
                  <button
                    onClick={() => scrollTo(c.target)}
                    className="text-paper/80 hover:text-paper text-left transition-colors duration-280"
                  >
                    {c.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="eyebrow text-gold mb-5">Contact</h4>
            <ul className="flex flex-col gap-3 text-paper/80 text-sm">
              <li>
                <a
                  href="https://wa.me/2348137635064"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-paper transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@grandstylevents.com"
                  className="hover:text-paper transition-colors break-all"
                >
                  info@grandstylevents.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+2348065098130"
                  className="hover:text-paper transition-colors"
                >
                  +234 806 509 8130
                </a>
              </li>
              <li className="pt-2 text-navy-soft">
                Lagos · Ondo · Abuja
                <br />
                Nigeria
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-paper/50">
          <p>
            © {new Date().getFullYear()} Grandstyle Events Consortium · Lagos,
            Nigeria
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/grandstyle.events"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-paper transition-colors duration-280"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/grandstyle.event"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-paper transition-colors duration-280"
            >
              Facebook
            </a>
            <a
              href="https://www.linkedin.com/company/grandstyleevents/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-paper transition-colors duration-280"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
