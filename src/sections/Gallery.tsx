import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { gallery } from "@/lib/photos";

export default function Gallery() {
  const { t } = useLanguage();
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i == null ? i : (i + 1) % gallery.length));
      if (e.key === "ArrowLeft") {
        setActive((i) => (i == null ? i : (i - 1 + gallery.length) % gallery.length));
      }
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section className="section-pad relative mx-auto max-w-6xl text-center">
      <Reveal>
        <div className="ornament mb-4">
          <span className="ornament-diamond" />
        </div>
        <p className="label-caps text-[0.62rem] text-[var(--rose-deep)] sm:text-xs">{t.gallery.eyebrow}</p>
        <h2 className="font-script mt-3 text-5xl text-[var(--ink)] sm:text-6xl">{t.gallery.title}</h2>
        <p className="font-serif-display mx-auto mt-4 max-w-xl text-base italic text-[var(--ink-soft)] sm:text-lg">
          {t.gallery.subtitle}
        </p>
      </Reveal>

      <div className="gallery-mosaic mt-10">
        {gallery.map((item, i) => (
          <Reveal
            key={item.src}
            delay={(i % 4) as 0 | 1 | 2 | 3}
            className={`gallery-cell gallery-${item.orient}`}
          >
            <button
              type="button"
              className="gallery-trigger group"
              onClick={() => setActive(i)}
              aria-label={`${t.gallery.open} ${i + 1}`}
            >
              <img
                src={item.src}
                alt={`${t.gallery.photoAlt} ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="gallery-img"
              />
            </button>
          </Reveal>
        ))}
      </div>

      {active != null && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={t.gallery.title}
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="gallery-lightbox-close label-caps"
            aria-label={t.gallery.close}
            onClick={() => setActive(null)}
          >
            {t.gallery.close}
          </button>
          <button
            type="button"
            className="gallery-lightbox-nav gallery-lightbox-prev"
            aria-label={t.gallery.prev}
            onClick={(e) => {
              e.stopPropagation();
              setActive((i) => (i == null ? i : (i - 1 + gallery.length) % gallery.length));
            }}
          >
            ‹
          </button>
          <img
            src={gallery[active].src}
            alt={`${t.gallery.photoAlt} ${active + 1}`}
            className="gallery-lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            className="gallery-lightbox-nav gallery-lightbox-next"
            aria-label={t.gallery.next}
            onClick={(e) => {
              e.stopPropagation();
              setActive((i) => (i == null ? i : (i + 1) % gallery.length));
            }}
          >
            ›
          </button>
          <p className="gallery-lightbox-count label-caps">
            {active + 1} / {gallery.length}
          </p>
        </div>
      )}
    </section>
  );
}
