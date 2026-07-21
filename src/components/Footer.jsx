import React from "react";

const Footer = () => {
  return (
    <footer className="w-full h-[50svh] my-10 px-4 md:px-10">
      <div className="relative">
        <div className="absolute h-1 w-full bg-black pl-4"></div>
        <img src="/Logo-t.svg" alt="Logo" className="w-24 h-auto" />
      </div>
      <div className="w-full h-full flex flex-col gap-2 mt-4">
        <p className="opacity-60">Sitelinks</p>
        <div className="flex flex-col md:flex-row gap-1 md:gap-2">
          <span>Home</span>
          <span>About</span>
          <span>Work</span>
          <span>Studio</span>
          <span>Contact</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
