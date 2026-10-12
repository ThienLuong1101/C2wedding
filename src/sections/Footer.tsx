import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import sprig from "@/assets/floral-sprig.webp";
import { useLanguage } from "@/i18n/LanguageContext";
import { photoReel, reelBackdrops } from "@/lib/photos";

type FooterProps = {
  onBackdrop?: (color: string | null) => void;
};

const REEL_LOOPS = 2;
const CARD_COUNT = photoReel.length;

function cardAt(index: number) {
  return photoReel[((index % CARD_COUNT) + CARD_COUNT) % CARD_COUNT];
}

export default function Footer({ onBackdrop }: FooterProps) {
  const { t } = useLanguage();
  const reelRef = useRef<HTMLDivElement>(null);
  const onBackdropRef = useRef(onBackdrop);
  onBackdropRef.current = onBackdrop;
  const [reduced, setReduced] = useState(false);
  const [place, setPlace] = useState({ index: 0, lift: 0 });

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduced) {
      onBackdropRef.current?.(null);
      return;
    }

    let raf = 0;
    const read = () => {
      const el = reelRef.current;
      const idle = { index: 0, lift: 0, color: null as string | null };
      if (!el) return idle;
      const scrollable = el.offsetHeight - window.innerHeight;
      const passed = -el.getBoundingClientRect().top;
      const steps = CARD_COUNT * REEL_LOOPS;
      if (scrollable <= 0 || passed < 0) return idle;
      if (passed > scrollable) {
        const last = (steps - 1) % CARD_COUNT;
        return { index: last, lift: 1, color: reelBackdrops[last % reelBackdrops.length] };
      }
      const progress = Math.min(0.9999, passed / scrollable);
      const scaled = progress * steps;
      const index = Math.floor(scaled) % CARD_COUNT;
      const lift = scaled - Math.floor(scaled);
      const shown = lift > 0.55 ? (index + 1) % CARD_COUNT : index;
      return { index, lift, color: reelBackdrops[shown % reelBackdrops.length] };
    };

    const onScroll = () => {
      const next = read();
      onBackdropRef.current?.(next.color);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setPlace((prev) =>
          prev.index === next.index && Math.abs(prev.lift - next.lift) < 0.004
            ? prev
            : { index: next.index, lift: next.lift },
        );
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      onBackdropRef.current?.(null);
    };
  }, [reduced]);

  useEffect(() => {
    const img = new Image();
    img.src = cardAt(place.index + 1).src;
  }, [place.index]);

  const rise = reduced ? 0 : 1 - Math.pow(1 - place.lift, 3);
  const topCard = cardAt(place.index);
  const incoming = cardAt(place.index + 1);
  const beneath = [cardAt(place.index - 1), cardAt(place.index - 2)];

  return (
    <footer className="relative text-center">
      <div
        ref={reelRef}
        className="card-reel"
        style={reduced ? undefined : { height: `${CARD_COUNT * REEL_LOOPS * 16}vh` }}
      >
        <div className="card-reel-sticky section-pad pb-16">
          <div className="pile">
            <div className="pile-card" style={{ transform: "rotate(3.2deg) translate(10px, 8px)", zIndex: 0 }}>
              <img src={beneath[1].src} alt="" className="photo-frame" decoding="async" />
            </div>
            <div className="pile-card" style={{ transform: "rotate(-2.4deg) translate(-8px, 5px)", zIndex: 1 }}>
              <img src={beneath[0].src} alt="" className="photo-frame" decoding="async" />
            </div>
            <div
              className="pile-card"
              style={{
                zIndex: 2,
                transform: `rotate(${-rise * 2.4}deg) translate(${-rise * 8}px, ${rise * 5}px)`,
              }}
            >
              <img src={topCard.src} alt={t.gallery.photoAlt} className="photo-frame" decoding="async" />
            </div>
            {reduced ? null : (
              <div
                className="pile-card"
                style={{
                  zIndex: 3,
                  transform: `translateY(${(1 - rise) * 34}px) rotate(${(1 - rise) * 2.2}deg)`,
                }}
              >
                <img src={incoming.src} alt="" className="photo-frame" decoding="async" />
              </div>
            )}
          </div>

          <Reveal>
            <div className="ornament mt-8 mb-3">
              <span className="ornament-diamond" />
            </div>
            <img src={sprig} alt="" className="animate-down-up mx-auto w-12 -scale-x-100 opacity-80" />
            <p className="font-script mt-4 text-5xl text-[var(--ink)] sm:text-6xl">Anders &amp; Uyen</p>
            <p className="font-serif-display mt-3 text-base tracking-[0.28em] text-[var(--ink-soft)]">
              24 . 12 . 2026 · KUALA LUMPUR
            </p>
            <p className="label-caps mt-6 text-[0.55rem] text-[var(--rose-deep)]">#AndersAndUyen</p>
            {t.music.credit ? (
              <p className="mx-auto mt-5 max-w-sm font-serif-display text-xs leading-relaxed text-[var(--ink-soft)]/80">
                <a
                  href="https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100063"
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-[var(--rose)]/40 underline-offset-2 transition-colors hover:text-[var(--rose-deep)]"
                >
                  {t.music.credit}
                </a>
              </p>
            ) : null}
          </Reveal>
        </div>
      </div>
    </footer>
  );
}
