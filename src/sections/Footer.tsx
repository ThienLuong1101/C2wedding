import Reveal from "@/components/Reveal";
import Photo from "@/components/Photo";
import sprig from "@/assets/floral-sprig.webp";
import { useLanguage } from "@/i18n/LanguageContext";
import { photos } from "@/lib/photos";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="section-pad relative mx-auto max-w-3xl pb-20 text-center">
      <div className="relative mx-auto max-w-md">
        <Photo
          src={photos.courtyard}
          alt={t.photos.courtyard}
          className="mx-auto w-full"
          imgClassName="aspect-[3/4] sm:aspect-[2/3]"
        />
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
        <p className="mx-auto mt-5 max-w-sm font-serif-display text-xs leading-relaxed text-[var(--ink-soft)]/80">
          <a
            href="https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100459"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-[var(--rose)]/40 underline-offset-2 transition-colors hover:text-[var(--rose-deep)]"
          >
            {t.music.credit}
          </a>
        </p>
      </Reveal>
    </footer>
  );
}
