const items = [
  "Weddings",
  "Corporate",
  "Cultural",
  "Social",
  "Private Dinners",
  "Destination",
  "Production & Rentals",
];

const TrustMarquee = () => {
  const stream = [...items, ...items];
  return (
    <section
      aria-label="Disciplines"
      className="relative bg-paper border-y border-line overflow-hidden"
    >
      <div className="flex items-center gap-16 whitespace-nowrap py-6 md:py-7 animate-marquee will-change-transform">
        {stream.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="inline-flex items-center gap-16 font-display text-[clamp(1.125rem,1.5vw,1.5rem)] text-ink/85"
          >
            <span>{label}</span>
            <span
              aria-hidden
              className="inline-block w-[6px] h-[6px] rounded-full bg-crimson"
            />
          </span>
        ))}
      </div>
    </section>
  );
};

export default TrustMarquee;
