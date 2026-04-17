import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const trustItems = [
  "Corporate Affairs · RC 1032417",
  "Leads Award · Agency of the Year 2023",
  "WedVendors Certified",
  "Lagos Chamber of Commerce",
  "EAN Member · Event Planners Assoc.",
  "Oriental Hotel · Preferred Vendor",
  "Eko Hotel · Certified Planner",
  "Landmark Event Centre · Approved",
];

const TrustStrip = () => {
  const stream = [...trustItems, ...trustItems];
  return (
    <section
      aria-label="Trusted by"
      className="relative bg-cloud py-20 md:py-24 overflow-hidden border-y border-line"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease }}
        className="container-edge"
      >
        <div className="flex items-center justify-center gap-4 mb-10">
          <span className="hairline bg-ash w-8" />
          <span className="eyebrow text-ash">Trusted By · Recognised In</span>
          <span className="hairline bg-ash w-8" />
        </div>
      </motion.div>

      <div className="relative overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, #F2F0EB 0%, rgba(242,240,235,0) 100%)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(-90deg, #F2F0EB 0%, rgba(242,240,235,0) 100%)",
          }}
        />
        <ul className="flex gap-14 whitespace-nowrap animate-marquee will-change-transform">
          {stream.map((item, i) => (
            <li
              key={`${item}-${i}`}
              className="font-display text-lg md:text-xl text-ink/70 tracking-tight"
            >
              <span className="inline-block mr-14 align-middle">
                {item}
              </span>
              <span
                aria-hidden
                className="inline-block h-2 w-2 bg-crimson align-middle"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TrustStrip;
