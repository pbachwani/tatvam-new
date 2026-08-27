"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { motion } from "motion/react";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Hotspot shape (for reference — plain JS, no enforcement):
// { label: string, href: string, xPercent: number, yPercent: number, className?: string }
// xPercent/yPercent are % positions relative to the illustration's own box.
// ---------------------------------------------------------------------------
// const hotspots = [
//   { label: "Work", href: "/work", xPercent: 50, yPercent: 50 },
//   { label: "About", href: "/about", xPercent: 55, yPercent: 30 },
//   { label: "Contact", href: "/contact", xPercent: 82, yPercent: 62 },
// ];

const SCALE = 1.4; // how zoomed-in the illustration is
const EASE = "power3"; // shared ease for mask + parallax (desktop)
const DURATION = 0.8; // shared lag duration (desktop)
const MASK_RADIUS = "clamp(320px, 30vw, 560px)";
const OVERLAY_COLOR = "#AB5F4E";

// Soft, long-fade glow (not a hard cut) — tune the % stops to taste
const MASK_GRADIENT = `radial-gradient(
  circle ${MASK_RADIUS} at var(--x) var(--y),
  transparent 5%,
  transparent 15%,
  #AB5F4E3f 25%,
  #AB5F4Eb2 55%,
  black 100%
)`;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function usePointerFine() {
  const [isFine, setIsFine] = useState(null); // null = unknown (SSR)

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setIsFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isFine;
}

function useBounds(containerRef) {
  const [bounds, setBounds] = useState({ x: 0, y: 0 });

  const recalc = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    setBounds({
      x: (width * SCALE - width) / 2,
      y: (height * SCALE - height) / 2,
    });
  }, [containerRef]);

  useEffect(() => {
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, [recalc]);

  return bounds;
}

function NavHotspots({ hotspots }) {
  const [hovered, setHovered] = useState(null);
  return (
    <nav aria-label="Primary">
      {hotspots.map((h) => (
        <a
          key={h.href}
          href={h.href}
          onMouseEnter={() => setHovered(h.href)}
          onMouseLeave={() => setHovered(null)}
          className={
            h.className ??
            "absolute -translate-x-1/2 -translate-y-1/2 text-sm text-black/90 hover:text-accent font-bold focus-visible:outline-2 hover:scale-110 focus-visible:outline-white transition-all duration-300 ease-out"
          }
          style={{ left: `${h.xPercent}%`, top: `${h.yPercent}%` }}
        >
          {h.label}
          {hovered && (
            <div className="absolute max-w-xl text-nowrap -translate-x-1/2 left-1/2 text-black">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Incidunt, dolore.
            </div>
          )}
        </a>
      ))}
    </nav>
  );
}

// ---------------------------------------------------------------------------
// Desktop: mouse-tracked mask + parallax pan
// ---------------------------------------------------------------------------

function DesktopReveal({ src, alt, hotspots }) {
  const containerRef = useRef(null);
  const artRef = useRef(null);
  const overlayRef = useRef(null);
  const bounds = useBounds(containerRef);
  const boundsRef = useRef(bounds);
  boundsRef.current = bounds;

  useEffect(() => {
    const container = containerRef.current;
    const art = artRef.current;
    const overlay = overlayRef.current;
    if (!container || !art || !overlay) return;

    const maskPos = { x: 0, y: 0 };
    const setMaskX = gsap.quickTo(maskPos, "x", {
      duration: DURATION,
      ease: EASE,
      onUpdate: () => overlay.style.setProperty("--x", maskPos.x + "px"),
    });
    const setMaskY = gsap.quickTo(maskPos, "y", {
      duration: DURATION,
      ease: EASE,
      onUpdate: () => overlay.style.setProperty("--y", maskPos.y + "px"),
    });

    const panSetX = gsap.quickTo(art, "x", { duration: DURATION, ease: EASE });
    const panSetY = gsap.quickTo(art, "y", { duration: DURATION, ease: EASE });

    const onMove = (e) => {
      const rect = container.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;

      setMaskX(px);
      setMaskY(py);

      const normX = px / rect.width - 0.5;
      const normY = py / rect.height - 0.5;

      panSetX(-normX * 2 * boundsRef.current.x);
      panSetY(-normY * 2 * boundsRef.current.y);
    };

    container.addEventListener("mousemove", onMove);
    return () => container.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-screen overflow-hidden bg-black"
    >
      <div
        ref={artRef}
        className="absolute inset-0"
        style={{ transform: `scale(${SCALE})`, willChange: "transform" }}
      >
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover pointer-events-none select-none"
          draggable={false}
        />
        <NavHotspots hotspots={hotspots} />
      </div>

      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundColor: OVERLAY_COLOR,
          WebkitMaskImage: MASK_GRADIENT,
          maskImage: MASK_GRADIENT,
          "--x": "50%",
          "--y": "50%",
        }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Mobile: no mask — illustration is draggable within the same zoom bounds
// ---------------------------------------------------------------------------

function MobileDrag({ src, alt, hotspots }) {
  const containerRef = useRef(null);
  const bounds = useBounds(containerRef);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-screen overflow-hidden"
    >
      <motion.div
        className="absolute inset-0"
        style={{ scale: SCALE }}
        drag
        dragConstraints={{
          left: -bounds.x,
          right: bounds.x,
          top: -bounds.y,
          bottom: bounds.y,
        }}
        dragElastic={0}
        dragTransition={{ power: 0.3, timeConstant: 200 }}
      >
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover pointer-events-none select-none"
          draggable={false}
        />
        <NavHotspots hotspots={hotspots} />
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Public component — picks a path once pointer capability is known
// ---------------------------------------------------------------------------

export default function HomeReveal({ src, alt = "", hotspots = [] }) {
  const isFinePointer = usePointerFine();

  // Avoid a flash of the wrong variant during hydration: render nothing
  // (or a plain static <img> if you'd rather have instant paint) until known.
  if (isFinePointer === null) {
    return (
      <div className="relative h-screen w-screen overflow-hidden bg-black">
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      </div>
    );
  }

  return isFinePointer ? (
    <DesktopReveal src={src} alt={alt} hotspots={hotspots} />
  ) : (
    <MobileDrag src={src} alt={alt} hotspots={hotspots} />
  );
}
