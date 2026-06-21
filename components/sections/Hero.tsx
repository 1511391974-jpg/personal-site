"use client";

import { useEffect, useRef } from "react";
import Badge from "@/components/ui/Badge";
import Beams from "@/components/ui/Beams";
import BlurText from "@/components/ui/BlurText";
import { profile } from "@/data/profile";

export default function Hero() {
  const glowRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  // 鼠标光晕
  useEffect(() => {
    const hero = heroRef.current;
    const glow = glowRef.current;
    if (!hero || !glow) return;
    let timeout: ReturnType<typeof setTimeout>;
    const onMove = (e: MouseEvent) => {
      glow.style.left = e.clientX + "px"; glow.style.top = e.clientY + "px"; glow.style.opacity = "1";
      clearTimeout(timeout); timeout = setTimeout(() => { glow.style.opacity = "0"; }, 1500);
    };
    const onLeave = () => { glow.style.opacity = "0"; };
    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    return () => { hero.removeEventListener("mousemove", onMove); hero.removeEventListener("mouseleave", onLeave); };
  }, []);

  const badgeVariants: Array<"cyan" | "violet" | "default"> = ["cyan", "violet", "default"];

  const cards = [...profile.platforms, ...profile.platforms];

  return (
    <section
      ref={heroRef}
      id="hero"
      className="min-h-screen flex items-center justify-center relative"
    >
      {/* Beams 动态光束背景 */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Beams
          beamWidth={3}
          beamHeight={18}
          beamNumber={20}
          lightColor="#22d3ee"
          speed={1.5}
          noiseIntensity={1.2}
          scale={0.25}
          rotation={15}
        />
        {/* 深色遮罩 */}
        <div className="absolute inset-0 bg-zinc-950/60" />
        {/* 网格纹理叠加 */}
        <div className="absolute inset-0 grid-bg opacity-30" />
      </div>

      <div ref={glowRef} className="mouse-glow" style={{ opacity: 0 }} />

      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute top-20 right-40 w-2 h-2 rounded-full bg-cyan-400/60 animate-float" />
      <div className="absolute bottom-40 left-32 w-1.5 h-1.5 rounded-full bg-violet-400/60 animate-float" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/3 left-1/4 w-1 h-1 rounded-full bg-blue-400/40 animate-float" style={{ animationDelay: "3s" }} />

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10 pt-16 pb-8">
        <p className="text-sm text-zinc-500 mb-3 animate-fade-in">{profile.name}</p>

        <BlurText
          text={profile.title}
          animateBy="letters"
          direction="top"
          delay={60}
          stepDuration={0.4}
          autoTrigger
          spanClassName="text-gradient"
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 justify-center"
        />

        <div className="flex justify-center gap-3 mb-6 animate-fade-up" style={{ animationDelay: "0.15s", opacity: 0 }}>
          {profile.badges.map((badge, i) => (
            <Badge key={badge} variant={badgeVariants[i]}>{badge}</Badge>
          ))}
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-950/60 backdrop-blur mb-8 animate-fade-up" style={{ animationDelay: "0.3s", opacity: 0 }}>
          <span className="relative flex h-2.5 w-2.5">
            <span className="status-dot absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
          </span>
          <span className="text-xs text-zinc-400">{profile.status}</span>
        </div>

        <p className="text-lg md:text-xl text-zinc-300 mb-3 animate-fade-up max-w-xl mx-auto leading-relaxed" style={{ animationDelay: "0.45s", opacity: 0 }}>
          {profile.tagline}
        </p>
        <p className="text-sm text-zinc-500 mb-12 animate-fade-up max-w-lg mx-auto leading-relaxed" style={{ animationDelay: "0.6s", opacity: 0 }}>
          {profile.description}
        </p>

        {/* 平台滚动 — 纯 CSS GPU 动画 */}
        <div className="mb-14 animate-fade-up overflow-hidden" style={{ animationDelay: "0.65s", opacity: 0 }}>
          <p className="text-xs text-zinc-600 mb-4 tracking-wider uppercase">
            — 作品发布平台 —
          </p>
          <div className="relative w-full overflow-hidden" style={{
            WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}>
            <div className="flex gap-[4.5rem] w-max animate-scroll" style={{ animationDuration: "30s" }}>
              {cards.map((p, i) => (
                <div key={`${p.name}-${i}`} className="w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10 bg-zinc-900/60">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover pointer-events-none" draggable={false} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.75s", opacity: 0 }}>
          <a href="#works" className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-semibold text-sm hover:opacity-90 transition-opacity no-underline">
            查看视频作品
          </a>
          <a href="#projects" className="px-6 py-3 rounded-xl border border-zinc-700 text-zinc-300 text-sm font-medium hover:border-cyan-500/50 hover:text-cyan-400 transition-all no-underline">
            AI 项目 →
          </a>
        </div>
      </div>
    </section>
  );
}
