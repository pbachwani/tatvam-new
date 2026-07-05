"use client";
import { useRevealer } from "@/hooks/useRevealer";
import React from "react";

export default function ContactPage() {
  useRevealer();
  return (
    <>
      <div className="revealer"></div>
      <div className="w-full min-h-svh flex justify-center items-center">
        page
      </div>
    </>
  );
}
