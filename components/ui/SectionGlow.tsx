"use client";

import { useEffect, useRef } from "react";

interface Props {
  variant?: "cyan-violet" | "cyan-blue" | "violet-pink" | "blue-cyan" | "amber-rose";
}

const variants = {
  "cyan-violet": ["bg-cyan-500/20", "bg-violet-500/20", "bg-cyan-400", "bg-violet-400"],
  "cyan-blue": ["bg-cyan-500/20", "bg-blue-500/20", "bg-cyan-400", "bg-blue-400"],
  "violet-pink": ["bg-violet-500/20", "bg-pink-500/20", "bg-violet-400", "bg-pink-400"],
  "blue-cyan": ["bg-blue-500/20", "bg-cyan-500/18", "bg-blue-400", "bg-cyan-400"],
  "amber-rose": ["bg-amber-500/18", "bg-rose-500/18", "bg-amber-400", "bg-rose-400"],
};

// 粒子数据
const PARTICLE_COUNT = 20;

export default function SectionGlow({ variant = "cyan-violet" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [c1, c2, p1, p2] = variants[variant];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles = container.querySelectorAll<HTMLElement>(".glow-particle");
    particles.forEach((p) => {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = 2 + Math.random() * 4;
      const duration = 6 + Math.random() * 10;
      const delay = Math.random() * 8;

      p.style.left = x + "%";
      p.style.top = y + "%";
      p.style.width = size + "px";
      p.style.height = size + "px";
      p.style.animationDuration = duration + "s";
      p.style.animationDelay = delay + "s";
    });
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* 呼吸光晕 1 - 右上 */}
      <div
        className={`absolute top-0 right-0 w-96 h-96 ${c1} rounded-full blur-3xl animate-breath`}
        style={{ transform: "translate(25%, -25%)" }}
      />

      {/* 呼吸光晕 2 - 左下 */}
      <div
        className={`absolute bottom-0 left-0 w-80 h-80 ${c2} rounded-full blur-3xl animate-breath-reverse`}
        style={{ transform: "translate(-25%, 25%)" }}
      />

      {/* 中心动态光源 */}
      <div
        className={`absolute top-1/2 left-1/2 w-64 h-64 ${c1} rounded-full blur-3xl animate-pulse-glow`}
        style={{ transform: "translate(-50%, -50%)" }}
      />

      {/* 浮动粒子 */}
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
        <div
          key={i}
          className={`glow-particle absolute rounded-full ${i % 2 === 0 ? p1 : p2} animate-float-particle`}
          style={{ opacity: 0 }}
        />
      ))}
    </div>
  );
}
