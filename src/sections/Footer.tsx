import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import sprig from "@/assets/floral-sprig.webp";
import { useLanguage } from "@/i18n/LanguageContext";
import { photoReel, reelBackdrops } from "@/lib/photos";

type FooterProps = {
  onBackdrop?: (color: string | null) => void;
};

const CARD_COUNT = photoReel.length;
const THROW_MS = 200;

function wrap(index: number) {
  return ((index % CARD_COUNT) + CARD_COUNT) % CARD_COUNT;
}

function cardAt(index: number) {
  return photoReel[wrap(index)];
}

export default function Footer({ onBackdrop }: FooterProps) {
  const { t } = useLanguage();
  const pileRef = useRef<HTMLDivElement>(null);
  const onBackdropRef = useRef(onBackdrop);
  onBackdropRef.current = onBackdrop;
  const indexRef = useRef(0);
  const offsetRef = useRef(0);
  const busy = useRef(false);
  const stopDrag = useRef<(() => void) | null>(null);
  const [reduced, setReduced] = useState(false);
  const [index, setIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const [phase, setPhase] = useState<"idle" | "drag" | "settle" | "throw">("idle");
  const [seenSwipe, setSeenSwipe] = useState(false);
  indexRef.current = index;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    onBackdropRef.current?.(reelBackdrops[index % reelBackdrops.length]);
  }, [index]);

  useEffect(() => () => onBackdropRef.current?.(null), []);

  useEffect(() => {
    const next = new Image();
    const prev = new Image();
    next.src = cardAt(index + 1).src;
    prev.src = cardAt(index + 2).src;
  }, [index]);

  useEffect(() => () => stopDrag.current?.(), []);

  const finishThrow = (dir: -1 | 1) => {
    if (busy.current) return;
    const next = wrap(indexRef.current + 1);
    if (reduced) {
      setSeenSwipe(true);
      setIndex(next);
      offsetRef.current = 0;
      setOffset(0);
      setPhase("idle");
      return;
    }
    busy.current = true;
    setSeenSwipe(true);
    const fly = dir * (window.innerWidth + 80);
    offsetRef.current = fly;
    setPhase("throw");
    setOffset(fly);
    window.setTimeout(() => {
      setIndex(next);
      offsetRef.current = 0;
      setOffset(0);
      setPhase("idle");
      busy.current = false;
    }, THROW_MS);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || busy.current) return;
    stopDrag.current?.();
    const startX = event.clientX;
    const startY = event.clientY;
    let axis: "" | "x" | "y" = "";
    let latest = 0;
    let lastX = startX;
    let lastT = performance.now();
    let velocity = 0;

    const cleanup = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      if (stopDrag.current === cleanup) stopDrag.current = null;
    };

    const move = (moveEvent: PointerEvent) => {
      if (moveEvent.pointerId !== event.pointerId) return;
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      const now = performance.now();
      const dt = now - lastT;
      if (dt > 0) velocity = (moveEvent.clientX - lastX) / dt;
      lastX = moveEvent.clientX;
      lastT = now;
      if (!axis) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 14) {
          axis = "y";
          cleanup();
          return;
        }
        if (Math.abs(dx) < 8) return;
        axis = "x";
        setPhase("drag");
      }
      if (axis !== "x") return;
      latest = dx;
      offsetRef.current = dx;
      setOffset(dx);
    };

    const up = (upEvent: PointerEvent) => {
      if (upEvent.pointerId !== event.pointerId) return;
      cleanup();
      if (axis !== "x" || busy.current) return;
      const width = pileRef.current?.offsetWidth ?? 280;
      const threshold = Math.min(64, width * 0.2);
      const flung = Math.abs(velocity) > 0.55 && Math.abs(latest) > 18;
      if (Math.abs(latest) < threshold && !flung) {
        setPhase("settle");
        offsetRef.current = 0;
        setOffset(0);
        return;
      }
      const dir = latest < 0 || (latest === 0 && velocity < 0) ? -1 : 1;
      finishThrow(dir);
    };

    stopDrag.current = cleanup;
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      finishThrow(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      finishThrow(1);
    }
  };

  const revealed = cardAt(index + 1);
  const beneath = [cardAt(index + 2), cardAt(index + 3)];
  const top = cardAt(index);
  const tilt =
    phase === "throw" ? Math.sign(offset || 1) * 14 : Math.max(-18, Math.min(18, offset / 12));
  const hinting = phase === "idle" && !seenSwipe && !reduced;

  return (
    <footer className="relative overflow-x-clip px-5 pb-16 pt-14 text-center sm:px-8">
      <div
        ref={pileRef}
        className={`pile${phase === "drag" ? " is-dragging" : ""}`}
        tabIndex={0}
        role="group"
        aria-label={`${t.gallery.photoAlt}. ${t.gallery.swipe}`}
        onPointerDown={onPointerDown}
        onKeyDown={onKeyDown}
      >
        <div className="pile-card" style={{ transform: "rotate(3.2deg) translate(10px, 8px)", zIndex: 0 }}>
          <img src={beneath[1].src} alt="" className="photo-frame" decoding="async" draggable={false} />
        </div>
        <div className="pile-card" style={{ transform: "rotate(-2.4deg) translate(-8px, 5px)", zIndex: 1 }}>
          <img src={beneath[0].src} alt="" className="photo-frame" decoding="async" draggable={false} />
        </div>
        <div className="pile-card" style={{ zIndex: 2 }}>
          <img src={revealed.src} alt="" className="photo-frame" decoding="async" draggable={false} />
        </div>
        <div
          className={`pile-card pile-card-top${hinting ? " is-hinting" : ""}`}
          style={{
            zIndex: 3,
            transition:
              phase === "throw"
                ? "transform 200ms cubic-bezier(0.2, 0.7, 0.2, 1)"
                : phase === "settle"
                  ? "transform 240ms cubic-bezier(0.2, 0.8, 0.2, 1)"
                  : "none",
            transform: hinting ? undefined : `translate3d(${offset}px, 0, 0) rotate(${tilt}deg)`,
          }}
        >
          <img src={top.src} alt={t.gallery.photoAlt} className="photo-frame" decoding="async" draggable={false} />
        </div>
      </div>

      <p className="swipe-hint font-serif-display">
        <span className="swipe-hint-arrow swipe-hint-arrow-left" aria-hidden="true">
          ←
        </span>
        {t.gallery.swipe}
        <span className="swipe-hint-arrow swipe-hint-arrow-right" aria-hidden="true">
          →
        </span>
      </p>

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
    </footer>
  );
}
