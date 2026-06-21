# 个人网站搭建手册

基于本次项目的实战经验，从零到上线全流程。

## 技术栈

| 层 | 选型 | 原因 |
|---|------|------|
| 框架 | Next.js 16 | Vercel 原生支持，自动部署 |
| 动效 | React Bits | 开源，组件质量高，复制即用 |
| 样式 | Tailwind CSS | Next.js 自带，零配置 |
| 动画 | Framer Motion + GSAP | 页面过渡 + 复杂动画 |
| 部署 | Vercel | 连 GitHub 自动部署，免费 |

## 动效组件来源

- **React Bits**: https://reactbits.dev
- 分类: Text Animations / Backgrounds / Components / Animations
- 用法: 复制源码到 `components/ui/`，改一下就能用
- 注意: 复制时别忘了对应的 CSS 文件

## 项目结构

```
components/
  layout/    ← 导航、页脚
  sections/  ← 首页各区块 (Hero, About, ...)
  ui/        ← 通用动效组件 (从 React Bits 来)
data/        ← 个人信息、项目、视频数据
public/
  images/    ← 图片素材
  videos/    ← 视频素材 (压缩后)
```

## 视频处理

### 压缩命令 (ffmpeg)

```bash
# 标准压缩 (720p, 适合 50MB+ 的视频)
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset fast \
  -vf "scale=1280:-2" -c:a aac -b:a 96k \
  -movflags +faststart output.mp4

# 强力压缩 (适合 100MB+ 的视频)
ffmpeg -i input.mp4 -c:v libx264 -crf 30 -preset fast \
  -vf "scale=960:-2" -c:a aac -b:a 80k \
  -movflags +faststart output.mp4
```

### GitHub 限制

- 单个文件硬限制 100MB
- 建议控制在 50MB 以内
- 超出用 Vercel Blob 或其他 CDN

## Git 代理配置 (国内)

```bash
# 设置代理 (Clash 默认 7890, 按实际端口改)
git config --global http.proxy http://127.0.0.1:7897
git config --global https.proxy http://127.0.0.1:7897

# 取消代理
git config --global --unset http.proxy
git config --global --unset https.proxy

# 查看当前代理
git config --global --get http.proxy
```

## 部署流程

1. GitHub 建仓库 `git init && git add -A && git commit && git push`
2. 打开 [vercel.com](https://vercel.com)，GitHub 登录
3. Import → 选仓库 → 啥也不用改 → Deploy
4. 以后每次 `git push` 自动部署

## 常见踩坑

### Git push 超时/断连
→ 开梯子 + 配 Git 代理

### 视频 push 被拒
→ `remote: error: GH001: Large files detected`
→ 压缩视频到 50MB 以下，或从 Git 历史中删掉大文件

### Vercel 部署正常但国内打不开
→ `*.vercel.app` 被墙，绑定自定义域名解决

### 删除的文件还占着 Git 历史
→ `git rm --cached` 只删跟踪，不删本地文件
→ 从初始 commit 就排除大文件，别等后面补救

## 数据驱动模式

页面和数据分离，改内容不用动组件：

```
data/profile.ts   ← 个人信息、社交链接、平台
data/projects.ts  ← AI 项目列表
data/videos.ts    ← 视频作品分类
```

改网站内容只需编辑这三个文件，部署自动更新。
