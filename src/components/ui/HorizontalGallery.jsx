// "use client";

// import { motion, useScroll, useTransform } from "motion/react";
// import { useEffect, useRef, useState } from "react";
// import { useMediaQuery } from "react-responsive";

// // images: [{ src, height }] — height is vh (e.g. height: 80 -> 80vh tall,
// // width auto so each image keeps its natural aspect ratio).
// export default function HorizontalGallery({ images }) {
//   const containerRef = useRef(null);
//   const trackRef = useRef(null);
//   const [distance, setDistance] = useState(0);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"],
//   });
//   const isMobile = useMediaQuery({
//     query: "(min-width: 1024px)",
//   });
//   const heightChange = isMobile ? 20 : 10;
//   const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

//   useEffect(() => {
//     const track = trackRef.current;
//     if (!track) return;

//     const measure = () => setDistance(track.scrollWidth - window.innerWidth);

//     // Widths depend on each image's natural aspect ratio, which isn't
//     // known until the image actually loads — measure only once every
//     // image has reported in, otherwise distance comes out too small.
//     const imgs = Array.from(track.querySelectorAll("img"));
//     const ready = imgs.map(
//       (img) =>
//         new Promise((resolve) => {
//           if (img.complete) resolve();
//           else img.addEventListener("load", resolve, { once: true });
//         }),
//     );
//     Promise.all(ready).then(measure);

//     window.addEventListener("resize", measure);
//     return () => window.removeEventListener("resize", measure);
//   }, [images]);

//   return (
//     <div ref={containerRef} className="relative" style={{ height: "800vh" }}>
//       <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
//         <motion.div
//           ref={trackRef}
//           className="flex gap-4 will-change-transform items-end mx-[50svh] pr-[50vh]"
//           style={{ x }}
//         >
//           {images.map((img, i) => (
//             <div
//               key={img.src + i}
//               className={`relative shrink-0 overflow-hidden`}
//               style={{ height: `${img.height - heightChange}vh` }}
//             >
//               <img
//                 onClick={() => console.log("img clicked")}
//                 src={img.src}
//                 alt=""
//                 className="h-full w-auto object-cover select-none"
//                 draggable={false}
//               />
//             </div>
//           ))}
//           <div className="w-[50vw] h-full"></div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

// images: [{ src, height }] — height is vh (e.g. height: 80 -> 80vh tall,
// width auto so each image keeps its natural aspect ratio).
export default function HorizontalGallery({ images }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const isMobile = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const heightChange = isMobile ? 20 : 10;
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => setDistance(track.scrollWidth - window.innerWidth);

    // Widths depend on each image's natural aspect ratio, which isn't
    // known until the image actually loads — measure only once every
    // image has reported in, otherwise distance comes out too small.
    const imgs = Array.from(track.querySelectorAll("img"));
    const ready = imgs.map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete) resolve();
          else img.addEventListener("load", resolve, { once: true });
        }),
    );
    Promise.all(ready).then(measure);

    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [images]);

  return (
    <div ref={containerRef} className="relative" style={{ height: "800vh" }}>
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <motion.div
          ref={trackRef}
          className="flex gap-4 will-change-transform items-end mx-[50svh] pr-[50vh]"
          style={{ x }}
        >
          {images.map((img, i) => (
            <div
              key={img.src + i}
              className={`relative shrink-0 overflow-hidden`}
              // style={{ height: `${img.height - heightChange}vh` }}
            >
              <img
                onClick={() => console.log("img clicked")}
                src={img.src}
                alt=""
                className="h-80 w-auto object-cover select-none"
                draggable={false}
              />
            </div>
          ))}
          <div className="w-[50vw] h-full"></div>
        </motion.div>
      </div>
    </div>
  );
}
