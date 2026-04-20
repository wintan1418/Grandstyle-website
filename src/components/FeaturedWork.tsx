import { motion } from "framer-motion";
import BlurImage from "./BlurImage";
import SectionEyebrow from "./SectionEyebrow";

const ease = [0.22, 1, 0.36, 1] as const;

const work = [
  {
    category: "Cultural",
    publicId: "featured/Corporate%20Gatherings",
    alt: "A cultural celebration staged by Grandstyle Events",
  },
  {
    category: "Corporate",
    publicId: "award/Best%20Corporate%20Event%202022",
    alt: "A corporate event produced by Grandstyle Events",
  },
  {
    category: "Wedding",
    publicId: "gallery/qs7d7w6mvf1jk93ji0ao",
    alt: "A wedding ceremony planned by Grandstyle Events",
  },
  {
    category: "Social",
    publicId: "gallery/Memorable_Birthday_Bashes_nc02bb",
    alt: "A milestone social celebration by Grandstyle Events",
  },
  {
    category: "Specialty",
    publicId: "gallery/burial_seremony_agw5rw",
    alt: "A specialty ceremony coordinated by Grandstyle Events",
  },
  {
    category: "Wedding",
    publicId: "WhatsApp_Image_2026-04-20_at_10.29.38_cqhq4o",
    alt: "A wedding ceremony planned by Grandstyle Events",
  },
  {
    category: "Corporate",
    publicId: "gallery/Gala%20Dinner",
    alt: "A corporate gala dinner produced by Grandstyle Events",
  },
];

const FeaturedWork = () => {
  return (
    <section
      id="featured-work"
      aria-labelledby="featured-work-heading"
      className="relative bg-royal-descent text-paper section-y overflow-hidden"
    >
      <div className="container-edge">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
            className="max-w-2xl"
          >
            <SectionEyebrow
              label="Selected Work"
              number="03"
              tone="navy-soft"
            />
            <h2
              id="featured-work-heading"
              className="font-display text-h1 text-paper font-medium leading-[1.08] tracking-tight mt-6"
            >
              Occasions{" "}
              <span className="italic font-light text-paper/80">
                we've shaped.
              </span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="max-w-sm text-paper/60 text-body leading-relaxed"
          >
            A cross-section — corporate, cultural, ceremonial — each delivered
            with the same standard of craft.
          </motion.p>
        </div>
      </div>

      <div className="relative">
        <div className="overflow-x-auto scrollbar-none scroll-smooth snap-x snap-mandatory">
          <ul className="flex gap-6 md:gap-8 pl-[max(1.25rem,5vw)] pr-[max(1.25rem,5vw)]">
            {work.map((item, i) => (
              <motion.li
                key={`${item.category}-${i}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.05, ease }}
                className="flex-shrink-0 w-[280px] md:w-[380px] snap-start group"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-navy-deep">
                  <BlurImage
                    publicId={item.publicId}
                    w={760}
                    h={950}
                    alt={item.alt}
                    className="absolute inset-0 w-full h-full"
                    imgClassName="transition-transform duration-800 ease-standard group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-480 pointer-events-none" />
                  <div className="absolute top-5 left-5 flex items-center gap-3 pointer-events-none">
                    <span className="h-px w-6 bg-crimson" />
                    <span className="eyebrow text-paper/95">
                      {item.category}
                    </span>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="container-edge mt-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <p className="text-paper/60 text-sm max-w-md">
            A cross-section of our recent work. Request our full portfolio for
            case studies, briefs, and outcomes.
          </p>
          <button
            onClick={() => {
              const el = document.getElementById("enquire");
              if (!el) return;
              const top = el.getBoundingClientRect().top + window.scrollY - 72;
              window.scrollTo({ top, behavior: "smooth" });
            }}
            className="btn-ghost-light"
          >
            Request our full portfolio →
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
