import { useEffect, useState } from "react";

// 7:00 PM, 24 December 2026 — Kuala Lumpur time (UTC+8)
const WEDDING_DATE = new Date("2026-12-24T19:00:00+08:00");

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  passed: boolean;
};

function compute(): TimeLeft {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, passed: true };
  }
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
    passed: false,
  };
}

export function useCountdown(): TimeLeft {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(compute);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(compute()), 1000);
    return () => clearInterval(timer);
  }, []);

  return timeLeft;
}
