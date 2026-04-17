import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const cldImage = (publicId: string, w: number, h: number) =>
  `https://res.cloudinary.com/wintan1418/image/upload/c_fill,w_${w},h_${h},g_auto,q_auto:best,f_auto/${publicId}`;

const articles = [
  {
    category: "Planning Notes",
    title: "Why the first meeting matters more than the final walkthrough.",
    date: "March 2026",
    readTime: "6 min",
    image: cldImage("gallery/fxo9fxeemjrimlqsnkuv", 900, 600),
  },
  {
    category: "Behind the Scenes",
    title: "Staging Imasayi: 2,000 guests, one ceremonial canopy.",
    date: "February 2026",
    readTime: "8 min",
    image: cldImage("gallery/bamqjbs2skqkh3pa9zxk", 900, 600),
  },
  {
    category: "Weddings",
    title: "On restraint: why the best weddings are also the quietest.",
    date: "January 2026",
    readTime: "5 min",
    image: cldImage("gallery/grandstyle_image_wk4u64", 900, 600),
  },
];

const JournalPreview = () => {
  return (
    <section
      id="journal"
      aria-labelledby="journal-heading"
      className="relative bg-paper section-y"
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
            <p className="eyebrow text-crimson mb-5">The Journal</p>
            <h2
              id="journal-heading"
              className="font-display text-h1 text-ink font-medium leading-[1.08] tracking-tight"
            >
              Notes from{" "}
              <span className="italic font-light text-ash">
                thirteen years of practice.
              </span>
            </h2>
          </motion.div>
          <motion.a
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            href="#journal"
            className="btn-ghost self-start md:self-end"
          >
            Read the journal →
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {articles.map((a, i) => (
            <motion.article
              key={a.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/2] overflow-hidden bg-cloud mb-6">
                <img
                  src={a.image}
                  alt={a.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-800 ease-standard group-hover:scale-[1.04]"
                />
              </div>
              <p className="eyebrow text-crimson mb-4">{a.category}</p>
              <h3 className="font-display text-h3 md:text-2xl text-ink font-medium leading-[1.25] group-hover:text-crimson transition-colors duration-480">
                {a.title}
              </h3>
              <p className="mt-5 text-sm text-ash">
                {a.date} · {a.readTime} read
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JournalPreview;
