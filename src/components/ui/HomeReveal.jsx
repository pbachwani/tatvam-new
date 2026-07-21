"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { motion } from "motion/react";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const SCALE = 1.25; // how zoomed-in the illustration is
const EASE = "power3"; // shared ease for mask + parallax (desktop)
const DURATION = 0.6; // shared lag duration (desktop)
const MASK_RADIUS = "clamp(320px, 30vw, 560px)";
const OVERLAY_COLOR = "#AB5F4Ed8";

// Soft, long-fade glow (not a hard cut) — tune the % stops to taste
const MASK_GRADIENT = `radial-gradient(
  circle ${MASK_RADIUS} at var(--x) var(--y),
  transparent 0%,
  transparent 15%,
  #AB5F4E3f 45%,
  #AB5F4Eb2 75%,
  black 100%
)`;

// ---------------------------------------------------------------------------
// Hotspot shape (for reference — plain JS, no enforcement):
// { label: string, href: string, xPercent: number, yPercent: number, className?: string }
// xPercent/yPercent are % positions relative to the illustration's own box.
// ---------------------------------------------------------------------------

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
  return (
    <nav aria-label="Primary">
      {hotspots.map((h) => (
        <a
          key={h.href}
          href={h.href}
          className={
            h.className ??
            "absolute -translate-x-1/2 -translate-y-1/2 text-sm font-medium text-black/90 hover:text-accent transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          }
          style={{ left: `${h.xPercent}%`, top: `${h.yPercent}%` }}
        >
          {h.label}
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

// "use client";

// import { useEffect, useRef, useState, useCallback } from "react";
// import gsap from "gsap";
// import { motion } from "motion/react";

// // ---------------------------------------------------------------------------
// // Config
// // ---------------------------------------------------------------------------

// const SCALE = 1.25; // how zoomed-in the illustration is
// const EASE = "power3"; // shared ease for mask + parallax (desktop)
// const DURATION = 0.6; // shared lag duration (desktop)
// const OVERLAY_COLOR = "rgba(10, 10, 10, 0.85)";

// // How big the blob reveal renders on screen. Responsive via clamp, same idea
// // as the old MASK_RADIUS.
// const BLOB_SIZE = "clamp(420px, 40vw, 720px)";

// // A deterministic, hand-drawn-feeling blob (generated once via a Catmull-Rom
// // spline through varied-radius points, with a soft Gaussian blur baked into
// // the SVG itself for a feathered edge). It's a static shape — not
// // recalculated per frame — so it's cheap: only its *position* animates,
// // via mask-position, the same way you'd animate a background-image.
// const BLOB_MASK_URI =
//   "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20600%20600%22%3E%0A%3Cdefs%3E%0A%3Cfilter%20id%3D%22soften%22%3E%3CfeGaussianBlur%20stdDeviation%3D%2222%22/%3E%3C/filter%3E%0A%3Cmask%20id%3D%22cut%22%3E%0A%3Crect%20width%3D%22600%22%20height%3D%22600%22%20fill%3D%22white%22/%3E%0A%3Cpath%20d%3D%22M%20550.00%2C300.00%20C%20548.12%2C331.64%20505.07%2C357.02%20491.46%2C392.20%20C%20477.85%2C427.38%20491.91%2C489.90%20468.34%2C511.09%20C%20444.78%2C532.29%20388.79%2C507.83%20350.07%2C519.36%20C%20311.35%2C530.89%20265.15%2C590.79%20236.03%2C580.29%20C%20206.90%2C569.79%20204.06%2C484.10%20175.30%2C456.37%20C%20146.55%2C428.63%2081.05%2C439.96%2063.50%2C413.89%20C%2045.95%2C387.83%2071.88%2C338.87%2070.00%2C300.00%20C%2068.12%2C261.13%2036.76%2C209.35%2052.23%2C180.68%20C%2067.71%2C152.01%20130.81%2C148.73%20162.83%2C128.00%20C%20194.85%2C107.26%20212.70%2C66.19%20244.37%2C56.27%20C%20276.04%2C46.34%20316.04%2C62.36%20352.85%2C68.45%20C%20389.66%2C74.55%20440.25%2C70.49%20465.22%2C92.81%20C%20490.20%2C115.13%20488.59%2C167.85%20502.72%2C202.38%20C%20516.85%2C236.91%20551.88%2C268.36%20550.00%2C300.00%20Z%22%20fill%3D%22black%22%20filter%3D%22url%28%2523soften%29%22/%3E%0A%3C/mask%3E%0A%3C/defs%3E%0A%3Crect%20width%3D%22600%22%20height%3D%22600%22%20fill%3D%22white%22%20mask%3D%22url%28%2523cut%29%22/%3E%0A%3C/svg%3E";

// // ---------------------------------------------------------------------------
// // Hotspot shape (for reference — plain JS, no enforcement):
// // { label: string, href: string, xPercent: number, yPercent: number, className?: string }
// // xPercent/yPercent are % positions relative to the illustration's own box.
// // ---------------------------------------------------------------------------

// // ---------------------------------------------------------------------------
// // Helpers
// // ---------------------------------------------------------------------------

// function usePointerFine() {
//   const [isFine, setIsFine] = useState(null); // null = unknown (SSR)

//   useEffect(() => {
//     const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
//     const update = () => setIsFine(mq.matches);
//     update();
//     mq.addEventListener("change", update);
//     return () => mq.removeEventListener("change", update);
//   }, []);

//   return isFine;
// }

// function useBounds(containerRef) {
//   const [bounds, setBounds] = useState({ x: 0, y: 0 });

//   const recalc = useCallback(() => {
//     const el = containerRef.current;
//     if (!el) return;
//     const { width, height } = el.getBoundingClientRect();
//     setBounds({
//       x: (width * SCALE - width) / 2,
//       y: (height * SCALE - height) / 2,
//     });
//   }, [containerRef]);

//   useEffect(() => {
//     recalc();
//     window.addEventListener("resize", recalc);
//     return () => window.removeEventListener("resize", recalc);
//   }, [recalc]);

//   return bounds;
// }

// function NavHotspots({ hotspots }) {
//   return (
//     <nav aria-label="Primary">
//       {hotspots.map((h) => (
//         <a
//           key={h.href}
//           href={h.href}
//           className={
//             h.className ??
//             "absolute -translate-x-1/2 -translate-y-1/2 text-sm font-medium text-white/90 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
//           }
//           style={{ left: `${h.xPercent}%`, top: `${h.yPercent}%` }}
//         >
//           {h.label}
//         </a>
//       ))}
//     </nav>
//   );
// }

// // ---------------------------------------------------------------------------
// // Desktop: mouse-tracked mask + parallax pan
// // ---------------------------------------------------------------------------

// function DesktopReveal({ src, alt, hotspots }) {
//   const containerRef = useRef(null);
//   const artRef = useRef(null);
//   const overlayRef = useRef(null);
//   const bounds = useBounds(containerRef);
//   const boundsRef = useRef(bounds);
//   boundsRef.current = bounds;

//   useEffect(() => {
//     const container = containerRef.current;
//     const art = artRef.current;
//     if (!container || !art) return;

//     // --x / --y live on the container so the mask overlay can read the
//     // cursor position via var(--x)/var(--y).
//     const maskPos = { x: 0, y: 0 };
//     const setMaskX = gsap.quickTo(maskPos, "x", {
//       duration: DURATION,
//       ease: EASE,
//       onUpdate: () => container.style.setProperty("--x", maskPos.x + "px"),
//     });
//     const setMaskY = gsap.quickTo(maskPos, "y", {
//       duration: DURATION,
//       ease: EASE,
//       onUpdate: () => container.style.setProperty("--y", maskPos.y + "px"),
//     });

//     const panSetX = gsap.quickTo(art, "x", { duration: DURATION, ease: EASE });
//     const panSetY = gsap.quickTo(art, "y", { duration: DURATION, ease: EASE });

//     const onMove = (e) => {
//       const rect = container.getBoundingClientRect();
//       const px = e.clientX - rect.left;
//       const py = e.clientY - rect.top;

//       setMaskX(px);
//       setMaskY(py);

//       const normX = px / rect.width - 0.5;
//       const normY = py / rect.height - 0.5;

//       panSetX(-normX * 2 * boundsRef.current.x);
//       panSetY(-normY * 2 * boundsRef.current.y);
//     };

//     container.addEventListener("mousemove", onMove);

//     // Subtle idle wobble so the blob doesn't feel perfectly rigid while it
//     // tracks the cursor. Anchored to the live cursor position (not the
//     // element's own center) so it breathes in place instead of orbiting the
//     // screen. Runs independently of the position tween above.
//     const overlay = overlayRef.current;
//     let wobble;
//     if (overlay) {
//       overlay.style.transformOrigin = "var(--x) var(--y)";
//       wobble = gsap.to(overlay, {
//         rotation: 5,
//         scale: 1.035,
//         duration: 5.5,
//         ease: "sine.inOut",
//         yoyo: true,
//         repeat: -1,
//       });
//     }

//     return () => {
//       container.removeEventListener("mousemove", onMove);
//       wobble?.kill();
//     };
//   }, []);

//   return (
//     <div
//       ref={containerRef}
//       className="relative h-screen w-screen overflow-hidden bg-black"
//       style={{ "--x": "50%", "--y": "50%" }}
//     >
//       <div
//         ref={artRef}
//         className="absolute inset-0"
//         style={{ transform: `scale(${SCALE})`, willChange: "transform" }}
//       >
//         <img
//           src={src}
//           alt={alt}
//           className="h-full w-full object-cover pointer-events-none select-none"
//           draggable={false}
//         />
//         <NavHotspots hotspots={hotspots} />
//       </div>

//       {/* Reveal — a static blob shape, positioned at the cursor. The mask
//           image is opaque (white) everywhere except inside the blob, where
//           it's transparent — so the overlay color covers the illustration
//           everywhere except inside that moving hole. */}
//       <div
//         ref={overlayRef}
//         className="pointer-events-none absolute inset-0"
//         style={{
//           backgroundColor: OVERLAY_COLOR,
//           WebkitMaskImage: `url("${BLOB_MASK_URI}")`,
//           maskImage: `url("${BLOB_MASK_URI}")`,
//           WebkitMaskRepeat: "no-repeat",
//           maskRepeat: "no-repeat",
//           WebkitMaskSize: `${BLOB_SIZE} ${BLOB_SIZE}`,
//           maskSize: `${BLOB_SIZE} ${BLOB_SIZE}`,
//           WebkitMaskMode: "alpha",
//           maskMode: "alpha",
//           // mask-position places the blob's top-left corner; offset by half
//           // its size so it's centered on the cursor instead.
//           WebkitMaskPosition: `calc(var(--x) - (${BLOB_SIZE}) / 2) calc(var(--y) - (${BLOB_SIZE}) / 2)`,
//           maskPosition: `calc(var(--x) - (${BLOB_SIZE}) / 2) calc(var(--y) - (${BLOB_SIZE}) / 2)`,
//         }}
//       />
//     </div>
//   );
// }

// // ---------------------------------------------------------------------------
// // Mobile: no mask — illustration is draggable within the same zoom bounds
// // ---------------------------------------------------------------------------

// function MobileDrag({ src, alt, hotspots }) {
//   const containerRef = useRef(null);
//   const bounds = useBounds(containerRef);

//   return (
//     <div
//       ref={containerRef}
//       className="relative h-screen w-screen overflow-hidden"
//     >
//       <motion.div
//         className="absolute inset-0"
//         style={{ scale: SCALE }}
//         drag
//         dragConstraints={{
//           left: -bounds.x,
//           right: bounds.x,
//           top: -bounds.y,
//           bottom: bounds.y,
//         }}
//         dragElastic={0}
//         dragTransition={{ power: 0.3, timeConstant: 200 }}
//       >
//         <img
//           src={src}
//           alt={alt}
//           className="h-full w-full object-cover pointer-events-none select-none"
//           draggable={false}
//         />
//         <NavHotspots hotspots={hotspots} />
//       </motion.div>
//     </div>
//   );
// }

// // ---------------------------------------------------------------------------
// // Public component — picks a path once pointer capability is known
// // ---------------------------------------------------------------------------

// export default function HomeReveal({ src, alt = "", hotspots = [] }) {
//   const isFinePointer = usePointerFine();

//   // Avoid a flash of the wrong variant during hydration: render nothing
//   // (or a plain static <img> if you'd rather have instant paint) until known.
//   if (isFinePointer === null) {
//     return (
//       <div className="relative h-screen w-screen overflow-hidden bg-black">
//         <img src={src} alt={alt} className="h-full w-full object-cover" />
//       </div>
//     );
//   }

//   return isFinePointer ? (
//     <DesktopReveal src={src} alt={alt} hotspots={hotspots} />
//   ) : (
//     <MobileDrag src={src} alt={alt} hotspots={hotspots} />
//   );
// }
