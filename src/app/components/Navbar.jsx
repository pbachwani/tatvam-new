import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full h-20 flex justify-between items-center fixed top-0 inset-0 z-50 px-10 bg-background">
      <div>
        <Link href="/">
          <img src="/Logo-t.svg" alt="" className="w-16 h-auto object-cover" />
        </Link>
      </div>
      <div className="flex justify-between gap-10 font-black">
        <div className="flex justify-between gap-4">
          <div>About</div>
          <div>
            <Link href="/work">Work</Link>
          </div>
          <div>Studio</div>
          <div>Publications</div>
        </div>
        <div>Contact</div>
      </div>
    </nav>
  );
};

export default Navbar;
