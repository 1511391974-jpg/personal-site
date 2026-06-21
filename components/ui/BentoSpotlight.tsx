"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75,
});

function updateCardGlow(card: Element, mx: number, my: number, glow: number, radius: number) {
  const rect = card.getBoundingClientRect();
  const rx = ((mx - rect.left) / rect.width) * 100;
  const ry = ((my - rect.top) / rect.height) * 100;
  (card as HTMLElement).style.setProperty("--bento-glow-x", `${rx}%`);
  (card as HTMLElement).style.setProperty("--bento-glow-y", `${ry}%`);
  (card as HTMLElement).style.setProperty("--bento-glow-intensity", glow.toString());
  (card as HTMLElement).style.setProperty("--bento-glow-radius", `${radius}px`);
}

export default function BentoSpotlight({
  enabled = true,
  radius = 300,
  glowColor = "34, 211, 238",
}: {
  enabled?: boolean;
  radius?: number;
  glowColor?: string;
}) {
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const spotlight = document.createElement("div");
    spotlight.className = "bento-spotlight";
    spotlight.style.cssText = `
      position: fixed;
      width: 800px; height: 800px;
      border-radius: 50%; pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.12) 0%, rgba(${glowColor}, 0.06) 15%,
        rgba(${glowColor}, 0.03) 25%, rgba(${glowColor}, 0.01) 40%, transparent 70%
      );
      z-index: 200; opacity: 0;
      transform: translate(-50%, -50%); mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const mm = (e: MouseEvent) => {
      if (!spotlightRef.current) return;
      const cards = document.querySelectorAll(".bento-card");
      const { proximity, fadeDistance } = calculateSpotlightValues(radius);
      let minDist = Infinity;

      cards.forEach((card) => {
        const r = card.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dist = Math.hypot(e.clientX - cx, e.clientY - cy) - Math.max(r.width, r.height) / 2;
        const ed = Math.max(0, dist);
        minDist = Math.min(minDist, ed);

        let intensity = 0;
        if (ed <= proximity) intensity = 1;
        else if (ed <= fadeDistance) intensity = (fadeDistance - ed) / (fadeDistance - proximity);
        updateCardGlow(card, e.clientX, e.clientY, intensity, radius);
      });

      gsap.to(spotlightRef.current, { left: e.clientX, top: e.clientY, duration: 0.1, ease: "power2.out" });

      const opacity =
        minDist <= proximity ? 0.8 : minDist <= fadeDistance ? ((fadeDistance - minDist) / (fadeDistance - proximity)) * 0.8 : 0;
      gsap.to(spotlightRef.current, { opacity, duration: opacity > 0 ? 0.2 : 0.5, ease: "power2.out" });
    };

    const ml = () => {
      document.querySelectorAll(".bento-card").forEach((card) => {
        (card as HTMLElement).style.setProperty("--bento-glow-intensity", "0");
      });
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3, ease: "power2.out" });
      }
    };

    document.addEventListener("mousemove", mm);
    document.addEventListener("mouseleave", ml);

    return () => {
      document.removeEventListener("mousemove", mm);
      document.removeEventListener("mouseleave", ml);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [enabled, radius, glowColor]);

  return null;
}
