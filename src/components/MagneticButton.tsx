import { useRef, type PointerEvent, type ReactNode } from "react";

type MagneticButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  ariaLabel?: string;
  strength?: number;
};

const MagneticButton = ({
  children,
  onClick,
  href,
  target,
  rel,
  className = "",
  ariaLabel,
  strength = 0.28,
}: MagneticButtonProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const innerRef = useRef<HTMLSpanElement | null>(null);

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const handleMove = (e: PointerEvent) => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    if (innerRef.current) {
      innerRef.current.style.transform = `translate(${x * strength * 0.5}px, ${
        y * strength * 0.5
      }px)`;
    }
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
    if (innerRef.current) {
      innerRef.current.style.transform = "translate(0px, 0px)";
    }
  };

  const sharedProps = {
    className: `inline-block transition-transform duration-480 ease-standard will-change-transform ${className}`,
    onPointerMove: handleMove,
    onPointerLeave: handleLeave,
    "aria-label": ariaLabel,
  };

  const inner = (
    <span
      ref={innerRef}
      className="inline-flex items-center transition-transform duration-480 ease-standard will-change-transform"
    >
      {children}
    </span>
  );

  if (href) {
    return (
      <a
        {...sharedProps}
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      {...sharedProps}
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      onClick={onClick}
    >
      {inner}
    </button>
  );
};

export default MagneticButton;
