"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";

import { projects } from "../constants/projects";
import { useRevealer } from "@/hooks/useRevealer";

import DecryptedText from "@/components/ui/DecryptedText";

export default function WorkPage() {
  useRevealer();

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
    window.dispatchEvent(new Event("resize"));
  }, []);

  return (
    <>
      <div className="revealer"></div>
      {/* Scroll distance — adjust multiplier to taste */}
      <div style={{ height: `${projects.length * 50 + 100}vh` }} />

      <div className="fixed inset-0 overflow-hidden">
        <div
          ref={trackRef}
          className="absolute bottom-0 flex items-end mb-10 will-change-transform gap-4 md:px-16 px-4"
        >
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/work/${project.id}`}
              className="shrink-0 flex flex-col z-10"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onTouchStart={() => setHoveredProject(project.id)}
              onTouchEnd={() => setHoveredProject(null)}
            >
              <div className="relative lg:w-120 w-60 scale-95 hover:scale-100 transition-transform duration-700 ease-out shadow-2xl overflow-hidden">
                <img
                  src={project.cover}
                  alt={project.name}
                  className={`object-cover transition-all duration-500 ease-out scale-110 hover:scale-100 hover:brightness-75`}
                />
              </div>

              <div className="flex justify-between items-baseline pt-2.5 w-full px-4">
                <span className="text-xs md:text-xl text-[#1a1a1a] font-deva">
                  नाम
                </span>
                <span className="font-serif text-xs md:text-xl text-[#1a1a1a]">
                  {project.name}
                </span>
              </div>
            </Link>
          ))}
          {/* <div className="w-40 md:w-60 h-80 border flex justify-center items-center mb-6">
            more projects coming soon
          </div> */}
        </div>
      </div>

      {/* overlays sketech and footnote */}
      <AnimatePresence mode="popLayout">
        {hoveredProject && (
          <>
            <motion.div
              key="overlay"
              initial={{
                opacity: 0,
                backgroundColor: "#ab5f4e",
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                backgroundColor: "none",
                transition: { duration: 1.5 },
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
                transition: { duration: 0.2 },
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed w-72 h-72 z-50 pointer-events-none"
              style={{
                x: smoothX,
                y: smoothY,
                left: 0,
                top: 50,
                translateX: "-50%", // centers horizontally
                translateY: "-100%", // positions above cursor
              }}
            >
              <img
                src={projects.find((p) => p.id === hoveredProject)?.draw}
                alt=""
                className="w-full h-full object-contain"
              />
            </motion.div>

            <motion.div
              key="text"
              initial={{ opacity: 1, color: "#ab5f4e" }}
              animate={{
                opacity: 1,
                color: "#000000",
                transition: { duration: 1.5 },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.2 },
              }}
              transition={{ duration: 0.5 }}
              className="fixed w-full h-fit top-20 left-0 -z-10 justify-start"
            >
              <div className="md:max-w-4xl w-fit text-justify font-andale text-wrap flex flex-wrap px-4 md:px-10 font-bold ">
                <DecryptedText
                  maxIterations={10}
                  animateOn="view"
                  text={
                    projects.find((p) => p.id === hoveredProject)?.foot ||
                    "lorem ipsum dolor sit amet consectetur adipisicing elit."
                  }
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* {hoveredProject && (
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
      )} */
