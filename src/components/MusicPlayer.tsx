import { useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const MUSIC_SRC = "/music/wedding-music.mp3?v=gymnopedie-1";
const TARGET_VOLUME = 0.65;

export default function MusicPlayer() {
  const { t } = useLanguage();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  const stopFade = () => {
    if (fadeRef.current) {
      cancelAnimationFrame(fadeRef.current);
      fadeRef.current = null;
    }
  };

  const fadeTo = (audio: HTMLAudioElement, target: number, thenPause = false) => {
    stopFade();
    const start = audio.volume;
    const duration = 700;
    const startedAt = performance.now();
    const step = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      audio.volume = start + (target - start) * progress;
      if (progress < 1) {
        fadeRef.current = requestAnimationFrame(step);
      } else {
        fadeRef.current = null;
        if (thenPause) audio.pause();
      }
    };
    fadeRef.current = requestAnimationFrame(step);
  };

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    setFailed(false);

    if (!audio.paused) {
      fadeTo(audio, 0, true);
      setPlaying(false);
      return;
    }

    try {
      stopFade();
      audio.volume = TARGET_VOLUME;
      await audio.play();
      setPlaying(true);
    } catch (error) {
      console.error("Music playback failed.", error);
      setPlaying(false);
      setFailed(true);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={MUSIC_SRC}
        loop
        preload="auto"
        playsInline
        className="hidden"
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? t.music.pauseAria : t.music.playAria}
        aria-pressed={playing}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full border border-[var(--rose)]/40 bg-[var(--ivory)]/85 py-2 pl-3 pr-4 shadow-[0_4px_18px_rgba(169,107,130,0.18)] backdrop-blur-sm transition-all duration-300 hover:border-[var(--rose-deep)]/60 hover:bg-[var(--ivory)]"
      >
        <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[var(--rose-deep)]/10">
          {playing && (
            <>
              <span className="absolute inset-0 animate-ping rounded-full bg-[var(--rose)]/30" />
              <span className="flex h-3 items-end gap-[3px]">
                <span className="music-bar" style={{ animationDelay: "0s" }} />
                <span className="music-bar" style={{ animationDelay: "0.25s" }} />
                <span className="music-bar" style={{ animationDelay: "0.5s" }} />
              </span>
            </>
          )}
          {!playing && (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--rose-deep)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          )}
        </span>
        <span className="label-caps text-[0.55rem] text-[var(--ink-soft)]">
          {failed ? t.music.failed : playing ? t.music.playing : t.music.play}
        </span>
      </button>
    </>
  );
}
