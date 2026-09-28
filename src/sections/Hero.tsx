import { useEffect, useMemo, useRef } from "react";
import floralCorner from "@/assets/floral-corner.webp";
import floralCorner2 from "@/assets/floral-corner-2.webp";
import { useLanguage } from "@/i18n/LanguageContext";

type PetalSpec = {
  left: string;
  size: number;
  duration: number;
  delay: number;
  sway: string;
  opacity: number;
};

function makePetals(): PetalSpec[] {
  const specs: PetalSpec[] = [];
  const positions = [6, 16, 27, 39, 51, 63, 74, 85, 93];
  positions.forEach((left, i) => {
    specs.push({
      left: `${left}%`,
      size: 10 + ((i * 7) % 12),
      duration: 11 + ((i * 5) % 9),
      delay: -((i * 3.7) % 14),
      sway: `${(i % 2 === 0 ? 1 : -1) * (3 + ((i * 3) % 5))}vw`,
      opacity: 0.45 + ((i * 11) % 30) / 100,
    });
  });
  return specs;
}

export default function Hero() {
  const { t } = useLanguage();
  const layerBack = useRef<HTMLDivElement>(null);
  const layerMid = useRef<HTMLDivElement>(null);
  const layerFront = useRef<HTMLDivElement>(null);
  const petals = useMemo(makePetals, []);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const y = window.scrollY;
      if (layerBack.current) {
        layerBack.current.style.transform = `translate3d(0, ${y * 0.12}px, 0)`;
      }
      if (layerMid.current) {
        layerMid.current.style.transform = `translate3d(0, ${y * 0.24}px, 0)`;
      }
      if (layerFront.current) {
        layerFront.current.style.transform = `translate3d(0, ${y * 0.42}px, 0)`;
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6">
      <div className="hero-glow pointer-events-none absolute inset-0" />

      <div ref={layerBack} className="pointer-events-none absolute inset-0 will-change-transform">
        <img
          src={floralCorner}
          alt=""
          className="animate-up-down absolute -left-10 -top-10 w-[62vw] max-w-[560px] min-w-[300px] opacity-90 md:-left-16 md:-top-14"
        />
      </div>

      <div ref={layerMid} className="pointer-events-none absolute inset-0 will-change-transform">
        <img
          src={floralCorner2}
          alt=""
          className="animate-down-up absolute -bottom-12 -right-8 w-[64vw] max-w-[600px] min-w-[320px] opacity-90 md:-bottom-20 md:-right-14"
        />
      </div>

      <div ref={layerFront} className="pointer-events-none absolute inset-0 will-change-transform">
        {petals.map((p, i) => (
          <span
            key={i}
            className="petal"
            style={
              {
                left: p.left,
                width: `${p.size}px`,
                height: `${p.size * 1.35}px`,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                "--petal-sway": p.sway,
                "--petal-opacity": p.opacity,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
        <div className="hero-rise ornament mb-6" style={{ animationDelay: "0.1s" }}>
          <span className="ornament-diamond" />
        </div>

        <p
          className="hero-rise label-caps text-[0.68rem] text-[var(--rose-deep)] sm:text-xs"
          style={{ animationDelay: "0.2s" }}
        >
          {t.hero.eyebrow}
        </p>

        <h1 className="mt-6 flex flex-col items-center leading-none sm:mt-7">
          <span
            className="hero-rise font-script text-[18vw] text-[var(--ink)] sm:text-8xl md:text-9xl"
            style={{ animationDelay: "0.45s" }}
          >
            Anders Ng
          </span>
          <span
            className="hero-rise font-script my-0.5 text-[8vw] text-[var(--rose)] sm:my-1 sm:text-5xl md:text-6xl"
            style={{ animationDelay: "0.7s" }}
          >
            &amp;
          </span>
          <span
            className="hero-rise font-script text-[18vw] text-[var(--ink)] sm:text-8xl md:text-9xl"
            style={{ animationDelay: "0.95s" }}
          >
            Uyen Nguyen
          </span>
        </h1>

        <div className="hero-rise mt-8 flex items-center gap-4 sm:mt-9 sm:gap-5" style={{ animationDelay: "1.25s" }}>
          <span className="hairline w-12 sm:w-20" />
          <p className="font-serif-display text-lg tracking-[0.28em] text-[var(--ink)] sm:text-2xl">
            24 . 12 . 2026
          </p>
          <span className="hairline w-12 sm:w-20" />
        </div>

        <p
          className="hero-rise label-caps mt-5 text-[0.62rem] text-[var(--ink-soft)] sm:text-[0.7rem]"
          style={{ animationDelay: "1.45s" }}
        >
          Renaissance Kuala Lumpur Hotel
        </p>
      </div>

      <div
        className="hero-rise absolute bottom-7 z-10 flex flex-col items-center gap-2"
        style={{ animationDelay: "1.8s" }}
      >
        <span className="label-caps text-[0.55rem] text-[var(--ink-soft)]">{t.hero.scroll}</span>
        <span className="relative block h-8 w-px bg-[var(--rose)] opacity-40" />
        <span className="scroll-cue-dot absolute bottom-0 block h-1.5 w-1.5 rounded-full bg-[var(--rose-deep)]" />
      </div>
    </header>
  );
}
