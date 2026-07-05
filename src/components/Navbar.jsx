"use client";
import Link from "next/link";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NavLink = ({ href, label, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative inline-block transition-all duration-200 ease-out"
    >
      {label}
      <span
        className={`absolute left-0 -bottom-0.5 h-0.5 w-full bg-[#AB5F4E] transition-transform duration-300 ease-out ${
          hovered ? "origin-left scale-x-100" : "origin-right scale-x-0"
        }`}
      />
    </Link>
  );
};
const Navbar = () => {
  const router = useTransitionRouter();
  const pathname = usePathname();

  const [textColor, setTextColor] = useState(false);

  function triggerPageTransition() {
    document.documentElement.animate(
      [
        {
          clipPath: "polygon(25% 75%, 75% 75%, 75% 75%, 25% 75%)",
        },
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        },
      ],
      {
        duration: 2000,
        easing: "cubic-bezier(0.9, 0, 0.1, 1)",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  }

  const handleNavigation = (path) => (e) => {
    if (path === pathname) {
      e.preventDefault();
      return;
    }
    router.push(path, { onTransitionReady: triggerPageTransition });
  };

  const navItems = [
    { href: "/about", label: "About" },
    { href: "/work", label: "Work" },
    { href: "/studio", label: "Studio" },
    { href: "/publications", label: "Publications" },
  ];

  return (
    <nav className="w-full h-fit flex justify-between items-center fixed top-0 inset-0 px-8 py-4 z-50 mx-auto backdrop-blur-sm">
      <Link href="/" onClick={handleNavigation("/")}>
        <img src="/Logo-t.svg" alt="Logo" className="w-16 h-auto" />
      </Link>

      <div
        className={`flex gap-12 font-bold ${textColor ? "text-white" : "text-black"}`}
      >
        <div className="flex gap-4">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              onClick={handleNavigation(item.href)}
            />
          ))}
        </div>
        <NavLink
          href="/contact"
          label="Contact"
          onClick={handleNavigation("/contact")}
        />
      </div>
    </nav>
  );
};

export default Navbar;
