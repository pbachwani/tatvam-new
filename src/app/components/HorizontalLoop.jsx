"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const projects = [
  { id: 1, name: "Project 1", image: "/1.webp", slug: "/p1" },
  { id: 2, name: "Project 2", image: "/2.jpg", slug: "/p2" },
  { id: 3, name: "Project 3", image: "/3.webp", slug: "/p3" },
];

export default function HorizontalLoop({ lenis }) {
  const trackRef = useRef(null);

  useEffect(() => {
    if (!lenis) return;

    const track = trackRef.current;
    const totalWidth = track.scrollWidth / 2;

    const update = ({ scroll }) => {
      const x = -(scroll % totalWidth);
      track.style.transform = `translate3d(${x}px, 0, 0)`;
    };

    lenis.on("scroll", update);

    return () => {
      lenis.off("scroll", update);
    };
  }, [lenis]);

  const items = [...projects, ...projects];

  return (
    <section className="h-[200vh]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div ref={trackRef} className="flex gap-12 w-max px-10">
          {items.map((p, i) => (
            <Link key={i} href={p.slug} className="min-w-[320px] shrink-0">
              <div className="flex flex-col gap-3">
                <div className="h-[420px] overflow-hidden">
                  <img
                    src={p.image}
                    className="w-full h-full object-cover"
                    draggable="false"
                  />
                </div>

                <div className="flex justify-between text-sm">
                  <span>नाम</span>
                  <span className="truncate text-right">{p.name}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
