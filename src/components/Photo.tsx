import Reveal from "@/components/Reveal";

type PhotoProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  delay?: 0 | 1 | 2 | 3;
};

export default function Photo({
  src,
  alt,
  className = "",
  imgClassName = "",
  delay = 0,
}: PhotoProps) {
  return (
    <Reveal delay={delay} className={className}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`photo-frame ${imgClassName}`.trim()}
      />
    </Reveal>
  );
}
