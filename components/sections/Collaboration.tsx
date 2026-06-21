"use client";

import { Video, Megaphone, Code, Users } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionGlow from "@/components/ui/SectionGlow";
import BentoCard from "@/components/ui/BentoCard";
import BorderGlow from "@/components/ui/BorderGlow";
import BlurText from "@/components/ui/BlurText";

const collabItems = [
  {
    icon: Video,
    title: "视频制作",
    desc: "AI 数字人、短视频剪辑、宣传片制作",
    color: "text-violet-400",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/20",
  },
  {
    icon: Megaphone,
    title: "内容推广",
    desc: "抖音/B站/小红书多平台内容分发与运营",
    color: "text-pink-400",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/20",
  },
  {
    icon: Code,
    title: "AI 工具定制",
    desc: "Claude Code 调教、自动化工作流搭建",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
  },
  {
    icon: Users,
    title: "联合创作",
    desc: "AI 相关项目合作、知识付费产品共创",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
  },
];

function CollabCard({
  item,
  index,
}: {
  item: (typeof collabItems)[0];
  index: number;
}) {
  const Icon = item.icon;

  return (
    <AnimatedSection delay={index * 0.1}>
      <BentoCard className="rounded-2xl" glowColor="34, 211, 238">
        <BorderGlow
          backgroundColor="rgba(24,24,27,0.4)"
          glowColor="190 85 60"
          borderRadius={20}
          glowRadius={16}
          glowIntensity={0.55}
          colors={["#22d3ee", "#3b82f6", "#6366f1"]}
          fillOpacity={0.15}
          animated
        >
          <div className="p-6 group text-left h-full">
            <div
              className={`w-12 h-12 rounded-xl ${item.bgColor} border ${item.borderColor} flex items-center justify-center mb-4`}
            >
              <Icon className={`w-6 h-6 ${item.color}`} />
            </div>
            <h3 className="font-bold text-lg mb-2 group-hover:text-cyan-400 transition-colors">
              {item.title}
            </h3>
            <p className="text-sm text-zinc-400">{item.desc}</p>
          </div>
        </BorderGlow>
      </BentoCard>
    </AnimatedSection>
  );
}

export default function Collaboration() {
  return (
    <section id="collaboration" className="py-24 md:py-32 relative overflow-hidden">
      <SectionGlow variant="cyan-violet" />
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection>
          <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
            05 / 合作
          </span>
          <BlurText as="h2" text="合作方向" animateBy="words" direction="top" delay={150} className="text-3xl md:text-4xl font-bold mt-2" />
          <p className="text-zinc-500 mt-2">欢迎以下领域的合作邀约</p>
          <div className="section-accent mt-4" />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
          {collabItems.map((item, i) => (
            <CollabCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
