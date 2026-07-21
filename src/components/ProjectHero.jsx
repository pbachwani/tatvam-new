"use client";

import React, { useEffect } from "react";
import { motion } from "motion/react";

const ProjectHero = ({ project }) => {
  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, []);
  return (
    <section className="w-full h-[200svh] overflow-hidden bg-black relative">
      <img
        src={project.cover}
        alt={project.name}
        className="absolute w-full h-[200svh] object-cover opacity-40 pointer-events-none z-10"
      />
      {/* top */}
      <div className="z-20 min-h-svh flex justify-between py-10 md:py-16 px-4 md:px-10 items-end text-white text-2xl sm:text-6xl md:text-8xl  overflow-hidden ">
        <div className="flex justify-between w-full overflow-hidden py-2">
          <motion.p
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.7,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="h-fit"
          >
            तत्वम्
            {/* {project.name} */}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.7,
              ease: [0.25, 0.46, 0.09, 0.98],
            }}
            className="h-fit "
          >
            {project.name}
          </motion.h2>
        </div>
      </div>
      {/* bottom */}
      <div className="min-h-svh flex flex-col md:flex-row justify-between py-10 px-4 md:px-10 items-start mt-40 text-white z-10">
        <div className="flex flex-col gap-2 max-w-2xl w-full md:w-1/2">
          <span>Project Brief</span>
          <p className="font-semibold">{project.brief}</p>
        </div>
        <div className="w-full md:w-1/2 flex flex-col">
          <h2>{project.name}</h2>
        </div>
      </div>
    </section>
  );
};

export default ProjectHero;
