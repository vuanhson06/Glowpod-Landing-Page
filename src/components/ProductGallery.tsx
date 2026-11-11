"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Product } from "@/data/products";

type Item =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster: string; title: string };

export function ProductGallery({ product }: { product: Product }) {
  const items: Item[] = [
    { type: "image", ...product.image },
    ...product.gallery.map((g) => ({ type: "image" as const, ...g })),
    ...(product.video ? [{ type: "video" as const, ...product.video }] : []),
  ];
  const [active, setActive] = useState(0);
  const current = items[active] ?? items[0];
  const videoRef = useRef<HTMLVideoElement>(null);

  // The page stays mounted (hidden) after navigating away, so stop playback then.
  useEffect(() => {
    const video = videoRef.current;
    return () => video?.pause();
  }, [active]);

  return (
    <div className="h-fit">
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-rose-light">
        {current.type === "image" ? (
          <Image
            key={current.src}
            src={current.src}
            alt={current.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            loading={active === 0 ? "eager" : "lazy"}
            fetchPriority={active === 0 ? "high" : undefined}
          />
        ) : (
          <video
            ref={videoRef}
            key={current.src}
            src={current.src}
            poster={current.poster}
            title={current.title}
            aria-label={current.title}
            className="h-full w-full object-cover"
            controls
            autoPlay
            muted
            playsInline
            loop
            preload="metadata"
          />
        )}
      </div>

      <ul className="mt-4 grid grid-cols-7 gap-2" aria-label="Product photos and video">
        {items.map((item, i) => {
          const selected = i === active;
          const thumb = item.type === "image" ? item.src : item.poster;
          const label = item.type === "image" ? `Photo ${i + 1}: ${item.alt}` : `Video: ${item.title}`;
          return (
            <li key={item.src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={label}
                aria-current={selected}
                className={`relative block aspect-square w-full overflow-hidden rounded-xl bg-rose-light ring-2 transition ${
                  selected ? "ring-rose-dark" : "ring-transparent hover:ring-charcoal/20"
                }`}
              >
                <Image src={thumb} alt="" fill sizes="80px" className="object-cover" />
                {item.type === "video" && (
                  <span className="absolute inset-0 flex items-center justify-center bg-charcoal/25">
                    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
