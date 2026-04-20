import { useEffect, useState } from "react";

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const compute = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(1, scrollTop / docHeight) : 0);
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent pointer-events-none"
    >
      <div
        className="h-full bg-crimson origin-left transition-transform duration-100 ease-linear"
        style={{ transform: `scaleX(${progress})`, width: "100%" }}
      />
    </div>
  );
};

export default ReadingProgress;
