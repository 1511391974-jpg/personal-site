"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down";
  delay?: number;
}

export default function AnimatedSection({
  children,
  className = "",
  direction = "up",
  delay = 0,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: direction === "up" ? 40 : -40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
