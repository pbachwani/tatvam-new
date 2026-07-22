"use client";
import React from "react";
import { motion } from "motion/react";
import Link from "next/link";

const NextProject = ({ nextProject }) => {
  return (
    <section className="w-full h-full my-10 border-t">
      <motion.div
        initial={{ marginRight: 0, marginLeft: 0, opacity: 0.4 }}
        whileInView={{ marginRight: 60, marginLeft: 60, opacity: 1 }}
        exit={{ margin: 0, opacity: 0.4 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="flex justify-between max-w-screen  mx-0 md:text-4xl lg:text-7xl py-4 "
      >
        <span className="">+</span>
        <p className="opacity-40 ">Next Project</p>
        <span className="">+</span>
      </motion.div>
      <Link
        href={`/work/${nextProject?.id}`}
        className="flex flex-col md:flex-row group py-10 gap-4"
      >
        <div className="w-full md:w-1/2 flex flex-col justify-start items-start font-andale gap-4 px-4 md:p-10">
          <span className="text-xl md:text-3xl font-semibold">
            {nextProject?.name}
          </span>
          {/* <h3 className="text-2xl"></h3> */}
          <p className="md:text-lg text-justify">{nextProject?.brief}</p>
        </div>
        <div className="w-full h-fit md:w-1/2 p-4 md:p-10">
          <img
            src={nextProject?.cover}
            alt=""
            className="w-full max-h-[50vh] object-cover md:grayscale-100 group-hover:grayscale-0 transition-all duration-1000 ease-out "
          />
        </div>
      </Link>
    </section>
  );
};

export default NextProject;
