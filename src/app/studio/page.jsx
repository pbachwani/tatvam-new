"use client";

// import HorizontalGallery from "@/components/ui/HorizontalGallery";
import { useRevealer } from "@/hooks/useRevealer";
import React from "react";
import { projects } from "../constants/projects";

export default function StudioPage() {
  useRevealer();
  return (
    <>
      <div className="revealer"></div>
      <div className="w-full min-h-svh flex justify-center items-center"></div>
    </>
  );
}
