"use client";
import Image from "next/image";
import { useRevealer } from "@/hooks/useRevealer";

export default function Home() {
  useRevealer();

  return (
    <>
      <div className="revealer bg-[#AB5F4E]"></div>
      <main className="flex flex-col flex-1 items-center justify-center">
        <div className="h-screen border-2 border-amber-100 flex justify-center items-center">
          This is home
        </div>
        <div className="h-screen border-2 border-amber-100 flex justify-center items-center">
          This is section 1
        </div>
      </main>
    </>
  );
}
