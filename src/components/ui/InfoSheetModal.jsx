"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

export default function InfoSheetModal({
  isOpen,
  onClose,
  eyebrow,
  image,
  description,
}) {
  const backdropRef = useRef(null);
  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);
  const previouslyFocused = useRef(null);

  const handleClose = useCallback(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        onClose?.();
        if (previouslyFocused.current) previouslyFocused.current.focus();
      },
    });

    tl.to(panelRef.current, { yPercent: 100, duration: 0.5 }, 0).to(
      backdropRef.current,
      { opacity: 0, duration: 0.4 },
      0,
    );
  }, [onClose]);

  // Open animation + focus + scroll lock
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement;
    // lenis?.stop();

    gsap.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: "power3.out" },
    );
    gsap.fromTo(
      panelRef.current,
      { yPercent: 100 },
      { yPercent: 0, duration: 0.6, ease: "power3.out", delay: 0.05 },
    );

    closeBtnRef.current?.focus();

    return () => {};
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={backdropRef}
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm opacity-0 "
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={eyebrow}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-7xl min-h-[75vh] max-h-[80vh] overflow-y-auto bg-[#f2f2f0] px-8 py-10 sm:px-12 sm:py-14 "
        // translate-y-full
      >
        <button
          ref={closeBtnRef}
          onClick={handleClose}
          aria-label="Close"
          className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-black/5 hover:text-neutral-900"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M1 1L15 15M15 1L1 15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-12">
          <div className="order-1 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={eyebrow}
              className="max-h-[30vh] md:max-h-[50vh] w-auto object-contain"
            />
          </div>

          <div className="order-2 flex flex-col justify-center">
            <span className="mb-3 md:text-4xl font-medium tracking-wide text-[#a8563f] font-andale">
              {eyebrow}
            </span>
            <p className=" text-[15px] leading-relaxed text-neutral-700 sm:text-base text-justify">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
