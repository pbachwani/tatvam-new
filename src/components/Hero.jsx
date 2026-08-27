import React from "react";

const Hero = () => {
  return (
    <section className="w-screen min-h-screen relative">
      <div className="flex justify-center items-center w-full min-h-screen">
        <div className="flex flex-col gap-10 max-w-2xl items-end text-justify font-andale">
          <p className="text-xl">
            Tatvam is driven by a profound passion to articulate a conjoint
            solution for a space. We don&apos;t believe in separating the
            interiors and architecture from each other, in fact we make sure to
            build a synchronised experience with cultural research,
            vernacularism and the science of design.
          </p>
          <h3 className="text-accent">Tatvam - The true state.</h3>
        </div>
      </div>
      <div className="absolute top-[60%] w-full h-full">
        <img
          src="/homepage/hero-bg.png"
          alt="Hero bg"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
    </section>
  );
};

export default Hero;
