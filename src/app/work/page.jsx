"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";

const projects = [
  {
    id: 1,
    name: "Project 1",
    image: "/1.webp",
    slug: "/p1",
    draw: "/animated.svg",
  },
  {
    id: 2,
    name: "Project 2",
    image: "/2.jpg",
    slug: "/p2",
    draw: "/illustration1.png",
  },
  {
    id: 3,
    name: "Project 3",
    image: "/3.webp",
    slug: "/p3",
    draw: "/animated2.svg",
  },
  {
    id: 4,
    name: "Project 4",
    image: "/1.webp",
    slug: "/p4",
    draw: "/illustration1.png",
  },
  {
    id: 5,
    name: "Project 5",
    image: "/2.jpg",
    slug: "/p5",
    draw: "/animated.svg",
  },
  {
    id: 6,
    name: "Project 6",
    image: "/3.webp",
    slug: "/p6",
    draw: "/illustration1.png",
  },
  {
    id: 7,
    name: "Project 7",
    image: "/1.webp",
    slug: "/p7",
    draw: "/animated.svg",
  },
  {
    id: 8,
    name: "Project 8",
    image: "/2.jpg",
    slug: "/p8",
    draw: "/illustration1.png",
  },
  {
    id: 9,
    name: "Project 9",
    image: "/3.webp",
    slug: "/p9",
    draw: "/illustration1.png",
  },
  {
    id: 10,
    name: "Project 10",
    image: "/1.webp",
    slug: "/p10",
    draw: "/illustration1.png",
  },
  {
    id: 11,
    name: "Project 11",
    image: "/2.jpg",
    slug: "/p11",
    draw: "/animated.svg",
  },
  {
    id: 12,
    name: "Project 12",
    image: "/3.webp",
    slug: "/p12",
    draw: "/illustration1.png",
  },
];

export default function WorkPage() {
  const trackRef = useRef(null);
  const [hoveredProject, setHoveredProject] = useState(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = scrollTop / maxScroll;
      const totalShift = track.scrollWidth - window.innerWidth;
      track.style.transform = `translateX(${-(progress * totalShift)}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    console.log("Hovered project:", hoveredProject);
  }, [hoveredProject]);

  return (
    <>
      {/* Scroll distance — adjust multiplier to taste */}
      <div style={{ height: `${projects.length * 40 + 100}vh` }} />

      <div className="fixed inset-0 overflow-hidden">
        <div
          ref={trackRef}
          className="absolute bottom-0 flex items-end mb-20 will-change-transform gap-4 md:px-16 px-4 pb-12"
        >
          {projects.map((project) => (
            <Link
              key={project.id}
              href={project.slug}
              className="shrink-0 flex flex-col z-10"
            >
              <div className="relative md:w-96 w-60 hover:scale-90 transition-transform duration-300 ease-out">
                <img
                  src={project.image}
                  alt={project.name}
                  className="object-cover transition-transform duration-300 ease-out hover:scale-110"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                />
              </div>

              <div className="flex justify-between items-baseline pt-2.5 w-full">
                <span className="font-serif text-xs text-[#1a1a1a]">नाम</span>
                <span className="font-serif text-xs text-[#1a1a1a]">
                  {project.name}
                </span>
              </div>
            </Link>
          ))}
          <div className="w-40 md:w-60 h-80 border flex justify-center items-center mb-6">
            more projects coming soon
          </div>
          {/* <div className="shrink-0 md:w-8 w-4" /> */}
        </div>
      </div>

      {/* {hoveredProject && (
        <AnimatePresence mode="wait">
          <motion.div
            key="overlay"
            style={{
              x: smoothX,
              y: smoothY,
              translateX: "-50%", // centers around cursor
              translateY: "-120%",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed w-72 h-72 z-20 pointer-events-none brightness-150"
          >
            <img
              src={projects.find((p) => p.id === hoveredProject)?.draw}
              alt=""
              className="w-full h-full object-contain "
            />
          </motion.div>

          <motion.div
            key="text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed w-full h-fit bottom-4 z-10 flex justify-center items-center"
          >
            <div className="max-w-2xl text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
              doloribus fugiat necessitatibus vero totam? Delectus aut mollitia
              eaque alias dolorum totam, repudiandae impedit dignissimos
              molestiae.
            </div>
          </motion.div>
        </AnimatePresence>
      )} */}

      <AnimatePresence mode="wait">
        {hoveredProject && (
          <>
            <motion.div
              key="overlay"
              style={{
                x: smoothX,
                y: smoothY,
                translateX: "-50%",
                translateY: "-120%",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeOut" }} // slightly faster feels better
              className="fixed w-72 h-72 z-20 pointer-events-none brightness-150"
            >
              <img
                src={projects.find((p) => p.id === hoveredProject)?.draw}
                alt=""
                className="w-full h-full object-contain"
              />
            </motion.div>

            <motion.div
              key="text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed w-full h-fit bottom-4 z-10 flex justify-center items-center"
            >
              <div className="max-w-2xl text-center">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum,
                ullam. Qui, officia dolorem nobis ipsa maiores corrupti neque,
                quidem at quas quis, fugiat sit expedita.
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
