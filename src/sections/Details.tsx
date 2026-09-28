import Reveal from "@/components/Reveal";
import Photo from "@/components/Photo";
import floralCorner from "@/assets/floral-corner.webp";
import { useLanguage } from "@/i18n/LanguageContext";
import { photos } from "@/lib/photos";

export default function Details() {
  const { t } = useLanguage();

  const rows = [
    {
      label: t.details.venueLabel,
      value: "Renaissance Kuala Lumpur Hotel",
      sub: "Corner of Jalan Sultan Ismail & Jalan Ampang, Kuala Lumpur",
      link: {
        href: "https://www.google.com/maps/search/?api=1&query=Renaissance+Kuala+Lumpur+Hotel",
        label: t.details.map,
      },
    },
    {
      label: t.details.timeLabel,
      value: t.details.timeValue,
      sub: t.details.timeSub,
    },
    {
      label: t.details.dressLabel,
      value: t.details.dressValue,
      sub: t.details.dressSub,
    },
  ];

  return (
    <section className="section-pad relative overflow-hidden">
      <img
        src={floralCorner}
        alt=""
        className="animate-down-up pointer-events-none absolute -right-24 -top-16 w-72 rotate-180 opacity-50 sm:w-80"
      />

      <div className="relative mx-auto max-w-5xl text-center">
        <Reveal>
          <div className="ornament mb-4">
            <span className="ornament-diamond" />
          </div>
          <p className="label-caps text-[0.62rem] text-[var(--rose-deep)] sm:text-xs">{t.details.eyebrow}</p>
          <h2 className="font-script mt-3 text-5xl text-[var(--ink)] sm:text-6xl">{t.details.title}</h2>
        </Reveal>

        <div className="mt-10 grid items-end gap-4 sm:grid-cols-[0.85fr_1.15fr] sm:gap-6">
          <Photo
            src={photos.handKiss}
            alt={t.photos.handKiss}
            delay={1}
            className="mx-auto w-full max-w-[280px] sm:max-w-none"
            imgClassName="aspect-[2/3] photo-tilt-left"
          />
          <Photo
            src={photos.lanterns}
            alt={t.photos.lanterns}
            delay={2}
            className="mx-auto w-full max-w-lg sm:max-w-none"
            imgClassName="aspect-[5/4]"
          />
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-2 sm:grid-cols-3 sm:gap-6">
          {rows.map((row, i) => (
            <Reveal key={row.label} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <div className="detail-block">
                <p className="label-caps text-[0.55rem] text-[var(--rose-deep)] sm:text-[0.58rem]">{row.label}</p>
                <p className="font-serif-display mt-3 text-xl font-medium leading-snug text-[var(--ink)] sm:text-2xl">
                  {row.value}
                </p>
                <p className="font-serif-display mt-2 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">
                  {row.sub}
                </p>
                {row.link && (
                  <a
                    href={row.link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="label-caps mt-4 inline-block border-b border-[var(--rose)] pb-1 text-[0.58rem] text-[var(--rose-deep)] transition-colors hover:text-[var(--ink)]"
                  >
                    {row.link.label}
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
