"use client";
import Footer from "@/components/Footer";

import InfoSheetModal from "@/components/ui/InfoSheetModal";
import { useRevealer } from "@/hooks/useRevealer";

import React, { useState } from "react";

export default function AboutPage() {
  useRevealer();

  const [activeCard, setActiveCard] = useState(null);

  const cards = [
    {
      key: "about",
      eyebrow: "About",
      image: "/about/window1.png",
      description:
        "Tatvam is driven by a profound passion to articulate a conjoint solution for a space. We don’t believe in separating the interiors and architecture from each other, in fact we make sure to build a synchronised experience with cultural research, vernacularism and the science of design. Founded in 2020 as an Interior and Architecture firm, the Jaipur based company has its roots coming from the heart of the elements (tattva) of anything nature and shaping into practicality from our Design alchemy becoming Tatvam - The true state.",
    },
    {
      key: "philosophy",
      eyebrow: "Philosophy",
      image: "/about/window2.png",
      description:
        "With an eye for functionality, we build spaces that evoke emotion in design. Our faith lies in the details of daily life and its encounters with culture, surroundings and thoughts. We have a dedicated approach towards raw minimalism but our equation is combined of three sources of inspiration: the client’s personality, the space and its surroundings, and the process. A great design is more than just good aesthetics. Our philosophy of “Making a Vision come True” stands on the grounds of empathy and focus, where form and function are one and design is a cultural artefact that redefines itself in simplicity, to give birth to something that is timeless.",
    },
    {
      key: "brandvalue",
      eyebrow: "Brand Value",
      image: "/about/window3.png",
      description:
        "Researching the VERNACULAR till it becomes Muscle Memory. REVIVAL is an essential evolution to build a better tomorrow. To build a community through the interplays of other communities and giving back is true AWARENESS.",
    },
    {
      key: "awareness",
      eyebrow: "Awareness",
      image: "/about/window4.png",
      description:
        "Tatvam strongly believes in awareness and fulfills that value by sharing its personal experience and knowledge of design, heritage and architecture with all. We look forth to create a deeply integrated community of architects, designers, enthusiasts and anyone who seeks to know more or share their experiences. To enhance this process of knowledge exchange we host Heritage Walks, Online Seminars, Talks with co-architects and designers.",
    },
  ];
  return (
    <>
      <div className="revealer"></div>
      <section className="w-full min-h-screen md:px-16 px-4 py-16 bg-blue-500/0 flex flex-col justify-center">
        <div className="flex flex-col gap-20 md:min-h-[80vh] min-h-[50vh] h-full justify-end md:justify-center lg:justify-end">
          {/* images container */}
          <div className="flex h-fit justify-center items-center gap-4 group bg-red-300/0">
            {cards.map((card) => (
              <div
                key={card.key}
                onClick={() => setActiveCard(card)}
                className="group-hover:opacity-50 hover:opacity-100 transition-all duration-300 ease-out flex flex-col items-center justify-center w-full h-full gap-10 hover:text-accent cursor-pointer"
              >
                <img
                  src={card.image}
                  alt=""
                  className="w-full h-40 md:h-80 lg:h-[560px] object-contain hover:scale-105 transition-transform duration-300 ease-out"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCard(card);
                  }}
                  className="text-sm md:text-lg transition-all duration-200 ease-out font-bold"
                >
                  {card.eyebrow}
                </button>
              </div>
            ))}
          </div>

          <InfoSheetModal
            isOpen={!!activeCard}
            onClose={() => setActiveCard(null)}
            eyebrow={activeCard?.eyebrow}
            image={activeCard?.image}
            description={activeCard?.description}
          />
        </div>
      </section>

      <Footer />
    </>
  );
}

// const hotspots = [
//   { label: "Work", href: "/work", xPercent: 24, yPercent: 55 },
//   { label: "About", href: "/about", xPercent: 55, yPercent: 30 },
//   { label: "Contact", href: "/contact", xPercent: 82, yPercent: 62 },
// ];

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
