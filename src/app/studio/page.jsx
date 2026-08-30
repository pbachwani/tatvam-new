"use client";

import ElasticMesh from "@/components/ui/ElasticMesh";
import { useRevealer } from "@/hooks/useRevealer";
import gsap, { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function StudioPage() {
  const parallaxRefs = useRef([]);
  parallaxRefs.current = [];

  const addParallaxRef = (el) => {
    if (el && !parallaxRefs.current.includes(el)) {
      parallaxRefs.current.push(el);
    }
  };
  const illustrationRefs = useRef([]);

  // reset on every render so we don't accumulate stale/unmounted nodes
  illustrationRefs.current = [];

  const addIllustrationRef = (el) => {
    if (el && !illustrationRefs.current.includes(el)) {
      illustrationRefs.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      illustrationRefs.current.forEach((el) => {
        gsap.set(el, { opacity: 0 });
        gsap.fromTo(
          el,
          { clipPath: "ellipse(0% 0% at 50% 50%);" },
          {
            opacity: 1,
            clipPath: "ellipse(100% 100% at 50% 50%)",
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 70%",
              end: "top 20%",
              scrub: true,
            },
          },
        );
      });

      parallaxRefs.current.forEach((el) => {
        // move the oversized image up/down within its container as the section scrolls
        gsap.fromTo(
          el,
          { yPercent: -15 },
          {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, []);

  useRevealer();
  return (
    <>
      <div className="revealer"></div>
      <main className="min-h-screen w-full h-full bg-[#201E1B]">
        {/* CLUTURE */}
        <section
          id="hero"
          className="relative w-full overflow-hidden h-full bg-white"
        >
          <div className="flex w-full h-[60vh] justify-center items-center text-accent font-andale text-4xl md:text-6xl lg:text-9xl">
            Culture
          </div>
          <div className="h-screen w-full relative bg-black">
            <Image
              fill
              src="/studio/hero.jpg"
              alt="Studio Hero"
              className="absolute h-full w-full object-cover blur-[2px] brightness-60"
            />
            <div className="z-20 absolute flex flex-col w-full h-screen justify-between lg:px-32 px-4 text-white py-40 text-lg lg:text-2xl">
              <div className="font-andale  md:w-2xl text-justify">
                At Tatvam, culture is not a structure of rules but a rhythm of
                living.
              </div>
              <div className="font-andale  md:w-2xl text-justify ml-auto">
                Days begin with intent and curiosity, stretching into evenings
                alive with fresh ideas, yet time here is never measured in hours
                - only in the passion that fills them.
              </div>
            </div>
          </div>
        </section>
        <section
          id="cluture"
          className="relative w-full overflow-hidden h-full text-white bg-[#201E1B] flex flex-col lg:gap-40 gap-24"
        >
          {/* Heading */}
          <div className="flex flex-col pt-20 px-4 lg:px-32">
            <h1 className="text-4xl md:text-8xl">Open by Nature</h1>
            <span className="w-full h-px bg-white/30 mt-4" />
            <h3 className="text-2xl md:text-5xl mt-4 tracking-wider lg:ml-[50%]">
              The Soul of Our Work
            </h3>
          </div>

          {/* first section */}
          <div className="flex flex-col lg:flex-row lg:h-screen min-h-full justify-start items-start w-full px-4 lg:px-20 py-10 max-lg:gap-12">
            <div className="w-full h-full px-4 lg:px-10 relative">
              <img
                src="/studio/first.png"
                alt="Studio Hero"
                className="h-full w-full object-cover"
              />
              {/* only on mobile */}
              <img
                ref={addIllustrationRef}
                src="/studio/hands.png"
                alt="Hands"
                className="absolute bottom-0 left-0 h-full w-full object-cover overflow-visible  lg:hidden"
              />
            </div>
            <div className="w-full h-full px-4 flex justify-start items-end relative overflow-visible">
              <img
                ref={addIllustrationRef}
                loading="eager"
                src="/studio/hands.png"
                alt="Hands"
                className="absolute bottom-0 left-0 h-full w-full object-cover overflow-visible max-lg:hidden"
              />
              <p className="font-andale md:text-2xl text-justify">
                What shapes this passion is togetherness. A table of shared
                meals, the simple comfort of coffee in the morning, or laughter
                over a board game - these are not distractions but bridges,
                softening the intensity of long hours and turning work into a
                collective flow.
              </p>
            </div>
          </div>

          {/* second section */}
          <div className="flex flex-col lg:flex-row-reverse lg:h-screen min-h-full justify-start items-start w-full px-4 lg:px-20 py-10 max-lg:gap-12">
            <div className="w-full h-full px-4 lg:px-10 relative">
              <img
                src="/studio/second.png"
                alt="Studio Hero"
                className="h-full w-full object-cover"
              />
              {/* only mobile */}
              <img
                ref={addIllustrationRef}
                src="/studio/heritage.png"
                alt="Hands"
                className="absolute bottom-0 left-0 h-full w-full object-cover overflow-visible  lg:hidden"
              />
            </div>
            <div className="w-full h-full px-4 flex justify-start items-end relative overflow-visible">
              <img
                ref={addIllustrationRef}
                loading="eager"
                src="/studio/heritage.png"
                alt="Hands"
                className="absolute bottom-0 left-0 h-full w-full object-cover overflow-visible max-lg:hidden"
              />
              <p className="font-andale md:text-2xl text-justify">
                Even the act of arranging the studio -every shelf, every desk
                touched by many hands -becomes a ritual of belonging.
              </p>
            </div>
          </div>

          {/* third section */}
          <div className="flex flex-col lg:flex-row lg:h-screen min-h-full justify-start items-start w-full px-4 lg:px-20 py-10 max-lg:gap-12">
            <div className="w-full h-full px-4 lg:px-10 relative">
              <img
                src="/studio/third.png"
                alt="Studio Hero"
                className="h-full w-full object-cover"
              />
              {/* only mobile */}
              <img
                ref={addIllustrationRef}
                src="/studio/windows.png"
                alt="Hands"
                className="absolute bottom-0 left-0 h-full w-full object-cover overflow-visible  lg:hidden"
              />
            </div>
            <div className="w-full h-full px-4 flex justify-start items-end relative overflow-visible">
              <img
                ref={addIllustrationRef}
                src="/studio/windows.png"
                alt="Hands"
                className="absolute bottom-0 left-0 h-full w-full object-cover overflow-visible lg:scale-60 lg:-translate-y-50 lg:-translate-x-40 max-lg:hidden"
              />
              <p className="font-andale md:text-2xl text-justify">
                Ideas here are not owned but offered. In conversations without
                hierarchy, the sketch of an intern may stand beside the insight
                of a senior, each voice given equal weight. When a project is
                dissected through many perspectives, design is no longer a
                solitary pursuit but a dialogue -layered, open, and alive.
              </p>
            </div>
          </div>

          {/* fourth section */}
          <div className="flex flex-col lg:flex-row-reverse lg:h-screen min-h-full justify-start items-start w-full px-4 lg:px-20 py-10 max-lg:gap-12">
            <div className="w-full h-full px-4 lg:px-10 relative">
              <img
                src="/studio/fourth.png"
                alt="Studio Hero"
                className="h-full w-full object-cover brightness-75"
              />
              {/* only mobile */}
              <img
                ref={addIllustrationRef}
                src="/studio/walks.png"
                alt="Hands"
                className="absolute bottom-0 left-0 h-full w-full object-cover overflow-visible  lg:hidden"
              />
            </div>
            <div className="w-full h-full px-4 flex justify-start items-end relative overflow-visible">
              <img
                ref={addIllustrationRef}
                src="/studio/walks.png"
                alt="Hands"
                className="absolute bottom-0 left-0 h-full w-full object-cover overflow-visible pointer-events-none max-lg:hidden"
              />
              <div className="flex flex-col justify-end items-end gap-4">
                <p className="font-andale md:text-2xl text-justify">
                  The city, too, seeps into this culture. Walks through
                  Jaipur&apos;s old streets, evenings in heritage courtyards,
                  and the discovery of food or art become part of the
                  studio&apos;s vocabulary. They remind us that design does not
                  exist apart from life, but grows out of it.
                </p>
                <p className="font-calibri font-bold transition-all duration-300 ease-out hover:cursor-pointer bg-black/30 hover:underline underline-offset-2 px-2 py-1">
                  Read more about tatvam walks
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SPACE */}

        <section
          id="sapce"
          className="relative w-full h-[70vh] md:h-screen overflow-hidden bg-black mt-40"
        >
          <div
            ref={addParallaxRef}
            className="absolute inset-0 w-full h-[130%] top-[-15%]"
          >
            <img
              src="/studio/space.png"
              alt="space"
              className="w-full h-full object-cover brightness-75"
            />
          </div>

          <div className="absolute inset-0 flex items-center justify-center px-4 md:px-32">
            <p className="font-andale text-white text-center text-lg lg:text-4xl leading-tight">
              It is this openness - of living, listening, and creating together
              - that makes Tatvam not just a studio, but a way of being.
            </p>
          </div>
        </section>

        {/* space seperator */}
        <div className="flex w-full h-[60vh] justify-center items-center text-accent font-andale text-4xl md:text-6xl lg:text-9xl bg-white">
          Space
        </div>

        {/* Restored by Memory section */}
        <section
          id="restored"
          className="relative w-full overflow-hidden bg-black text-white"
        >
          {/* background image */}
          <div className="absolute inset-0">
            <img
              src="/studio/space.png"
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>

          <div className="relative z-10 px-4 py-20 md:px-12 lg:px-32 lg:py-32">
            {/* heading */}
            {/* <h2 className="font-andale text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-wide">
              Restored by Memory
              <br />A Studio That Breathes
            </h2> */}

            {/* Heading */}
            <div className="flex flex-col">
              <h1 className="text-4xl md:text-8xl">Restored by Memory</h1>
              <span className="w-full h-px bg-white/30 mt-4" />
              <h3 className="text-2xl md:text-5xl mt-4 tracking-wider lg:ml-[50%]">
                A Studio That Breathes
              </h3>
            </div>

            {/* hero image */}
            <div className="w-full mt-10 lg:mt-40">
              <img
                src="/studio/space-1.jpg"
                alt="Tatvam Studio entrance"
                className="w-full h-[45vh] md:h-[60vh] lg:h-[75vh] object-cover"
              />
            </div>

            {/* intro paragraph */}
            <p className="font-andale text-sm sm:text-base md:text-lg mt-6 lg:mt-8 leading-relaxed text-white/90 text-justify">
              Tucked away in a haveli in the heart of Jaipur&apos;s C-Scheme,
              the Tatvam Studio is more than an office - it is a restoration of
              memory, material, and meaning. What once were two compact rooms
              with pink walls, shuttered niches, and heavy furniture now
              breathes with openness.
            </p>

            {/* image + text pair */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-16 mt-10 lg:mt-20 items-start">
              <div className="w-full lg:w-1/2">
                <img
                  src="/studio/space-2.jpg"
                  alt="Tatvam Studio window"
                  className="w-full h-[40vh] md:h-[55vh] lg:h-[70vh] object-cover"
                />
              </div>
              <div className="w-full lg:w-1/2 flex items-center">
                <p className="font-andale text-sm sm:text-base md:text-lg leading-relaxed text-white/90 text-justify">
                  The transformation began with listening. Old wooden almirahs,
                  once closed and heavy, were reimagined into open shelves;
                  niches, unveiled from their shutters, revealed quiet traces of
                  the past. A single wall opening stitched the rooms together,
                  allowing light to flow and conversations to move without
                  interruption. Even the lighting chose restraint - suspended
                  from handmade rings so the century-old stone above could
                  remain untouched.
                </p>
              </div>
            </div>

            {/* offset third image - right-aligned on desktop, stacked on mobile */}
            <div className="w-full lg:w-1/2 lg:ml-auto mt-8 lg:-mt-60">
              <img
                src="/studio/space-3.jpg"
                alt="Tatvam Studio interior"
                className="w-full h-[35vh] md:h-[50vh] lg:h-[55vh] object-cover"
              />
            </div>

            {/* closing paragraph */}
            <p className="font-andale text-sm sm:text-base md:text-lg mt-10 lg:mt-16 leading-relaxed text-white/90">
              The transformation began with listening. Old wooden almirahs, once
              closed and heavy, were reimagined into open shelves; niches,
              unveiled from their shutters, revealed quiet traces of the past. A
              single wall opening stitched the rooms together, allowing light to
              flow and conversations to move without interruption. Even the
              lighting chose restraint - suspended from handmade rings so the
              century-old stone above could remain untouched.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

{
  /* <div style={{ width: "100%", height: "100%" }}>
                <ElasticMesh
                  image="/studio/hero.jpg"
                  interaction="hover"
                  tilt={0}
                  shading={0}
                  color1="#5227FF"
                  color2="#B19EEF"
                  showGrid={false}
                  gridDensity={37}
                  gridOpacity={0.62}
                  gridColor="#ffffff"
                  highlight="#ffffff"
                  borderRadius={0}
                  stiffness={0.05}
                  damping={0.2}
                  grabRadius={0.6}
                  pull={0.1}
                  wobble={2}
                  resolution={15}
                  enabled
                />
              </div> */
}
