import { motion } from "framer-motion";
import BlurImage from "./BlurImage";

const ease = [0.22, 1, 0.36, 1] as const;

const frames = [
  {
    publicId: "gallery/grandstyle_image_wk4u64",
    caption: "Room setting — ahead of guests",
    meta: "Tablescape · Lagos",
    ratio: "aspect-[3/4]",
    w: 900,
    h: 1200,
  },
  {
    publicId: "gallery/bamqjbs2skqkh3pa9zxk",
    caption: "Stage build — final checks",
    meta: "Production · Ondo",
    ratio: "aspect-[4/3]",
    w: 1200,
    h: 900,
  },
  {
    publicId: "gallery/deejigubdsv22dfpiwvl",
    caption: "Service — plating the first course",
    meta: "Gastronomy · On location",
    ratio: "aspect-[4/3]",
    w: 1200,
    h: 900,
  },
  {
    publicId: "gallery/jkncqcyke3nr5p0o7jmb",
    caption: "The team — moments before doors",
    meta: "Studio · Behind the scenes",
    ratio: "aspect-[3/4]",
    w: 900,
    h: 1200,
  },
];

const Interstitial = () => {
  return (
    <section
      id="frames"
      aria-label="A few recent frames"
      className="relative bg-paper section-y"
    >
      <div className="container-edge">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16"
        >
          <div className="flex items-baseline gap-6">
            <span className="font-display italic text-[clamp(1.1rem,1.6vw,1.4rem)] text-crimson">
              —
            </span>
            <h2 className="font-display text-ink font-normal text-[clamp(1.75rem,4.5vw,3rem)] leading-[0.95] tracking-[-0.01em]">
              A few recent{" "}
              <span className="italic text-crimson">frames.</span>
            </h2>
          </div>
          <p className="mono-kicker text-ash max-w-[32ch] md:text-right">
            Studio interstitial · Unbound by discipline
          </p>
        </motion.div>

        {/* 4-frame editorial grid */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* Frame 1 — portrait, span 5 */}
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
            className="col-span-12 sm:col-span-6 lg:col-span-5"
          >
            <BlurImage
              publicId={frames[0].publicId}
              w={frames[0].w}
              h={frames[0].h}
              alt={frames[0].caption}
              className={`${frames[0].ratio} w-full`}
            />
            <figcaption className="mt-3 flex items-baseline justify-between gap-4 pt-3 border-t border-line">
              <span className="font-display text-base md:text-lg text-ink">
                {frames[0].caption}
              </span>
              <span className="mono-kicker text-ash">{frames[0].meta}</span>
            </figcaption>
          </motion.figure>

          {/* Right column stack */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-7 flex flex-col gap-4 md:gap-6">
            <motion.figure
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
            >
              <BlurImage
                publicId={frames[1].publicId}
                w={frames[1].w}
                h={frames[1].h}
                alt={frames[1].caption}
                className={`${frames[1].ratio} w-full`}
              />
              <figcaption className="mt-3 flex items-baseline justify-between gap-4 pt-3 border-t border-line">
                <span className="font-display text-base md:text-lg text-ink">
                  {frames[1].caption}
                </span>
                <span className="mono-kicker text-ash">{frames[1].meta}</span>
              </figcaption>
            </motion.figure>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <motion.figure
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: 0.15, ease }}
              >
                <BlurImage
                  publicId={frames[2].publicId}
                  w={frames[2].w}
                  h={frames[2].h}
                  alt={frames[2].caption}
                  className="aspect-[4/5] w-full"
                />
                <figcaption className="mt-3 flex items-baseline justify-between gap-3 pt-3 border-t border-line">
                  <span className="font-display text-sm md:text-base text-ink">
                    {frames[2].caption}
                  </span>
                  <span className="mono-kicker text-ash hidden md:inline">
                    {frames[2].meta}
                  </span>
                </figcaption>
              </motion.figure>

              <motion.figure
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: 0.22, ease }}
              >
                <BlurImage
                  publicId={frames[3].publicId}
                  w={frames[3].w}
                  h={frames[3].h}
                  alt={frames[3].caption}
                  className="aspect-[4/5] w-full"
                />
                <figcaption className="mt-3 flex items-baseline justify-between gap-3 pt-3 border-t border-line">
                  <span className="font-display text-sm md:text-base text-ink">
                    {frames[3].caption}
                  </span>
                  <span className="mono-kicker text-ash hidden md:inline">
                    {frames[3].meta}
                  </span>
                </figcaption>
              </motion.figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Interstitial;
