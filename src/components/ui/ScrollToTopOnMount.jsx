"use client";

import { useEffect } from "react";
import { useLenis } from "@/components/LenisProvider";

export default function ScrollToTopOnMount() {
  const lenisRef = useLenis();

  useEffect(() => {
    const id = setTimeout(() => {
      lenisRef?.current?.scrollTo(0, { immediate: true });
    }, 0); // defers until after current render cycle

    return () => clearTimeout(id);
  }, [lenisRef]);

  return null;
}
