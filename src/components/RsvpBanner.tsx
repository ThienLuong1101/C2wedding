import { useEffect, useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

type RsvpBannerProps = {
  visible: boolean;
};

export default function RsvpBanner({ visible }: RsvpBannerProps) {
  const { t } = useLanguage();
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const banner = bannerRef.current;
    if (!banner) return;
    const apply = () => {
      document.documentElement.style.setProperty("--rsvp-banner-h", `${banner.offsetHeight}px`);
    };
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(banner);
    return () => observer.disconnect();
  }, [visible, t.rsvp.eyebrow]);

  return (
    <div
      ref={bannerRef}
      className={`rsvp-banner${visible ? " is-visible" : ""}`}
      aria-hidden={!visible}
    >
      <a href="#rsvp" tabIndex={visible ? 0 : -1} className="rsvp-banner-link">
        {t.rsvp.eyebrow}
      </a>
    </div>
  );
}
