import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "楠洋 | AI 探索者 · 内容创作者",
  description:
    "全职探索AI与自媒体。分享AI工具链实践、内容创作心得。从非技术背景起步，搭建了以Claude Code为核心的AI创作系统。",
  openGraph: {
    title: "楠洋 | AI 探索者 · 内容创作者",
    description: "全职探索AI与自媒体。AI工具链实践、视频创作、内容写作。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <body className="min-h-screen bg-[#09090b] text-[#fafafa] antialiased">
        {children}
      </body>
    </html>
  );
}
