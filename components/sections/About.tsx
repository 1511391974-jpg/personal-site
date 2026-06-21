"use client";

import { useEffect, useRef, useState } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionGlow from "@/components/ui/SectionGlow";
import BentoCard from "@/components/ui/BentoCard";
import BorderGlow from "@/components/ui/BorderGlow";
import BlurText from "@/components/ui/BlurText";
import { profile } from "@/data/profile";

export default function About() {
  const [counted, setCounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted) {
          setCounted(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [counted]);

  return (
    <section ref={sectionRef} id="about" className="py-24 md:py-32 relative overflow-hidden">
      <SectionGlow variant="cyan-violet" />
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection>
          <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
            01 / 关于
          </span>
          <BlurText as="h2" text="个人详情" animateBy="words" direction="top" delay={150} className="text-3xl md:text-4xl font-bold mt-2" />
          <div className="section-accent mt-4" />
        </AnimatedSection>

        <div className="grid md:grid-cols-5 gap-12 items-start mt-14">
          {/* 头像 */}
          <AnimatedSection className="md:col-span-2 flex justify-center" delay={0.1}>
            <div
              className="w-48 h-48 md:w-56 md:h-56 rounded-2xl border border-white/10 overflow-hidden flex-shrink-0"
              style={{ boxShadow: "0 0 40px rgba(34,211,238,0.08)" }}
            >
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </div>
          </AnimatedSection>

          {/* 文字 */}
          <div className="md:col-span-3 space-y-5 text-zinc-400 leading-relaxed">
            {profile.bio.map((paragraph, i) => (
              <AnimatedSection key={i} delay={0.15 + i * 0.1}>
                <p className={i === 0 ? "text-lg text-zinc-200 font-medium" : ""}>
                  {paragraph}
                </p>
              </AnimatedSection>
            ))}

            {/* 数据亮点 */}
            <AnimatedSection delay={0.5}>
              <div className="grid grid-cols-3 gap-4 pt-6">
                {profile.highlights.map((h) => (
                  <BentoCard key={h.label} className="rounded-xl" glowColor="34, 211, 238">
                    <BorderGlow
                      backgroundColor="rgba(24,24,27,0.4)"
                      glowColor="190 80 70"
                      borderRadius={16}
                      glowRadius={14}
                      glowIntensity={0.5}
                      colors={["#22d3ee", "#3b82f6", "#6366f1"]}
                      fillOpacity={0.15}
                      animated
                    >
                      <div className="p-4 text-center h-full">
                        <div className="text-2xl font-bold text-cyan-400">
                          <CountUp target={h.value} start={counted} />
                        </div>
                        <div className="text-xs text-zinc-500 mt-1">{h.label}</div>
                      </div>
                    </BorderGlow>
                  </BentoCard>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}

function CountUp({ target, start }: { target: string; start: boolean }) {
  const [display, setDisplay] = useState("0");
  const numTarget = parseInt(target);

  useEffect(() => {
    if (!start) return;
    const duration = 1200;
    const t0 = performance.now();

    function tick(now: number) {
      const elapsed = now - t0;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(eased * numTarget);
      setDisplay(String(current));
      if (progress < 1) requestAnimationFrame(tick);
      else setDisplay(String(numTarget));
    }
    requestAnimationFrame(tick);
  }, [start, numTarget]);

  return <span>{display}</span>;
}
