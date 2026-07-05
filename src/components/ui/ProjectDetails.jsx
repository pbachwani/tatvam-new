import React from "react";

const ProjectDetails = ({ project }) => {
  return (
    <div className="min-h-svh flex flex-col lg:flex-row justify-between items-start z-10">
      <div className="lg:w-1/2 w-full h-full py-16 px-4 md:px-10 flex flex-col text-black justify-between">
        <div className="flex flex-col gap-4 mt-4">
          {project.description.map((desc, i) => (
            <p key={i} className="font-andale mb-4">
              {desc}
            </p>
          ))}
        </div>
        {/* <div>
          <h3 className="font-andale text-4xl py-4 mt-4">[TLDR]</h3>
          <p>{project.foot}</p>
        </div> */}
      </div>
      <div className="lg:w-1/2 w-full h-svh">
        <img
          src={project.images[0]}
          alt={project.name}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default ProjectDetails;
