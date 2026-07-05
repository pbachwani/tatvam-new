"use client";

import React from "react";

const ProjectHero = ({ project }) => {
  return (
    <>
      <div className="w-full h-[200svh] overflow-hidden bg-black">
        <img
          src={project.cover}
          alt={project.name}
          className="absolute w-full h-[200svh] object-cover opacity-60 z-0"
        />
        {/* top */}
        <div className="min-h-svh flex justify-between py-10 md:py-16 px-4 md:px-10 items-end text-white z-10 text-2xl md:text-8xl">
          <p>तत्वम्</p>
          <h2>{project.name}</h2>
        </div>
        {/* bottom */}
        <div className="min-h-svh flex flex-col md:flex-row justify-between py-10 px-4 md:px-10 items-start text-white z-10">
          <div className="flex flex-col gap-2 max-w-2xl w-full md:w-1/2">
            <span>Project Brief</span>
            <p className="font-semibold">{project.brief}</p>
          </div>
          <div className="w-full md:w-1/2">
            <h2>{project.name}</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectHero;
