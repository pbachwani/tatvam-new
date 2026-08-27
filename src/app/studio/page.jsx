"use client";

// import HorizontalGallery from "@/components/ui/HorizontalGallery";
import { useRevealer } from "@/hooks/useRevealer";
import React from "react";
import { projects } from "../constants/projects";
import HomeReveal from "@/components/ui/HomeReveal";

export default function StudioPage() {
  useRevealer();
  return (
    <>
      <div className="revealer"></div>
      <main className="min-h-screen w-full">This is Studio</main>
    </>
  );
}
