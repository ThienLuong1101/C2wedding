import Reveal from "@/components/Reveal";
import sprig from "@/assets/floral-sprig.webp";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Invitation() {
  const { t } = useLanguage();

  return (
    <section className="section-pad relative mx-auto max-w-2xl text-center">
      <Reveal>
        <img src={sprig} alt="" className="animate-up-down mx-auto mb-6 w-14 opacity-90 sm:w-16" />
      </Reveal>

      <Reveal delay={1}>
        <p className="label-caps text-[0.62rem] text-[var(--rose-deep)] sm:text-xs">{t.invitation.mrMrs}</p>
        <p className="font-serif-display mt-2 text-xl font-medium tracking-[0.12em] text-[var(--ink)] sm:text-2xl">
          ALEX NG &amp; JASLYN TANG
        </p>
      </Reveal>

      <Reveal delay={2}>
        <p className="font-serif-display mx-auto mt-6 max-w-md text-lg italic leading-relaxed text-[var(--ink-soft)] sm:text-xl">
          {t.invitation.inviteSon}
        </p>
      </Reveal>

      <Reveal delay={3}>
        <div className="mx-auto mt-8 flex items-center justify-center gap-4">
          <span className="hairline w-12 sm:w-20" />
          <span className="font-script text-4xl text-[var(--rose)] sm:text-5xl">A &amp; U</span>
          <span className="hairline w-12 sm:w-20" />
        </div>
      </Reveal>

      <Reveal>
        <p className="font-serif-display mx-auto mt-8 max-w-md text-lg italic leading-relaxed text-[var(--ink-soft)] sm:text-xl">
          {t.invitation.daughterOf}
        </p>
        <p className="label-caps mt-3 text-[0.62rem] text-[var(--rose-deep)] sm:text-xs">{t.invitation.mrMrs}</p>
        <p className="font-serif-display mt-2 text-xl font-medium tracking-[0.12em] text-[var(--ink)] sm:text-2xl">
          NGUYỄN THANH LƯƠNG &amp; TRẦN THỊ ÁNH
        </p>
      </Reveal>
    </section>
  );
}
