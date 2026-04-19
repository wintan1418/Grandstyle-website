import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdPNzlnnms0PjyEA4lJMcZYw1qoBxdO3GYyAx1gxONY3-XEAw/viewform?embedded=true";

const ClosingCTA = () => {
  return (
    <section
      id="enquire"
      aria-labelledby="enquire-heading"
      className="relative overflow-hidden"
    >
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(135deg, #FBFAF7 0%, #F7E6E3 30%, #E8D3D1 65%, #B8242B 100%)",
        }}
      />
      <div className="relative z-10 container-edge section-y">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
            className="lg:col-span-5"
          >
            <p className="eyebrow text-ink/70 mb-6">Begin</p>
            <h2
              id="enquire-heading"
              className="font-display text-display-lg font-medium text-ink leading-[1.05] tracking-tight text-balance"
            >
              Tell us about{" "}
              <span className="italic font-light">your event.</span>
            </h2>
            <p className="mt-8 max-w-md text-body-lg text-ink/80 leading-relaxed">
              Every enquiry is read by a named member of our planning team. We
              respond, with specifics, within 24 business hours.
            </p>

            <div className="mt-10 space-y-4">
              <a
                href="https://wa.me/2348137635064"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-6 py-5 border-b border-ink/20 hover:border-ink transition-colors duration-280"
              >
                <div>
                  <p className="eyebrow text-ink/60 mb-2">WhatsApp · Primary</p>
                  <p className="font-display text-xl md:text-2xl text-ink">
                    +234 813 763 5064
                  </p>
                </div>
                <span
                  aria-hidden
                  className="text-ink text-xl font-display transition-transform duration-480 ease-standard group-hover:translate-x-2"
                >
                  →
                </span>
              </a>

              <a
                href="mailto:info@grandstylevents.com"
                className="group flex items-center justify-between gap-6 py-5 border-b border-ink/20 hover:border-ink transition-colors duration-280"
              >
                <div>
                  <p className="eyebrow text-ink/60 mb-2">Email</p>
                  <p className="font-display text-lg md:text-xl text-ink break-all">
                    info@grandstylevents.com
                  </p>
                </div>
                <span
                  aria-hidden
                  className="text-ink text-xl font-display transition-transform duration-480 ease-standard group-hover:translate-x-2"
                >
                  →
                </span>
              </a>

              <a
                href="tel:+2348065098130"
                className="group flex items-center justify-between gap-6 py-5 border-b border-ink/20 hover:border-ink transition-colors duration-280"
              >
                <div>
                  <p className="eyebrow text-ink/60 mb-2">Call</p>
                  <p className="font-display text-lg md:text-xl text-ink">
                    +234 806 509 8130
                  </p>
                </div>
                <span
                  aria-hidden
                  className="text-ink text-xl font-display transition-transform duration-480 ease-standard group-hover:translate-x-2"
                >
                  →
                </span>
              </a>
            </div>

            <div className="mt-10 p-7 bg-ink/90 text-paper">
              <p className="eyebrow text-gold mb-3">Where we are</p>
              <p className="font-display text-lg md:text-xl text-paper leading-[1.4] max-w-md">
                Lagos · Ondo · Abuja.{" "}
                <span className="text-paper/75 italic font-light">
                  Consultation by appointment at any of our offices.
                </span>
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="lg:col-span-7"
          >
            <div className="bg-paper shadow-elevated relative">
              <span
                aria-hidden
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  background:
                    "linear-gradient(90deg, #0F2B5B 0%, #B8242B 50%, #B8914A 100%)",
                }}
              />

              <div className="p-8 md:p-10 border-b border-line">
                <p className="eyebrow text-crimson mb-4">Enquiry Form</p>
                <h3 className="font-display text-2xl md:text-3xl text-ink font-medium leading-[1.2]">
                  Send us your brief.
                </h3>
                <p className="mt-4 text-ash text-body leading-relaxed max-w-lg">
                  A few details about the occasion, the date, and the scale.
                  The more you share, the more specific our first reply can be.
                </p>
              </div>

              <div className="relative bg-paper">
                <iframe
                  src={FORM_URL}
                  title="Grandstyle Events enquiry form"
                  loading="lazy"
                  className="w-full block"
                  style={{ height: 820, border: 0 }}
                >
                  Loading enquiry form…
                </iframe>
              </div>

              <div className="px-8 md:px-10 py-6 bg-cloud border-t border-line flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="eyebrow text-ink/60">
                  Prefer a direct line? Choose WhatsApp, email, or a call.
                </p>
                <a
                  href="https://wa.me/2348137635064"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost self-start sm:self-auto"
                >
                  WhatsApp us →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ClosingCTA;
