import { useEffect, useRef, useState } from "react";
import Hero from "@/sections/Hero";
import Invitation from "@/sections/Invitation";
import Countdown from "@/sections/Countdown";
import Details from "@/sections/Details";
import Gallery from "@/sections/Gallery";
import Rsvp from "@/sections/Rsvp";
import Footer from "@/sections/Footer";
import MusicPlayer from "@/components/MusicPlayer";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import "../App.css";

const SECTION_COLORS = [
  "#fbf8f2", // hero
  "#f6f4ed", // invitation
  "#f7e2e7", // countdown
  "#dfe8e6", // details
  "#f3ebe3", // gallery
  "#f6eadf", // rsvp
  "#dff3ea", // footer
];

export default function Home() {
  const [bg, setBg] = useState(SECTION_COLORS[0]);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    document.body.classList.add("is-loaded");
    return () => document.body.classList.remove("is-loaded");
  }, []);

  useEffect(() => {
    let raf = 0;
    const THRESHOLD = 240;
    const update = () => {
      const sections = sectionRefs.current;
      let active = 0;
      sections.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= THRESHOLD) {
          active = i;
        }
      });
      setBg(SECTION_COLORS[active]);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const setRef = (i: number) => (el: HTMLDivElement | null) => {
    sectionRefs.current[i] = el;
  };

  const sections = [
    <Hero key="hero" />,
    <Invitation key="invitation" />,
    <Countdown key="countdown" />,
    <Details key="details" />,
    <Gallery key="gallery" />,
    <Rsvp key="rsvp" />,
    <Footer key="footer" />,
  ];

  return (
    <main
      className="min-h-screen transition-[background-color] duration-1000 ease-in-out"
      style={{ backgroundColor: bg }}
    >
      {sections.map((section, i) => (
        <div key={i} ref={setRef(i)}>
          {section}
        </div>
      ))}
      <LanguageSwitcher />
      <MusicPlayer />
    </main>
  );
}
