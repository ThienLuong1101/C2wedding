import { useState, type FormEvent } from "react";
import Reveal from "@/components/Reveal";
import Photo from "@/components/Photo";
import { trpc } from "@/providers/trpc";
import floralCorner2 from "@/assets/floral-corner-2.webp";
import { useLanguage } from "@/i18n/LanguageContext";
import { photos } from "@/lib/photos";

export default function Rsvp() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [attending, setAttending] = useState<"yes" | "no" | null>(null);
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);

  const submit = trpc.rsvp.submit.useMutation({
    onSuccess: () => setDone(true),
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!attending) return;
    submit.mutate({
      name: name.trim(),
      contact: contact.trim() || undefined,
      attending,
      guests,
      message: message.trim() || undefined,
    });
  };

  return (
    <section className="section-pad relative overflow-hidden">
      <img
        src={floralCorner2}
        alt=""
        className="animate-up-down pointer-events-none absolute -left-24 -top-16 w-72 rotate-180 opacity-50 sm:w-80"
      />

      <div className="relative mx-auto max-w-5xl text-center">
        <Reveal>
          <div className="ornament mb-4">
            <span className="ornament-diamond" />
          </div>
          <p className="label-caps text-[0.62rem] text-[var(--rose-deep)] sm:text-xs">{t.rsvp.eyebrow}</p>
          <h2 className="font-script mt-3 text-5xl text-[var(--ink)] sm:text-6xl">{t.rsvp.title}</h2>
        </Reveal>

        <div className="mt-10 grid items-start gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-10 md:text-left">
          <Photo
            src={photos.selfie}
            alt={t.photos.selfie}
            delay={1}
            className="mx-auto w-full max-w-[240px] md:max-w-none"
            imgClassName="aspect-[3/4] photo-tilt-left"
          />

          <div>
            {done ? (
              <Reveal className="is-visible">
                <div className="py-8 text-center md:text-left">
                  <p className="font-script text-5xl text-[var(--rose-deep)]">{t.rsvp.thankYou}</p>
                  <p className="font-serif-display mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
                    {t.rsvp.thankYouBody}
                  </p>
                </div>
              </Reveal>
            ) : (
              <Reveal delay={1}>
                <form onSubmit={handleSubmit} className="space-y-7 text-left">
                  <div>
                    <label htmlFor="rsvp-name" className="label-caps text-[0.58rem] text-[var(--ink-soft)]">
                      {t.rsvp.name}
                    </label>
                    <input
                      id="rsvp-name"
                      className="field-input mt-1"
                      placeholder={t.rsvp.namePlaceholder}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      maxLength={255}
                    />
                  </div>

                  <div>
                    <label htmlFor="rsvp-contact" className="label-caps text-[0.58rem] text-[var(--ink-soft)]">
                      {t.rsvp.contact}
                    </label>
                    <input
                      id="rsvp-contact"
                      className="field-input mt-1"
                      placeholder={t.rsvp.contactPlaceholder}
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      maxLength={320}
                    />
                  </div>

                  <div className="text-center md:text-left">
                    <p className="label-caps text-[0.58rem] text-[var(--ink-soft)]">{t.rsvp.attend}</p>
                    <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-3">
                      <button
                        type="button"
                        data-active={attending === "yes"}
                        onClick={() => setAttending("yes")}
                        className="choice-chip label-caps rounded-full px-7 py-3 text-[0.62rem]"
                      >
                        {t.rsvp.accept}
                      </button>
                      <button
                        type="button"
                        data-active={attending === "no"}
                        onClick={() => setAttending("no")}
                        className="choice-chip label-caps rounded-full px-7 py-3 text-[0.62rem]"
                      >
                        {t.rsvp.decline}
                      </button>
                    </div>
                  </div>

                  {attending === "yes" && (
                    <div className="text-center md:text-left">
                      <label htmlFor="rsvp-guests" className="label-caps text-[0.58rem] text-[var(--ink-soft)]">
                        {t.rsvp.guests}
                      </label>
                      <div className="mt-3 flex items-center justify-center gap-6 md:justify-start">
                        <button
                          type="button"
                          aria-label={t.rsvp.fewerGuests}
                          onClick={() => setGuests((g) => Math.max(1, g - 1))}
                          className="choice-chip flex h-10 w-10 items-center justify-center rounded-full text-lg"
                        >
                          −
                        </button>
                        <span
                          id="rsvp-guests"
                          className="font-serif-display w-10 text-4xl tabular-nums text-[var(--ink)]"
                        >
                          {guests}
                        </span>
                        <button
                          type="button"
                          aria-label={t.rsvp.moreGuests}
                          onClick={() => setGuests((g) => Math.min(10, g + 1))}
                          className="choice-chip flex h-10 w-10 items-center justify-center rounded-full text-lg"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}

                  <div>
                    <label htmlFor="rsvp-message" className="label-caps text-[0.58rem] text-[var(--ink-soft)]">
                      {t.rsvp.note}
                    </label>
                    <textarea
                      id="rsvp-message"
                      className="field-input mt-1 resize-none"
                      rows={2}
                      placeholder={t.rsvp.notePlaceholder}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      maxLength={2000}
                    />
                  </div>

                  {submit.error && (
                    <p className="text-center font-serif-display text-base italic text-[var(--destructive)] md:text-left">
                      {submit.error.message && submit.error.message !== "Internal Server Error"
                        ? submit.error.message
                        : t.rsvp.error}
                    </p>
                  )}

                  <div className="pt-1 text-center md:text-left">
                    <button
                      type="submit"
                      disabled={submit.isPending || !attending || !name.trim()}
                      className="label-caps rounded-full bg-[var(--rose-deep)] px-12 py-4 text-[0.68rem] text-white transition-all hover:bg-[var(--ink)] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {submit.isPending ? t.rsvp.sending : t.rsvp.send}
                    </button>
                  </div>
                </form>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
