"use client";
import Footer from "@/components/Footer";
import DecryptedText from "@/components/ui/DecryptedText";
import HomeReveal from "@/components/ui/HomeReveal";
import { useRevealer } from "@/hooks/useRevealer";
import Link from "next/link";
import React from "react";

export default function AboutPage() {
  useRevealer();

  const hotspots = [
    { label: "Work", href: "/work", xPercent: 24, yPercent: 55 },
    { label: "About", href: "/about", xPercent: 55, yPercent: 30 },
    { label: "Contact", href: "/contact", xPercent: 82, yPercent: 62 },
  ];
  return (
    <>
      <div className="revealer"></div>
      <section className="w-full min-h-screen md:px-16 px-4 py-16 bg-blue-500/0 flex flex-col justify-center">
        <div className="flex flex-col gap-20 md:min-h-[80vh] min-h-[50vh] h-full justify-end md:justify-center lg:justify-end">
          {/* images container */}
          <div className="flex h-fit justify-center items-center gap-4  group bg-red-300/0">
            <div className="group-hover:opacity-50 hover:opacity-100 transition-all duration-300 ease-out flex flex-col items-center justify-center w-full h-full gap-10 hover:text-accent">
              <img
                src="/about/window1.png"
                alt=""
                className="w-full h-40 md:h-80 lg:h-[560px] object-contain hover:scale-105 transition-transform duration-300 ease-out"
              />

              <button className="text-sm md:text-lg transition-all duration-200 ease-out font-bold">
                About
              </button>
            </div>
            <div className="group-hover:opacity-50 hover:opacity-100 transition-all duration-300 ease-out flex flex-col items-center justify-center w-full h-full gap-10 hover:text-accent -translate-y-8">
              <img
                src="/about/window2.png"
                alt=""
                className="w-full h-40 md:h-80 lg:h-[560px] object-contain hover:scale-105 transition-transform duration-300 ease-out"
              />

              <button className="text-sm md:text-lg transition-all duration-200 ease-out font-bold">
                Philosophy
              </button>
            </div>
            <div className="group-hover:opacity-50 hover:opacity-100 transition-all duration-300 ease-out flex flex-col items-center justify-center w-full h-full gap-10 hover:text-accent -translate-y-8">
              <img
                src="/about/window3.png"
                alt=""
                className="w-full h-40 md:h-80 lg:h-[560px] object-contain hover:scale-105 transition-transform duration-300 ease-out"
              />

              <button className="text-sm md:text-lg transition-all duration-200 ease-out font-bold">
                Brand Value
              </button>
            </div>
            <div className="group-hover:opacity-50 hover:opacity-100 transition-all duration-300 ease-out flex flex-col items-center justify-center w-full h-full gap-10 hover:text-accent">
              <img
                src="/about/window4.png"
                alt=""
                className="w-full h-40 md:h-80 lg:h-[560px] object-contain hover:scale-105 transition-transform duration-300 ease-out"
              />

              <button className="text-sm md:text-lg transition-all duration-200 ease-out font-bold">
                Awareness
              </button>
            </div>
          </div>
        </div>

        <div className="h-full min-h-[80vh] w-full flex justify-center items-center">
          <h4 className="font-andale max-md:mt-10  md:text-2xl">
            Tatvam is driven by a profound passion to articulate a conjoint
            solution for a space. We don&apos;t believe in separating the
            interiors and architecture from each other, in fact we make sure to
            build a synchronised experience with cultural research,
            vernacularism and the science of design.
          </h4>
        </div>
      </section>
      <Footer />
    </>
  );
}

{
  /* <HomeReveal
  src="/homepage/line-sketch1.png"
  alt="Studio home illustration"
  hotspots={hotspots}
/> */
}
// <img
//             src="/about/window2.png"
//             alt=""
//             className="w-full h-40 md:h-80 lg:h-[560px] object-contain group-hover:opacity-50 hover:opacity-100 transition-all duration-300 ease-out -translate-y-8"
//           />
//           <img
//             src="/about/window3.png"
//             alt=""
//             className="w-full h-40 md:h-80 lg:h-[560px] object-contain group-hover:opacity-50 hover:opacity-100 transition-all duration-300 ease-out -translate-y-8"
//           />
//           <img
//             src="/about/window4.png"
//             alt=""
//             className="w-full h-40 md:h-80 lg:h-[560px] object-contain group-hover:opacity-50 hover:opacity-100 transition-all duration-300 ease-out"
//           />
