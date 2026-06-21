"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionGlow from "@/components/ui/SectionGlow";
import BentoCard from "@/components/ui/BentoCard";
import BorderGlow from "@/components/ui/BorderGlow";
import BlurText from "@/components/ui/BlurText";
import { projects } from "@/data/projects";

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const cardContent = (
    <BorderGlow
      backgroundColor="rgba(24,24,27,0.4)"
      glowColor="265 85 73"
      borderRadius={20}
      glowRadius={18}
      glowIntensity={0.6}
      colors={["#8b5cf6", "#a78bfa", "#22d3ee"]}
      fillOpacity={0.15}
      animated
    >
      <div className="p-6 group h-full">
        <div className="text-3xl mb-4">{project.icon}</div>
        <h3 className="font-bold text-lg mb-2 group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-zinc-400 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs rounded-md border border-zinc-700/50 bg-zinc-800/50 text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className={`text-xs ${project.statusColor}`}>{project.status}</span>
      </div>
    </BorderGlow>
  );

  return (
    <AnimatedSection delay={index * 0.1}>
      <BentoCard className="rounded-2xl" glowColor="139, 92, 246">
        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block no-underline"
          >
            {cardContent}
          </a>
        ) : (
          cardContent
        )}
      </BentoCard>
    </AnimatedSection>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden">
      <SectionGlow variant="violet-pink" />
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection>
          <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
            03 / AI 项目
          </span>
          <BlurText as="h2" text="AI 项目" animateBy="words" direction="top" delay={150} className="text-3xl md:text-4xl font-bold mt-2" />
          <p className="text-zinc-500 mt-2">独立完成的人工智能相关项目</p>
          <div className="section-accent mt-4" />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6 mt-14">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
