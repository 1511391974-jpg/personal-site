export interface Project {
  title: string;
  description: string;
  tags: string[];
  status: string;
  statusColor: string;
  icon: string;
  link?: string;
}

export const projects: Project[] = [
  {
    title: "AI 数字人系统",
    description:
      "Claude Code 驱动，集成语音识别与合成，实现端到端本地数字人交互",
    tags: ["语音交互", "数字人", "本地部署"],
    status: "规划阶段",
    statusColor: "text-zinc-500",
    icon: "🎭",
  },
  {
    title: "cc-connect 消息桥",
    description:
      "微信/飞书 ↔ Claude Code 双向通道，手机随时随地操控 AI 助手",
    tags: ["实时通信", "WebSocket", "多平台"],
    status: "已上线",
    statusColor: "text-green-400",
    icon: "🔗",
  },
  {
    title: "AI 能力矩阵",
    description:
      "700+ Skills 审查编排，构建可自我进化的 AI 智能体能力体系",
    tags: ["Agent", "自进化", "编排"],
    status: "持续迭代",
    statusColor: "text-green-400",
    icon: "🧠",
  },
  {
    title: "AI 知识分享",
    description:
      "从零基础到深度使用，用自身实操经验制作 AI 工具教程内容",
    tags: ["教程", "内容创作", "知识付费"],
    status: "免费引流品",
    statusColor: "text-zinc-500",
    icon: "📖",
    link: "https://bytedance.feishu.cn/docx/JLCfdqTpSoZC1uxq1rIcy8hFngh",
  },
];
