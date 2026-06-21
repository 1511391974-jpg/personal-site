interface Props {
  children: string;
  variant?: "cyan" | "violet" | "blue" | "default";
}

const variants = {
  cyan: "border-cyan-500/30 text-cyan-400 bg-cyan-500/5",
  violet: "border-violet-500/30 text-violet-400 bg-violet-500/5",
  blue: "border-blue-500/30 text-blue-400 bg-blue-500/5",
  default: "border-zinc-700 text-zinc-400 bg-zinc-800/50",
};

export default function Badge({ children, variant = "default" }: Props) {
  return (
    <span
      className={`px-4 py-1.5 text-xs font-medium rounded-full border ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
