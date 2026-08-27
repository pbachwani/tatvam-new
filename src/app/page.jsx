"use client";

import { useRevealer } from "@/hooks/useRevealer";

import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import { useState, useSyncExternalStore } from "react";
import Hero from "@/components/Hero";
import HomeReveal from "@/components/ui/HomeReveal";

const subscribeToLoaderState = () => () => {};
const getLoaderState = () => !sessionStorage.getItem("hasShownLoader");
const getServerLoaderState = () => null;

export default function Home() {
  const shouldShowLoader = useSyncExternalStore(
    subscribeToLoaderState,
    getLoaderState,
    getServerLoaderState,
  );
  const [loaderCompleted, setLoaderCompleted] = useState(false);
  const loading = shouldShowLoader && !loaderCompleted;

  useRevealer(loading === false);

  const completeLoading = () => {
    sessionStorage.setItem("hasShownLoader", "true");
    setLoaderCompleted(true);
  };

  return (
    <>
      {loading && <Loader onComplete={completeLoading} />}
      <div className="revealer bg-[#AB5F4E]" />
      <HomeReveal
        src={"/homepage/line-sketch1.png"}
        hotspots={[
          { label: "Work", href: "/work", xPercent: 90, yPercent: 50 },
          { label: "About", href: "/about", xPercent: 61, yPercent: 32 },
          { label: "Contact", href: "/contact", xPercent: 25, yPercent: 52 },
        ]}
      />
      {/* <Hero /> */}

      {/* <Footer /> */}
    </>
  );
}
