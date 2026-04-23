"use client";
import { useEffect, useState } from "react";

type Props = {
  text: string;
  className?: string;
  speed?: number; // chars per second
};

function FancyTextComponent({ text, className, speed = 20 }: Props) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    setVisibleCount(0);
    if (!text) return;
    const interval = setInterval(() => {
      setVisibleCount((c) => {
        if (c < text.length) return c + 1;
        clearInterval(interval);
        return c;
      });
    }, 1000 / speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span
      className={className}
      style={{
        fontWeight: 500,
        fontSize: "2rem",
        letterSpacing: "0.0em",
        display: "inline-block",
        fontFamily: '"Segoe UI Variable", "Segoe UI", system-ui, sans-serif',
      }}
    >
      {text.split("").map((char, i) =>
        char === " " ? (
          <span
            key={i}
            style={{
              display: "inline-block",
              width: "0.2em",
              margin: "0 0.08em",
              opacity: i < visibleCount ? 1 : 0.2,
              transition: "opacity 0.2s"
            }}
          >
            &nbsp;
          </span>
        ) : (
          <span
            key={i}
            style={{
              opacity: i < visibleCount ? 1 : 0.2,
              transition: "opacity 0.2s, transform 0.2s",
              display: "inline-block",
              transform: i < visibleCount ? "scale(1)" : "scale(1.2)",
              color: i < visibleCount ? "var(--rose-400)" : undefined, // highlight visible chars
            }}
          >
            {char}
          </span>
        )
      )}
    </span>
  );
}

export { FancyTextComponent };