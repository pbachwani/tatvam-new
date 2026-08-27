"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NextProject = ({ nextProject }) => {
  const headingRef = useRef(null);
  const imageRef = useRef(null);

  // useLayoutEffect(() => {
  //   const ctx = gsap.context(() => {
  //     gsap.to(headingRef.current, {
  //       marginLeft: 60,
  //       marginRight: 60,
  //       opacity: 1,
  //       color: "#ab5f4e",
  //       duration: 1.2,
  //       ease: "power2.out",
  //       scrollTrigger: {
  //         trigger: headingRef.current,
  //         start: "top 70%",
  //         end: "+=300",
  //         scrub: 1,
  //       },
  //     });
  //   });

  //   return () => ctx.revert();
  // }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial image state
      gsap.set(imageRef.current, {
        filter: "grayscale(100%)",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 70%",
          end: "+=300",
          scrub: 1,
        },
      });

      tl.to(
        headingRef.current,
        {
          marginLeft: 60,
          marginRight: 60,
          opacity: 0.6,
          color: "#ab5f4e",
          ease: "none",
        },
        0,
      ).to(
        imageRef.current,
        {
          filter: "grayscale(0%)",
          ease: "none",
        },
        0, // Start at the same time as the heading animation
      );
    });

    return () => ctx.revert();
  }, []);
  return (
    <section className="w-full h-full my-10 border-t">
      <div
        ref={headingRef}
        className="flex justify-between max-w-screen md:text-4xl lg:text-7xl py-4 cursor-default"
      >
        <span>+</span>
        <p className="opacity-40">Next Project</p>
        <span>+</span>
      </div>

      <div className="flex flex-col md:flex-row py-10 gap-4 cursor-default">
        <div className="w-full md:w-1/2 flex flex-col justify-start items-start font-andale gap-4 px-4 md:p-10">
          <span className="text-xl md:text-3xl font-semibold">
            {nextProject?.name}
          </span>

          <p className="md:text-lg text-justify">{nextProject?.brief}</p>
        </div>

        <Link
          href={`/work/${nextProject?.id}`}
          className="w-full h-fit md:w-1/2 p-4 md:p-10 relative group"
        >
          <img
            ref={imageRef}
            src={nextProject?.cover}
            alt=""
            className="w-full max-h-[50vh] object-cover transition-all duration-1000 ease-out"
          />
          <p className="absolute w-full h-full inset-0 flex justify-center items-center p-4 backdrop-blur-none font-andale uppercase group-hover:p-8 transition-all duration-500 ease-out group-hover:backdrop-blur-xs group-hover:text-accent group-hover:font-bold">
            [see project]
          </p>
        </Link>
      </div>
    </section>
  );
};

export default NextProject;
