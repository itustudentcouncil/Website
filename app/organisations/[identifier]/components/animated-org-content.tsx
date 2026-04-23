"use client";

import * as motion from "motion/react-client";
import { useEffect } from "react";
import type { ReactNode } from "react";

interface AnimatedOrgHeaderProps {
  title: string;
  badge?: ReactNode;
}

export function AnimatedOrgHeader({ title, badge }: AnimatedOrgHeaderProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 max-w-xl space-y-3">
      <motion.h1
        className="text-3xl md:text-5xl font-extrabold tracking-tight"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        {title}
      </motion.h1>
      {badge && (
        <motion.div
          className="inline-flex origin-left scale-125"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
        >
          {badge}
        </motion.div>
      )}
    </div>
  );
}

interface AnimatedOrgDescriptionProps {
  text: string;
}

export function AnimatedOrgDescription({ text }: AnimatedOrgDescriptionProps) {
  return (
    <motion.p
      className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
    >
      {text}
    </motion.p>
  );
}
