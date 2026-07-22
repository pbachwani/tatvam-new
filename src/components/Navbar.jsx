"use client";
import Link from "next/link";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";

const NavLink = ({ href, label, onClick, className }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={clsx(
        `relative inline-block transition-all duration-200 ease-out `,
        `${className}`,
      )}
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

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

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
    <nav className="w-full h-fit flex justify-between items-center fixed top-0 inset-0 px-8 py-4 z-50 mx-auto group">
      {/* bg layer */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 backdrop-blur-[4px] [mask-image:linear-gradient(to_bottom,black_0%,transparent_100%)]" />
        <div className="absolute inset-0 backdrop-blur-[8px] [mask-image:linear-gradient(to_bottom,black_0%,transparent_75%)]" />
        <div className="absolute inset-0 backdrop-blur-[16px] [mask-image:linear-gradient(to_bottom,black_0%,transparent_50%)]" />
        <div className="absolute inset-0 backdrop-blur-[20px] [mask-image:linear-gradient(to_bottom,black_0%,transparent_25%)]" />
      </div>

      {/* logo */}
      <Link href="/" onClick={handleNavigation("/")} className="">
        <img src="/Logo-t.svg" alt="Logo" className="w-16 h-auto" />
      </Link>

      {/* nav links */}
      <div
        className={`flex md:gap-40 font-bold items-center transition-all duration-300 ease-out`}
        // ${textColor ? "text-white" : "text-black"}
      >
        <div className="flex gap-4 max-md:hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              onClick={handleNavigation(item.href)}
            />
          ))}
        </div>

        <div className="bg-none text-accent mix-blend-difference px-4 py-1.5 rounded-md transition-all duration-300 ease-out max-md:hidden">
          <NavLink
            href="/contact"
            label="Contact"
            onClick={handleNavigation("/contact")}
          />
        </div>
        <button
          className="md:hidden flex flex-col justify-center items-end gap-1.5 w-8 h-8"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
        >
          <span
            className={clsx(
              "block h-px bg-accent transition-all duration-500 ease-out",
              drawerOpen ? "w-8" : "w-6",
            )}
          />
          <span
            className={clsx(
              "block h-px bg-accent transition-all duration-500 ease-out",
              drawerOpen ? "w-8" : "w-4",
            )}
          />
          <span
            className={clsx(
              "block h-px bg-accent transition-all duration-500 ease-out",
              drawerOpen ? "w-8" : "w-2",
            )}
          />
        </button>
      </div>

      {/* mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              key="mobile-backdrop"
              className="fixed inset-0 z-50 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setDrawerOpen(false)}
            />

            <motion.div
              key="mobile-drawer"
              className="fixed top-0 right-0 h-full w-3/4 z-50 bg-black flex flex-col px-8 py-10"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            >
              {/* close button */}
              <button
                className="self-end mb-14 text-white/40 hover:text-white transition-colors"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <line
                    x1="2"
                    y1="2"
                    x2="18"
                    y2="18"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <line
                    x1="18"
                    y1="2"
                    x2="2"
                    y2="18"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                </svg>
              </button>

              <nav className="flex flex-col gap-6 font-andale">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: 0.15 + i * 0.07,
                      ease: [0.33, 1, 0.68, 1],
                    }}
                  >
                    <NavLink
                      key={item.href}
                      href={item.href}
                      label={item.label}
                      onClick={() => {
                        setDrawerOpen(false);
                        handleNavigation(item.href);
                      }}
                      className={"text-white text-3xl"}
                    />
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: 0.15 + 4 * 0.07,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                >
                  <NavLink
                    href={"/contact"}
                    label={"Contact"}
                    onClick={() => {
                      setDrawerOpen(false);
                      handleNavigation("/contact");
                      // setContactOpen(true);
                    }}
                    // className="hover:cursor-pointer block text-white text-3xl font-light tracking-wide py-3 border-b border-white/10 hover:text-white/60 transition-colors text-left"
                    className={"text-white text-3xl w-fit"}
                  >
                    Contact
                  </NavLink>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
