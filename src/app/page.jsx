"use client";
import Image from "next/image";
import { useRevealer } from "@/hooks/useRevealer";
import HomeReveal from "@/components/ui/HomeReveal";
import Footer from "@/components/Footer";

export default function Home() {
  useRevealer();

  const hotspots = [
    { label: "Work", href: "/work", xPercent: 24, yPercent: 55 },
    { label: "About", href: "/about", xPercent: 55, yPercent: 30 },
    { label: "Contact", href: "/contact", xPercent: 82, yPercent: 62 },
  ];

  return (
    <>
      <div className="revealer bg-[#AB5F4E]" />
      <main className="flex justify-center items-center w-full h-screen">
        This is home
      </main>
      <Footer />
    </>
  );
}
