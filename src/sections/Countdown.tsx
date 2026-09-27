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
    <section className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
      <Reveal>
        <p className="label-caps text-[0.62rem] text-[var(--rose-deep)] sm:text-xs">
          {passed ? t.countdown.eyebrowPassed : t.countdown.eyebrow}
        </p>
        <h2 className="font-script mt-4 text-5xl text-[var(--ink)] sm:text-6xl">
          {passed ? t.countdown.titlePassed : t.countdown.title}
        </h2>
      </Reveal>

      <Photo
        src={photos.flowerField}
        alt={t.photos.flowerField}
        delay={1}
        className="mx-auto mt-12 w-full max-w-2xl"
        imgClassName="aspect-[3/2]"
      />

      <Reveal delay={1}>
        <div className="mt-12 grid grid-cols-2 gap-y-10 sm:grid-cols-4">
          {units.map((u) => (
            <div key={u.label} className="flex flex-col items-center">
              <span className="font-serif-display text-6xl font-light tabular-nums text-[var(--ink)] sm:text-7xl">
                {String(u.value).padStart(2, "0")}
              </span>
              <span className="label-caps mt-3 text-[0.55rem] text-[var(--ink-soft)] sm:text-[0.62rem]">
                {u.label}
              </span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={2}>
        <p className="font-serif-display mt-12 text-lg italic text-[var(--ink-soft)]">{t.countdown.until}</p>
      </Reveal>

      <Photo
        src={photos.sunflowers}
        alt={t.photos.sunflowers}
        delay={3}
        className="mx-auto mt-14 w-[88%] max-w-xl sm:ml-auto sm:mr-6 sm:w-[78%]"
        imgClassName="aspect-[3/2]"
      />
    </section>
  );
}
