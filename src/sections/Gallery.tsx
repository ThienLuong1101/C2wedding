import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { gallery, type GalleryItem } from "@/lib/photos";

type Viewer = { items: GalleryItem[]; index: number };

export default function Gallery() {
  const { t } = useLanguage();
  const [viewer, setViewer] = useState<Viewer | null>(null);

  useEffect(() => {
    if (viewer == null) return;
    const count = viewer.items.length;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setViewer(null);
      if (e.key === "ArrowRight") {
        setViewer((current) =>
          current == null ? current : { ...current, index: (current.index + 1) % count },
        );
      }
      if (e.key === "ArrowLeft") {
        setViewer((current) =>
          current == null
            ? current
            : { ...current, index: (current.index - 1 + count) % count },
        );
      }
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [viewer]);

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

      <div className="gallery-frame mt-10">
        <div className="gallery-mosaic">
          {gallery.map((item, i) => (
            <div key={item.src} className={`gallery-cell gallery-${item.orient}`}>
              <button
                type="button"
                className="gallery-trigger group"
                onClick={() => setViewer({ items: gallery, index: i })}
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
            </div>
          ))}
        </div>
      </div>

      {viewer != null && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={t.gallery.title}
          onClick={() => setViewer(null)}
        >
          <button
            type="button"
            className="gallery-lightbox-close label-caps"
            aria-label={t.gallery.close}
            onClick={() => setViewer(null)}
          >
            {t.gallery.close}
          </button>
          <button
            type="button"
            className="gallery-lightbox-nav gallery-lightbox-prev"
            aria-label={t.gallery.prev}
            onClick={(e) => {
              e.stopPropagation();
              setViewer((current) =>
                current == null
                  ? current
                  : {
                      ...current,
                      index: (current.index - 1 + current.items.length) % current.items.length,
                    },
              );
            }}
          >
            ‹
          </button>
          <img
            src={viewer.items[viewer.index].src}
            alt={`${t.gallery.photoAlt} ${viewer.index + 1}`}
            className="gallery-lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            className="gallery-lightbox-nav gallery-lightbox-next"
            aria-label={t.gallery.next}
            onClick={(e) => {
              e.stopPropagation();
              setViewer((current) =>
                current == null
                  ? current
                  : { ...current, index: (current.index + 1) % current.items.length },
              );
            }}
          >
            ›
          </button>
          <p className="gallery-lightbox-count label-caps">
            {viewer.index + 1} / {viewer.items.length}
          </p>
        </div>
      )}
    </section>
  );
}
