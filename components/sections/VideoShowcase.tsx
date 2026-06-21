"use client";

import { useState, useRef } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionGlow from "@/components/ui/SectionGlow";
import BentoCard from "@/components/ui/BentoCard";
import BorderGlow from "@/components/ui/BorderGlow";
import BlurText from "@/components/ui/BlurText";
import { videoCategories } from "@/data/videos";
import type { VideoWork } from "@/data/videos";

function VideoCard({
  video,
  index,
  large = false,
  onOpen,
}: {
  video: VideoWork;
  index: number;
  large?: boolean;
  onOpen: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const startPlay = () => {
    hoverTimer.current = setTimeout(() => {
      if (videoRef.current && video.videoUrl) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
    }, 300);
  };

  const stopPlay = () => {
    clearTimeout(hoverTimer.current);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      initial={{ opacity: 0, y: 40, scale: 0.93 }}
      viewport={{ once: false, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={startPlay}
      onMouseLeave={stopPlay}
      onClick={video.videoUrl ? onOpen : undefined}
      className={`${video.videoUrl ? "cursor-pointer" : ""} ${large ? "h-full" : ""}`}
    >
      <BentoCard className={`rounded-2xl ${large ? "h-full" : ""}`} glowColor="34, 211, 238">
        <BorderGlow
          className={large ? "h-full" : ""}
          backgroundColor="rgba(24,24,27,0.6)"
          glowColor="190 80 70"
          borderRadius={20}
          glowRadius={18}
          glowIntensity={0.55}
          colors={["#22d3ee", "#3b82f6", "#6366f1"]}
          fillOpacity={0.15}
        >
          <div className={`rounded-2xl overflow-hidden group transition-all duration-500 ${large ? "h-full" : ""}`}>
            <div className={`relative bg-zinc-900 ${large ? "h-full" : "aspect-video"}`}>
          {video.videoUrl ? (
            <>
              {video.cover && (
                <img src={video.cover} alt={video.title} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0" />
              )}
              <video
                ref={videoRef}
                src={video.videoUrl}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                muted loop preload="metadata" playsInline
              />
            </>
          ) : video.cover ? (
            <img src={video.cover} alt={video.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${video.gradient} flex items-center justify-center`}>
              <span className="text-5xl opacity-15">🎬</span>
            </div>
          )}

          {/* 编号 + 时长 — 始终显示 */}
          <div className="absolute top-3 left-3 px-2 py-0.5 text-[10px] rounded-md bg-black/60 text-zinc-400 backdrop-blur-sm font-mono pointer-events-none">
            {String(index + 1).padStart(2, "0")}
          </div>
          <div className="absolute top-3 right-3 px-2.5 py-1 text-[11px] rounded-full bg-black/70 text-white/80 backdrop-blur-sm border border-white/10 pointer-events-none font-mono">
            {video.duration}
          </div>

          {/* 信息浮层 — 仅 hover 显示 */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className={`absolute bottom-0 left-0 right-0 ${large ? "p-6" : "p-4"}`}>
              <h3 className={`font-bold text-white mb-1 tracking-wide ${large ? "text-xl" : "text-sm"}`}>
                {video.title}
              </h3>
              <p className={`text-zinc-300/70 leading-relaxed ${large ? "text-sm" : "text-[11px]"}`}>
                {video.description}
              </p>
            </div>
          </div>
          </div>
        </div>
        </BorderGlow>
      </BentoCard>
    </motion.div>
  );
}

// 放大预览弹窗
function VideoModal({
  video,
  onClose,
}: {
  video: VideoWork;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLVideoElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-xl p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", duration: 0.4 }}
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-zinc-400 hover:text-white transition-colors p-2"
        >
          <X size={28} />
        </button>

        {/* 视频 */}
        <video
          ref={modalRef}
          src={video.videoUrl}
          className="w-full rounded-2xl shadow-2xl"
          controls
          autoPlay
          playsInline
        />

        {/* 标题 */}
        <div className="mt-4 text-center">
          <h3 className="text-lg font-semibold text-white">{video.title}</h3>
          <p className="text-sm text-zinc-400 mt-1">{video.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function VideoShowcase() {
  const [activeTab, setActiveTab] = useState(videoCategories[0].id);
  const [modalVideo, setModalVideo] = useState<VideoWork | null>(null);
  const activeCategory = videoCategories.find((c) => c.id === activeTab)!;

  return (
    <section id="works" className="py-24 md:py-32 bg-zinc-950/50 relative overflow-hidden">
      <SectionGlow variant="cyan-blue" />
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection>
          <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
            02 / 创作
          </span>
        </AnimatedSection>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mt-2 mb-6">
          <div>
            <BlurText as="h2" text="视频作品" animateBy="words" direction="top" delay={150} className="text-3xl md:text-4xl font-bold" />
            <p className="text-zinc-500 mt-1 text-sm">
              AI 驱动的内容创作，涵盖数字人、短视频、商业交付
            </p>
          </div>

          <div className="flex gap-1.5 flex-shrink-0">
            {videoCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-1.5 ${
                  activeTab === cat.id
                    ? "bg-cyan-500/15 border border-cyan-500/30 text-cyan-400"
                    : "border border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700"
                }`}
              >
                <span className="text-base">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="section-accent mb-10" />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {activeCategory.videos.length >= 3 ? (
              /* 左大右二小布局 */
              <div className="grid md:grid-cols-2 gap-5">
                {/* 左边大正方形 */}
                <div className="md:row-span-2">
                  <VideoCard
                    video={activeCategory.videos[0]}
                    index={0}
                    large
                    onOpen={() => setModalVideo(activeCategory.videos[0])}
                  />
                </div>
                {/* 右边两个小正方形 */}
                <VideoCard
                  video={activeCategory.videos[1]}
                  index={1}
                  onOpen={() => setModalVideo(activeCategory.videos[1])}
                />
                <VideoCard
                  video={activeCategory.videos[2]}
                  index={2}
                  onOpen={() => setModalVideo(activeCategory.videos[2])}
                />
              </div>
            ) : (
              /* 作品不足3个时用普通网格 */
              <div className="grid md:grid-cols-2 gap-5">
                {activeCategory.videos.map((video, i) => (
                  <VideoCard
                    key={video.title}
                    video={video}
                    index={i}
                    onOpen={() => setModalVideo(video)}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 放大预览弹窗 */}
      <AnimatePresence>
        {modalVideo && (
          <VideoModal video={modalVideo} onClose={() => setModalVideo(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
