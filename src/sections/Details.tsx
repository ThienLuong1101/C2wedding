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
    <section className="relative overflow-hidden px-6 py-24 sm:py-32">
      <img
        src={floralCorner}
        alt=""
        className="animate-down-up pointer-events-none absolute -right-24 -top-24 w-80 rotate-180 opacity-60 sm:w-96"
      />

      <div className="relative mx-auto max-w-2xl text-center">
        <Reveal>
          <p className="label-caps text-[0.62rem] text-[var(--rose-deep)] sm:text-xs">{t.details.eyebrow}</p>
          <h2 className="font-script mt-4 text-5xl text-[var(--ink)] sm:text-6xl">{t.details.title}</h2>
        </Reveal>

        <div className="mt-12 grid items-end gap-5 sm:grid-cols-[0.9fr_1.1fr] sm:gap-6">
          <Photo
            src={photos.handKiss}
            alt={t.photos.handKiss}
            delay={1}
            className="mx-auto w-full max-w-[260px] sm:max-w-none sm:translate-y-4"
            imgClassName="aspect-[2/3]"
          />
          <Photo
            src={photos.lanterns}
            alt={t.photos.lanterns}
            delay={2}
            className="mx-auto w-full max-w-md sm:max-w-none"
            imgClassName="aspect-[4/3]"
          />
        </div>

        <div className="mt-16">
          {rows.map((row, i) => (
            <Reveal key={row.label} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <div>
                {i > 0 && <div className="hairline mx-auto mb-14 mt-14 w-40" />}
                <p className="font-serif-display text-base italic text-[var(--ink-soft)] sm:text-lg">
                  {row.label}
                </p>
                <p className="font-serif-display mt-4 text-2xl font-medium leading-snug text-[var(--ink)] sm:text-3xl">
                  {row.value}
                </p>
                <p className="font-serif-display mt-2 text-base text-[var(--ink-soft)] sm:text-lg">{row.sub}</p>
                {row.link && (
                  <a
                    href={row.link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="label-caps mt-5 inline-block border-b border-[var(--rose)] pb-1 text-[0.62rem] text-[var(--rose-deep)] transition-colors hover:text-[var(--ink)]"
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
