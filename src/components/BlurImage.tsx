import { useState } from "react";

type BlurImageProps = {
  publicId: string;
  w: number;
  h: number;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
};

const BASE = "https://res.cloudinary.com/wintan1418/image/upload";

const buildSrc = (publicId: string, w: number, h: number) =>
  `${BASE}/c_fill,w_${w},h_${h},g_auto,q_auto:best,f_auto/${publicId}`;

const buildLqip = (publicId: string, w: number, h: number) =>
  `${BASE}/c_fill,w_30,h_${Math.round((h / w) * 30)},g_auto,q_30,e_blur:400,f_auto/${publicId}`;

const BlurImage = ({
  publicId,
  w,
  h,
  alt,
  className = "",
  imgClassName = "",
  priority = false,
}: BlurImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const src = buildSrc(publicId, w, h);
  const srcSet = `${buildSrc(publicId, w, h)} 1x, ${buildSrc(publicId, w * 2, h * 2)} 2x`;
  const lqip = buildLqip(publicId, w, h);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundImage: `url("${lqip}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <img
        src={src}
        srcSet={srcSet}
        alt={alt}
        width={w}
        height={h}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-800 ease-standard ${
          loaded ? "opacity-100" : "opacity-0"
        } ${imgClassName}`}
      />
    </div>
  );
};

export default BlurImage;
