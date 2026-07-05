"use client";
import DecryptedText from "@/components/ui/DecryptedText";
import { useRevealer } from "@/hooks/useRevealer";
import React from "react";

export default function AboutPage() {
  useRevealer();
  return (
    <>
      <div className="revealer"></div>
      <div className="w-full min-h-svh flex justify-center items-center">
        this is about
        <DecryptedText text={"Hello"} />
      </div>
    </>
  );
}
