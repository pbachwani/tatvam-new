"use client";
import Link from "next/link";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const NavLink = ({ href, label, onClick, className }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative inline-block transition-all duration-200 ease-out ${className}`}
    >
      {label}
      <span
        className={`absolute left-0 -bottom-0.5 h-0.5 w-full bg-white transition-transform duration-300 ease-out ${
          hovered ? "origin-left scale-x-100" : "origin-right scale-x-0"
        }`}
      />
    </Link>
  );
};

const PAGE_NAMES = {
  "/": "Home",
  "/about": "About",
  "/work": "Work",
  "/studio": "Studio",
  "/publications": "Publications",
  "/contact": "Contact",
};

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/studio", label: "Studio" },
  { href: "/publications", label: "Publications" },
  { href: "/contact", label: "Contact" },
];

const SHAPE = {
  closed: { width: 220, height: 48 },
  open: { width: 260, height: 320 },
};

const SHELL_SPRING = { type: "spring", stiffness: 260, damping: 28 };

const Navbar = () => {
  const router = useTransitionRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const pendingPath = useRef(null);

  function triggerPageTransition() {
    document.documentElement.animate(
      [
        { clipPath: "polygon(25% 75%, 75% 75%, 75% 75%, 25% 75%)" },
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)" },
      ],
      {
        duration: 2000,
        easing: "cubic-bezier(0.9, 0, 0.1, 1)",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  }

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleNavigation = (path) => (e) => {
    e.preventDefault();
    if (path === pathname) return;
    if (open) {
      pendingPath.current = path;
      setOpen(false);
    } else {
      router.push(path, { onTransitionReady: triggerPageTransition });
    }
  };

  const pageName = PAGE_NAMES[pathname] ?? "";
  const homepage = pathname === "/";
  if (homepage)
    return (
      <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50`}>check</div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.5, ease: "backIn" }}
      exit={{ opacity: 0 }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50`}
      // ${homepage && "hidden"}
    >
      <AnimatePresence>
        <motion.div
          initial={false}
          animate={open ? SHAPE.open : SHAPE.closed}
          transition={SHELL_SPRING}
          onAnimationComplete={() => {
            if (!open && pendingPath.current) {
              const path = pendingPath.current;
              pendingPath.current = null;
              router.push(path, { onTransitionReady: triggerPageTransition });
            }
          }}
          className={`relative overflow-hidden backdrop-blur-md bg-black/70 text-white ${open && "shadow-lg"} shadow-black/30 w-lg`}
        >
          {/* Logo — fixed position, always visible, never fades */}
          <Link
            href="/"
            onClick={handleNavigation("/")}
            className="absolute left-4 top-4 z-10"
          >
            <img src="/logo-white.svg" alt="Logo" className="w-10 h-auto" />
          </Link>

          {/* Page name — fades out when open */}
          <motion.span
            className="absolute left-1/2 -translate-x-1/2 top-4 text-sm font-bold whitespace-nowrap cursor-default"
            animate={{ opacity: open ? 0 : 1 }}
            transition={{ duration: 0.2, delay: open ? 0 : 0.25 }}
            style={{ pointerEvents: open ? "none" : "auto" }}
          >
            {pageName}
          </motion.span>

          {/* Nav links — fades in when open */}
          <motion.nav
            className="absolute inset-0 flex flex-col gap-3 pt-16 pl-5 pr-14 pb-6 bg-accent "
            animate={{ opacity: open ? 1 : 0 }}
            transition={{ duration: 0.2, delay: open ? 0.25 : 0 }}
            style={{ pointerEvents: open ? "auto" : "none" }}
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item.href}
                animate={{ opacity: open ? 1 : 0, x: open ? 0 : 12 }}
                transition={{
                  duration: 0.25,
                  delay: open ? 0.3 + i * 0.05 : 0,
                }}
              >
                <NavLink
                  href={item.href}
                  label={item.label}
                  onClick={handleNavigation(item.href)}
                  className="text-lg"
                />
              </motion.div>
            ))}
          </motion.nav>

          {/* Toggle — fixed position, only the bars morph */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="absolute top-4 right-4 w-5 h-5"
          >
            <motion.span
              className="absolute left-0 top-1/2 h-px w-5 bg-current"
              animate={{ y: open ? 0 : -6, rotate: open ? 45 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="absolute left-0 top-1/2 h-px w-5 bg-current"
              animate={{ opacity: open ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="absolute left-0 top-1/2 h-px w-5 bg-current"
              animate={{ y: open ? 0 : 6, rotate: open ? -45 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default Navbar;
