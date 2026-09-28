import Reveal from "@/components/Reveal";
import Photo from "@/components/Photo";
import { useCountdown } from "@/hooks/useCountdown";
import { useLanguage } from "@/i18n/LanguageContext";
import { photos } from "@/lib/photos";

export default function Countdown() {
  const { t } = useLanguage();
  const { days, hours, minutes, seconds, passed } = useCountdown();

  const units = [
    { value: days, label: t.countdown.days },
    { value: hours, label: t.countdown.hours },
    { value: minutes, label: t.countdown.minutes },
    { value: seconds, label: t.countdown.seconds },
  ];

  return (
    <section className="section-pad relative mx-auto max-w-5xl text-center">
      <Reveal>
        <div className="ornament mb-4">
          <span className="ornament-diamond" />
        </div>
        <p className="label-caps text-[0.62rem] text-[var(--rose-deep)] sm:text-xs">
          {passed ? t.countdown.eyebrowPassed : t.countdown.eyebrow}
        </p>
        <h2 className="font-script mt-3 text-5xl text-[var(--ink)] sm:text-6xl">
          {passed ? t.countdown.titlePassed : t.countdown.title}
        </h2>
      </Reveal>

      <div className="mt-10 grid items-center gap-6 md:grid-cols-[1.15fr_0.85fr] md:gap-8">
        <Photo
          src={photos.countdownLead}
          alt={t.gallery.photoAlt}
          delay={1}
          className="w-full"
          imgClassName="aspect-[4/3] sm:aspect-[3/2]"
        />
        <Photo
          src={photos.sunflowers}
          alt={t.photos.sunflowers}
          delay={2}
          className="mx-auto w-[88%] md:w-full md:translate-y-4"
          imgClassName="aspect-[3/2] photo-tilt-right"
        />
      </div>

      <Reveal delay={1}>
        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-x-2 gap-y-2 sm:grid-cols-4 sm:gap-0">
          {units.map((u) => (
            <div key={u.label} className="countdown-unit flex flex-col items-center">
              <span className="font-serif-display text-5xl font-light tabular-nums text-[var(--ink)] sm:text-6xl md:text-7xl">
                {String(u.value).padStart(2, "0")}
              </span>
              <span className="label-caps mt-2 text-[0.55rem] text-[var(--ink-soft)] sm:text-[0.62rem]">
                {u.label}
              </span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={2}>
        <p className="font-serif-display mt-8 text-lg italic text-[var(--ink-soft)]">{t.countdown.until}</p>
      </Reveal>
    </section>
  );
}
