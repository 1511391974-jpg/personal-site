"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import VideoShowcase from "@/components/sections/VideoShowcase";
import Projects from "@/components/sections/Projects";
import Collaboration from "@/components/sections/Collaboration";
import Contact from "@/components/sections/Contact";
import CardNav from "@/components/layout/CardNav";
import Footer from "@/components/layout/Footer";
import Beams from "@/components/ui/Beams";
import BentoSpotlight from "@/components/ui/BentoSpotlight";
import BlurText from "@/components/ui/BlurText";
import { profile } from "@/data/profile";

function Splash({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      {/* Beams 动态光束背景 */}
      <div className="absolute inset-0">
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
        <div className="absolute inset-0 bg-zinc-950/80" />
      </div>

      {/* 内容 */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        className="relative z-10 text-center px-6 max-w-lg"
      >
        <p className="text-sm text-zinc-400 mb-4 tracking-wider">{profile.name}</p>

        <BlurText
          text={profile.title}
          animateBy="letters"
          direction="bottom"
          delay={80}
          stepDuration={0.4}
          autoTrigger
          spanClassName="text-gradient"
          className="text-5xl md:text-7xl font-black tracking-tight mb-6 justify-center"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex justify-center gap-3 mb-8"
        >
          {profile.badges.map((b) => (
            <span
              key={b}
              className="px-4 py-1.5 text-xs font-medium rounded-full border border-white/10 text-zinc-300 bg-white/5 backdrop-blur"
            >
              {b}
            </span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="text-zinc-400 text-sm md:text-base leading-relaxed mb-10 max-w-md mx-auto"
        >
          {profile.description}
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={onEnter}
          className="px-10 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold text-base hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/25"
        >
          进入主页
        </motion.button>
      </motion.div>
    </div>
  );
}

export default function Home() {
  const [entered, setEntered] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!entered && <Splash onEnter={() => setEntered(true)} />}
      </AnimatePresence>

      {entered && (
        <>
          <BentoSpotlight glowColor="34, 211, 238" radius={350} />
          <CardNav
            logoText="楠洋"
            items={[
              {
                label: "关于",
                bgColor: "#18181b",
                textColor: "#fafafa",
                links: [{ label: "个人详情", href: "#about", ariaLabel: "个人详情" }],
              },
              {
                label: "创作",
                bgColor: "#1c1917",
                textColor: "#fafafa",
                links: [
                  { label: "视频作品", href: "#works", ariaLabel: "视频作品" },
                  { label: "AI 项目", href: "#projects", ariaLabel: "AI 项目" },
                ],
              },
              {
                label: "联系",
                bgColor: "#18181b",
                textColor: "#fafafa",
                links: [
                  { label: "合作方向", href: "#collaboration", ariaLabel: "合作方向" },
                  { label: "联系我", href: "#contact", ariaLabel: "联系我" },
                ],
              },
            ]}
            baseColor="rgba(9,9,11,0.85)"
            menuColor="#a1a1aa"
            buttonText="返回顶部"
            buttonBgColor="#22d3ee"
            buttonTextColor="#09090b"
            ease="back.out(1.7)"
          />
          <main className="flex-1">
            <Hero />
            <About />
            <VideoShowcase />
            <Projects />
            <Collaboration />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
