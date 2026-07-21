// "use client";

// import { motion } from "motion/react";
// import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
// import React from "react";
// import {
//   Autoplay,
//   EffectCoverflow,
//   Navigation,
//   Pagination,
// } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css/effect-coverflow";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import "swiper/css";
// import "swiper/css/effect-cards";

// import { cn } from "@/lib/utils";

// const SwipeGallery = ({ images }) => {
//   return (
//     <div className="flex h-full w-full items-center justify-end overflow-hidden">
//       <Carousel_003 className="" images={images} showPagination loop autoplay />
//     </div>
//   );
// };

// export { SwipeGallery };

// const Carousel_003 = ({
//   images,
//   className,
//   showPagination = false,
//   showNavigation = false,
//   loop = true,
//   autoplay = false,
//   spaceBetween = 0,
// }) => {
//   const css = `
//   .Carousal_003 {
//     width: 100%;
//     height: 500px;
//     padding-bottom: 50px !important;
//   }

//   .Carousal_003 .swiper-slide {
//     background-position: center;
//     background-size: cover;
//     width: 400px;
//   }

//   .swiper-pagination-bullet {
//     background-color: #000 !important;
//   }

// `;
//   return (
//     <motion.div
//       initial={{ opacity: 0, translateY: 20 }}
//       animate={{ opacity: 1, translateY: 0 }}
//       transition={{
//         duration: 0.3,
//         delay: 0.5,
//       }}
//       className={cn("relative w-full max-w-4xl px-5", className)}
//     >
//       <style>{css}</style>

//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.3 }}
//         className="w-full"
//       >
//         <Swiper
//           spaceBetween={spaceBetween}
//           autoplay={
//             autoplay
//               ? {
//                   delay: 1500,
//                   disableOnInteraction: true,
//                 }
//               : false
//           }
//           effect="coverflow"
//           grabCursor={true}
//           slidesPerView="auto"
//           centeredSlides={true}
//           loop={loop}
//           coverflowEffect={{
//             rotate: 40,
//             stretch: 0,
//             depth: 100,
//             modifier: 1,
//             slideShadows: true,
//           }}
//           pagination={
//             showPagination
//               ? {
//                   clickable: true,
//                 }
//               : false
//           }
//           navigation={
//             showNavigation
//               ? {
//                   nextEl: ".swiper-button-next",
//                   prevEl: ".swiper-button-prev",
//                 }
//               : false
//           }
//           className="Carousal_003"
//           modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
//         >
//           {images.map((image, index) => (
//             <SwiperSlide key={index} className="">
//               <img
//                 className="h-full w-full object-cover"
//                 src={image.src}
//                 alt={image.alt}
//               />
//             </SwiperSlide>
//           ))}
//           {showNavigation && (
//             <div>
//               <div className="swiper-button-next after:hidden">
//                 <ChevronRightIcon className="h-6 w-6 text-white" />
//               </div>
//               <div className="swiper-button-prev after:hidden">
//                 <ChevronLeftIcon className="h-6 w-6 text-white" />
//               </div>
//             </div>
//           )}
//         </Swiper>
//       </motion.div>
//     </motion.div>
//   );
// };

// export { Carousel_003 };

"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react";
import React from "react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/effect-cards";

import { cn } from "@/lib/utils";

const SwipeGallery = ({ images }) => {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden">
      <Carousel_003 className="" images={images} showPagination loop autoplay />
    </div>
  );
};

export { SwipeGallery };

const Carousel_003 = ({
  images,
  className,
  showPagination = false,
  showNavigation = false,
  loop = true,
  autoplay = false,
  spaceBetween = 0,
}) => {
  const [selected, setSelected] = React.useState(null); // index into `images`, or null when closed

  const isOpen = selected !== null;

  const close = React.useCallback(() => setSelected(null), []);
  const showPrev = React.useCallback(
    () => setSelected((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );
  const showNext = React.useCallback(
    () => setSelected((i) => (i + 1) % images.length),
    [images.length],
  );

  // Esc / arrow key navigation while modal is open
  React.useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close, showPrev, showNext]);

  // Lock body scroll while modal is open
  React.useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  const css = `
  .Carousal_003 {
    width: 100%;
    height: 450px;
    padding-bottom: 50px !important;
  }

  .Carousal_003 .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 350px;
  }

  .swiper-pagination-bullet {
    background-color: #000 !important;
  }

  /* lg and above */
  @media (min-width: 1024px) {
    .Carousal_003 {
      height: 800px;
    }

    .Carousal_003 .swiper-slide {
      width: 600px;
    }
  }
`;
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.5,
      }}
      className={cn("relative w-full max-w-4xl lg:max-w-7xl px-5", className)}
    >
      <style>{css}</style>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <Swiper
          spaceBetween={spaceBetween}
          autoplay={
            autoplay
              ? {
                  delay: 1500,
                  disableOnInteraction: true,
                }
              : false
          }
          effect="coverflow"
          grabCursor={true}
          slidesPerView="auto"
          centeredSlides={true}
          loop={loop}
          coverflowEffect={{
            rotate: 40,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={
            showPagination
              ? {
                  clickable: true,
                }
              : false
          }
          navigation={
            showNavigation
              ? {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }
              : false
          }
          className="Carousal_003"
          modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="">
              <motion.img
                layoutId={`carousel-image-${index}`}
                className="h-full w-full cursor-pointer object-cover"
                src={image.src}
                alt={image.alt}
                onClick={() => setSelected(index)}
              />
            </SwiperSlide>
          ))}
          {showNavigation && (
            <div>
              <div className="swiper-button-next after:hidden">
                <ChevronRightIcon className="h-6 w-6 text-white" />
              </div>
              <div className="swiper-button-prev after:hidden">
                <ChevronLeftIcon className="h-6 w-6 text-white" />
              </div>
            </div>
          )}
        </Swiper>
      </motion.div>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={close}
              className="absolute right-5 top-5 z-10 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
              aria-label="Close"
            >
              <XIcon className="h-6 w-6" />
            </button>

            {/* Prev arrow */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 sm:left-6"
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="h-7 w-7" />
            </button>

            {/* Next arrow */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 sm:right-6"
              aria-label="Next image"
            >
              <ChevronRightIcon className="h-7 w-7" />
            </button>

            {/* The morphing image itself — shares layoutId with the clicked slide image */}
            <motion.img
              key={selected}
              layoutId={`carousel-image-${selected}`}
              src={images[selected].src}
              alt={images[selected].alt}
              className="max-h-full max-w-full object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export { Carousel_003 };

/**
 * Skiper 49 Carousel_003 — React + Swiper
 * Built with Swiper.js - Read docs to learn more https://swiperjs.com/
 * Illustrations by AarzooAly - https://x.com/AarzooAly
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.me
 * Twitter: https://x.com/Gur__vi
 */
