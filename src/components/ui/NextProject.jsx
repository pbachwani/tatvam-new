import React from "react";

const NextProject = ({ nextProject }) => {
  return (
    <section className="w-full h-full">
      <div className="flex">
        <div className="w-full md:w-1/2 px-4 md:p-10">
          <img src={nextProject.cover} alt="" />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-start items-start font-andale gap-4 px-4 md:p-10">
          <span className="text-xl md:text-3xl font-semibold">
            Next Project
          </span>
          <h3 className="text-2xl">{nextProject.name}</h3>
          <p>{nextProject.brief}</p>
        </div>
      </div>
    </section>
  );
};

export default NextProject;
