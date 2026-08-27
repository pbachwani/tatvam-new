"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

const LOADER_WORDS = [
  "We see you",
  "We meet you",
  "We hear you",
  "We find you",
  "We understand you",
  "Tatvam is you",
];
const HOLD = 0.6;

export default function Loader({ onComplete }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [word, setWord] = useState(LOADER_WORDS[0]);
  CustomEase.create("hop", "0.9, 0, 0.1, 1");

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1.25,
          ease: "hop",
          onComplete: () => onComplete?.(),
        });
      },
    });

    LOADER_WORDS.forEach((w, i) => {
      tl.fromTo(
        textRef.current,
        { autoAlpha: 0, y: 12 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          ease: "power1.in",
          onStart: () => setWord(w),
        },
      ).to(textRef.current, {
        autoAlpha: 0,
        y: -12,
        duration: 0.4,
        ease: "power2.out",
        delay: HOLD,
      });
    });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-100 flex items-center justify-center bg-[#ab5f4e]"
    >
      <span
        ref={textRef}
        className="font-mono text-lg tracking-wide text-white opacity-0"
      >
        {word}
      </span>
    </div>
  );
}
