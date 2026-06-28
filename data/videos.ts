export interface VideoWork {
  title: string;
  description: string;
  duration: string;
  gradient: string;
  accentColor: string;
  videoUrl?: string;
  cover?: string;
}

export interface VideoCategory {
  id: string;
  label: string;
  icon: string;
  videos: VideoWork[];
}

export const videoCategories: VideoCategory[] = [
  {
    id: "ai",
    label: "AI 作品",
    icon: "🤖",
    videos: [
      {
        title: "AI 数字人演示",
        description: "Claude Code 驱动的本地数字人交互 Demo",
        duration: "3:24",
        gradient: "from-cyan-500/20 to-blue-500/20",
        accentColor: "group-hover:text-cyan-400",
        cover: "/personal-site/images/ai-cover.jpg",
      },
      {
        title: "AIGC 视频短片",
        description: "从剧本到成片全 AI 流程制作",
        duration: "5:12",
        gradient: "from-violet-500/20 to-pink-500/20",
        accentColor: "group-hover:text-violet-400",
        videoUrl: "/personal-site/videos/aigc-demo.mp4",
      },
      {
        title: "AI 音乐 MV",
        description: "Suno 生成音乐 + AI 画面合成",
        duration: "4:06",
        gradient: "from-blue-500/20 to-cyan-500/20",
        accentColor: "group-hover:text-blue-400",
      },
    ],
  },
  {
    id: "personal",
    label: "个人作品",
    icon: "🎬",
    videos: [
      {
        title: "日常剪辑",
        description: "生活记录向短视频，节奏感剪辑",
        duration: "2:15",
        gradient: "from-amber-500/20 to-orange-500/20",
        accentColor: "group-hover:text-amber-400",
        videoUrl: "/personal-site/videos/daily-edit.mp4",
      },
      {
        title: "旅游vlog",
        description: "旅行记录 · 生活向短视频剪辑",
        duration: "2:48",
        gradient: "from-green-500/20 to-emerald-500/20",
        accentColor: "group-hover:text-green-400",
        videoUrl: "/personal-site/videos/travel-vlog.mp4",
      },
      {
        title: "AI 工具测评",
        description: "主流 AI 工具上手体验与对比",
        duration: "6:30",
        gradient: "from-indigo-500/20 to-blue-500/20",
        accentColor: "group-hover:text-indigo-400",
      },
    ],
  },
  {
    id: "commercial",
    label: "商业作品",
    icon: "💼",
    videos: [
      {
        title: "文旅宣传片",
        description: "地方文旅宣传视频拍摄与后期制作",
        duration: "1:30",
        gradient: "from-rose-500/20 to-pink-500/20",
        accentColor: "group-hover:text-rose-400",
        videoUrl: "/personal-site/videos/travel-promo.mp4",
      },
      {
        title: "电商产品展示",
        description: "3C 产品 3D 展示动画 + 字幕包装",
        duration: "0:45",
        gradient: "from-sky-500/20 to-cyan-500/20",
        accentColor: "group-hover:text-sky-400",
      },
      {
        title: "课程视频后期",
        description: "知识付费课程视频剪辑 + 特效包装",
        duration: "15:00",
        gradient: "from-purple-500/20 to-violet-500/20",
        accentColor: "group-hover:text-purple-400",
      },
    ],
  },
];
