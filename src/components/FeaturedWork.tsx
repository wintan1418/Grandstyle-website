import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const cldImage = (publicId: string, w: number, h: number) =>
  `https://res.cloudinary.com/wintan1418/image/upload/c_fill,w_${w},h_${h},g_auto,q_auto:best,f_auto/${publicId}`;

const work = [
  {
    title: "Imasayi Canopy",
    venue: "Ondo State",
    category: "Cultural",
    year: "2024",
    guests: "2,000+",
    image: cldImage("featured/Corporate%20Gatherings", 900, 1100),
  },
  {
    title: "Boardroom Gala",
    venue: "Eko Hotel, Lagos",
    category: "Corporate",
    year: "2024",
    guests: "480",
    image: cldImage("gallery/Corporate_Events_with_African_Flair_hvhrmz", 900, 1100),
  },
  {
    title: "A Ceremonial Wedding",
    venue: "Oriental, Lagos",
    category: "Wedding",
    year: "2024",
    guests: "1,200",
    image: cldImage("gallery/qs7d7w6mvf1jk93ji0ao", 900, 1100),
  },
  {
    title: "Milestone Celebration",
    venue: "Private Residence",
    category: "Social",
    year: "2024",
    guests: "320",
    image: cldImage("gallery/Memorable_Birthday_Bashes_nc02bb", 900, 1100),
  },
  {
    title: "Final Honours",
    venue: "Akure",
    category: "Specialty",
    year: "2023",
    guests: "900",
    image: cldImage("gallery/burial_seremony_agw5rw", 900, 1100),
  },
  {
    title: "The Reception",
    venue: "Landmark, Lagos",
    category: "Wedding",
    year: "2023",
    guests: "650",
    image: cldImage("WhatsApp_Image_2026-04-20_at_10.29.38_cqhq4o", 900, 1100),
  },
  {
    title: "Gala Dinner",
    venue: "The Civic, Lagos",
    category: "Corporate",
    year: "2023",
    guests: "540",
    image: cldImage("gallery/Gala%20Dinner", 900, 1100),
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
            <p className="eyebrow text-navy-soft mb-5">Selected Work</p>
            <h2
              id="featured-work-heading"
              className="font-display text-h1 text-paper font-medium leading-[1.08] tracking-tight"
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
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.05, ease }}
                className="flex-shrink-0 w-[280px] md:w-[380px] snap-start group"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-navy-deep">
                  <img
                    src={item.image}
                    alt={`${item.title}, ${item.venue}`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-800 ease-standard group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-480" />
                  <div className="absolute top-5 left-5 flex items-center gap-3">
                    <span className="h-px w-6 bg-crimson" />
                    <span className="eyebrow text-paper/90">
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <h3 className="font-display text-2xl md:text-[1.75rem] text-paper leading-[1.15]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-paper/70 text-sm">
                      {item.venue} · {item.guests} guests · {item.year}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="container-edge mt-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <p className="text-paper/60 text-sm max-w-md">
            Every case study includes the brief, the approach, the outcome —
            and the services that delivered it.
          </p>
          <button
            onClick={() => {
              const el = document.getElementById("journal");
              if (!el) return;
              const top = el.getBoundingClientRect().top + window.scrollY - 72;
              window.scrollTo({ top, behavior: "smooth" });
            }}
            className="btn-ghost-light"
          >
            View full portfolio →
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
