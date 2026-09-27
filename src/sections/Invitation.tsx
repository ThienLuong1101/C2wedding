import Reveal from "@/components/Reveal";
import Photo from "@/components/Photo";
import sprig from "@/assets/floral-sprig.webp";
import { useLanguage } from "@/i18n/LanguageContext";
import { photos } from "@/lib/photos";

export default function Invitation() {
  const { t } = useLanguage();

  return (
    <section className="relative mx-auto max-w-2xl px-6 py-24 text-center sm:py-32">
      <Reveal>
        <img src={sprig} alt="" className="animate-up-down mx-auto mb-10 w-16 opacity-90 sm:w-20" />
      </Reveal>

      <Reveal delay={1}>
        <p className="label-caps text-[0.62rem] text-[var(--rose-deep)] sm:text-xs">{t.invitation.mrMrs}</p>
        <p className="font-serif-display mt-3 text-xl font-medium tracking-[0.12em] text-[var(--ink)] sm:text-2xl">
          ALEX NG &amp; JASLYN TANG
        </p>
      </Reveal>

      <Reveal delay={2}>
        <p className="font-serif-display mx-auto mt-10 max-w-md text-lg italic leading-relaxed text-[var(--ink-soft)] sm:text-xl">
          {t.invitation.inviteSon}
        </p>
      </Reveal>

      <Reveal delay={3}>
        <div className="mx-auto mt-12 flex items-center justify-center gap-5">
          <span className="hairline w-16 sm:w-28" />
          <span className="font-script text-4xl text-[var(--rose)] sm:text-5xl">A &amp; U</span>
          <span className="hairline w-16 sm:w-28" />
        </div>
      </Reveal>

      <Photo
        src={photos.pavilion}
        alt={t.photos.pavilion}
        delay={1}
        className="mx-auto mt-14 w-full max-w-[280px] sm:max-w-[320px]"
        imgClassName="aspect-[2/3]"
      />

      <Reveal>
        <p className="font-serif-display mx-auto mt-14 max-w-md text-lg italic leading-relaxed text-[var(--ink-soft)] sm:text-xl">
          {t.invitation.daughterOf}
        </p>
        <p className="label-caps mt-3 text-[0.62rem] text-[var(--rose-deep)] sm:text-xs">{t.invitation.mrMrs}</p>
        <p className="font-serif-display mt-3 text-xl font-medium tracking-[0.12em] text-[var(--ink)] sm:text-2xl">
          NGUYỄN THANH LƯƠNG &amp; TRẦN THỊ ÁNH
        </p>
      </Reveal>
    </section>
  );
}
