"use client";

import { ChevronDown } from "lucide-react";
import * as motion from "motion/react-client";

interface ReadMoreArrowProps {
  targetId: string;
}

export function ReadMoreArrow({ targetId }: ReadMoreArrowProps) {
  const handleClick = () => {
    const element = document.getElementById(targetId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 80;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className="flex flex-col items-center gap-2 cursor-pointer bg-transparent border-none p-0"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      aria-label="Scroll to next section"
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center gap-2"
      >
        <span className="text-lg font-semibold text-[#f37272]">Read More</span>
        <ChevronDown size={32} className="text-[#f37272]" />
      </motion.div>
    </motion.button>
  );
}
