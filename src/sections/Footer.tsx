import Reveal from "@/components/Reveal";
import Photo from "@/components/Photo";
import sprig from "@/assets/floral-sprig.webp";
import { useLanguage } from "@/i18n/LanguageContext";
import { photos } from "@/lib/photos";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative px-6 pb-16 pt-20 text-center">
      <Photo
        src={photos.courtyard}
        alt={t.photos.courtyard}
        className="mx-auto mb-10 w-full max-w-[260px] sm:max-w-[300px]"
        imgClassName="aspect-[2/3]"
      />

      <Reveal>
        <img src={sprig} alt="" className="animate-down-up mx-auto w-14 -scale-x-100 opacity-80" />
        <p className="font-script mt-6 text-5xl text-[var(--ink)] sm:text-6xl">Anders &amp; Uyen</p>
        <p className="font-serif-display mt-4 text-base tracking-[0.28em] text-[var(--ink-soft)]">
          24 . 12 . 2026 · KUALA LUMPUR
        </p>
        <p className="label-caps mt-8 text-[0.55rem] text-[var(--rose-deep)]">#AndersAndUyen</p>
      </Reveal>
    </footer>
  );
}
