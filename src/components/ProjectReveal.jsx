"use client";

import { useRevealer } from "@/hooks/useRevealer";

export default function ProjectReveal({ children }) {
  useRevealer();

  return (
    <>
      <div className="revealer bg-[#AB5F4E]" />
      {children}
    </>
  );
}
