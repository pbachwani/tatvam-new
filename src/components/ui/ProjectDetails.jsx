"use client";
import React, { useState } from "react";
import { motion } from "motion/react";

const ProjectDetails = ({ project }) => {
  const [more, setMore] = useState(false);

  const description = more
    ? project.description
    : project.description.slice(0, 2);
  return (
    <div className="lg:min-h-[80vh] h-full flex flex-col lg:flex-row-reverse justify-between items-start z-10">
      <div className="lg:w-1/2 w-full h-full px-4 md:p-10 flex flex-col text-black justify-between">
        <div className="flex flex-col gap-4 justify-between h-full transition-all duration-300 font-andale">
          <h2 className="text-xl md:text-3xl font-semibold">
            Details that matter to us
          </h2>
          {description.map((desc, i) => (
            <p key={i} className="font-andale mb-4 text-justify">
              {desc}
            </p>
          ))}

          <button
            className="text-end hover:text-accent transition-colors duration-200 ease-out cursor-pointer"
            onClick={() => setMore(!more)}
          >
            {more ? "Read less" : "Read more"}
          </button>
        </div>
      </div>
      <div className="w-1/2 hidden lg:block h-fit p-4 md:p-10">
        <img
          src={project.images[4].src}
          alt={project.name}
          className="w-full max-h-[80vh] object-cover"
        />
      </div>
    </div>
  );
};

export default ProjectDetails;
