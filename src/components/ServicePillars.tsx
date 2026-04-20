import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const cldImage = (publicId: string, w: number, h: number) =>
  `https://res.cloudinary.com/wintan1418/image/upload/c_fill,w_${w},h_${h},g_auto,q_auto:best,f_auto/${publicId}`;

const pillars = [
  {
    eyebrow: "01 · Ceremonial",
    title: "Weddings",
    description:
      "Bridal ceremonies designed with intent — from concept and vendor curation to day-of orchestration.",
    image: cldImage("WhatsApp_Image_2026-04-20_at_10.29.38_cqhq4o", 900, 1100),
    meta: "Concept · Full-Planning · Day-of",
    tone: "light",
  },
  {
    eyebrow: "02 · Authoritative",
    title: "Corporate",
    description:
      "Boardroom galas, product launches, and AGMs — planned with the precision your stakeholders expect.",
    image: cldImage("gallery/Corporate_Events_with_African_Flair_hvhrmz", 900, 1100),
    meta: "Galas · Launches · Conferences",
    tone: "light",
  },
  {
    eyebrow: "03 · Warm",
    title: "Social",
    description:
      "Milestone birthdays, anniversaries, cultural ceremonies — occasions that deserve the same care as the largest gala.",
    image: cldImage("gallery/Memorable_Birthday_Bashes_nc02bb", 900, 1100),
    meta: "Birthdays · Anniversaries · Cultural",
    tone: "light",
  },
  {
    eyebrow: "04 · Integrated",
    title: "Production & Rentals",
    description:
      "Lighting, live bands, DJs, MCs, multimedia, photography, and rental equipment — fully integrated, never outsourced.",
    image: cldImage("services/live%20band", 900, 1100),
    meta: "Sound · Light · Vision",
    tone: "light",
  },
];

const ServicePillars = () => {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative bg-paper section-y"
    >
      <div className="container-edge">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
            className="max-w-2xl"
          >
            <p className="eyebrow text-crimson mb-5">Services</p>
            <h2
              id="services-heading"
              className="font-display text-h1 font-medium text-ink leading-[1.08] tracking-tight"
            >
              Four pillars,{" "}
              <span className="italic font-light text-ash">
                fully integrated.
              </span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.12, ease }}
            className="max-w-md text-body text-ash leading-relaxed"
          >
            Fourteen distinct services, organised so your occasion stays the
            centre of the story — and never the logistics.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-20">
          {pillars.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: (i % 2) * 0.1, ease }}
              className={`group cursor-pointer ${
                i % 2 === 1 ? "md:mt-20" : ""
              }`}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-cloud">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-800 ease-standard group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-480 ease-standard" />
                <div className="absolute top-5 left-5">
                  <span className="inline-block bg-paper/95 text-ink eyebrow px-3 py-2">
                    {p.eyebrow}
                  </span>
                </div>
              </div>
              <div className="mt-7 flex items-start justify-between gap-8">
                <div>
                  <h3 className="font-display text-h2 text-ink font-medium leading-[1.1] group-hover:text-crimson transition-colors duration-480 ease-standard">
                    {p.title}
                  </h3>
                  <p className="mt-4 max-w-md text-body text-ash leading-relaxed">
                    {p.description}
                  </p>
                  <p className="mt-5 eyebrow text-ink/60">{p.meta}</p>
                </div>
                <span
                  aria-hidden
                  className="shrink-0 translate-y-2 text-crimson text-2xl font-display transition-transform duration-480 ease-standard group-hover:translate-x-2"
                >
                  →
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicePillars;
