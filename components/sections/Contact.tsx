"use client";

import { Mail, MessageCircle, Phone } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionGlow from "@/components/ui/SectionGlow";
import BentoCard from "@/components/ui/BentoCard";
import BorderGlow from "@/components/ui/BorderGlow";
import BlurText from "@/components/ui/BlurText";
import { profile } from "@/data/profile";

// 抖音风格音符图标
function DouyinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 19V6l12-3v11" />
      <circle cx="6" cy="19" r="3" />
      <circle cx="18" cy="14" r="3" />
    </svg>
  );
}

const iconMap: Record<string, React.ElementType> = {
  email: Mail,
  wechat: MessageCircle,
  douyin: DouyinIcon,
  phone: Phone,
};

const colorMap: Record<string, string> = {
  email: "group-hover:text-blue-400",
  wechat: "group-hover:text-green-400",
  douyin: "group-hover:text-pink-400",
  phone: "group-hover:text-cyan-400",
};

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-zinc-950/50 relative overflow-hidden">
      <SectionGlow variant="amber-rose" />
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection>
          <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
            04 / 联系
          </span>
          <BlurText as="h2" text="联系我" animateBy="words" direction="top" delay={150} className="text-3xl md:text-4xl font-bold mt-2" />
          <p className="text-zinc-500 mt-2">欢迎交流合作，一起探索 AI 的可能性</p>
          <div className="section-accent mt-4" />
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mt-14">
          {profile.socials.map((social, i) => {
            const Icon = (iconMap[social.icon] || Mail) as React.ComponentType<{ className?: string }>;
            const hasLink = social.url && social.url !== "#" && social.url !== "tel:#";
            const displayText = social.value || social.platform;

            const cardContent = (
              <BorderGlow
                backgroundColor="rgba(24,24,27,0.4)"
                glowColor="40 80 65"
                borderRadius={16}
                glowRadius={12}
                glowIntensity={0.4}
                colors={["#f59e0b", "#f97316", "#fbbf24"]}
                fillOpacity={0.12}
              >
                <div className="p-5 flex flex-col items-center justify-center gap-2 relative">
                  <Icon
                    className={`w-7 h-7 text-zinc-400 transition-colors group-hover:text-cyan-400 ${colorMap[social.icon] || ""}`}
                  />
                  <span className="text-sm text-zinc-400 group-hover:hidden transition-colors">
                    {social.platform}
                  </span>
                  <span className="hidden group-hover:block text-xs text-zinc-300 font-medium transition-all px-2 text-center leading-relaxed">
                    {displayText}
                  </span>
                </div>
              </BorderGlow>
            );

            return (
              <AnimatedSection key={social.platform} delay={i * 0.1}>
                <BentoCard className="rounded-xl group" glowColor="251, 191, 36">
                  {hasLink ? (
                    <a
                      href={social.url}
                      className="block no-underline"
                      target={social.platform === "邮箱" ? undefined : "_blank"}
                      rel="noopener noreferrer"
                    >
                      {cardContent}
                    </a>
                  ) : (
                    cardContent
                  )}
                </BentoCard>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
