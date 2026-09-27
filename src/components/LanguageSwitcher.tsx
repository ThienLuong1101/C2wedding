import { LANGS } from "@/i18n/translations";
import { useLanguage } from "@/i18n/LanguageContext";

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t.language.label}
      className="fixed top-5 right-5 z-50 flex items-center gap-0.5 rounded-full border border-[var(--rose)]/40 bg-[var(--ivory)]/85 p-1 shadow-[0_4px_18px_rgba(169,107,130,0.18)] backdrop-blur-sm sm:top-6 sm:right-6"
    >
      {LANGS.map((item) => {
        const active = lang === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => setLang(item.id)}
            aria-pressed={active}
            aria-label={item.label}
            className={`label-caps min-w-[2.6rem] rounded-full px-2.5 py-1.5 text-[0.55rem] transition-all duration-300 sm:min-w-[2.85rem] sm:px-3 ${
              active
                ? "bg-[var(--rose-deep)] text-white"
                : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
            }`}
          >
            {item.short}
          </button>
        );
      })}
    </div>
  );
}
