import React from "react";
import { motion } from "framer-motion";
const petalCount = 34;
const dustCount = 46;

export function FallingPetals({ density = 1 }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: Math.round(petalCount * density) }).map((_, index) => {
        const left = (index * 31) % 100;
        const delay = (index % 11) * 0.42;
        const duration = 8 + (index % 7);
        const size = 8 + (index % 5) * 3;

        return (
          <motion.span
            className="petal"
            key={index}
            style={{ left: `${left}%`, width: size, height: size * 1.55 }}
            initial={{ y: "-14vh", x: 0, rotate: 0, opacity: 0 }}
            animate={{
              y: "114vh",
              x: [0, index % 2 ? 42 : -34, index % 3 ? -18 : 24],
              rotate: [0, 90, 210, 320],
              opacity: [0, 0.78, 0.72, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );
      })}
    </div>
  );
}

export function GoldDust({ density = 1 }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: Math.round(dustCount * density) }).map((_, index) => {
        const left = (index * 17) % 100;
        const top = (index * 29) % 100;
        const delay = (index % 9) * 0.35;
        const size = 2 + (index % 4);

        return (
          <motion.span
            className="gold-dust"
            key={index}
            style={{ left: `${left}%`, top: `${top}%`, width: size, height: size }}
            animate={{ opacity: [0.15, 0.95, 0.2], scale: [0.6, 1.55, 0.7], y: [0, -22, 0] }}
            transition={{ duration: 3.2 + (index % 5), delay, repeat: Infinity, ease: "easeInOut" }}
          />
        );
      })}
    </div>
  );
}

export function GoldShine() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 shine"
      initial={{ x: "-120%" }}
      animate={{ x: "120%" }}
      transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 2.4, ease: "easeInOut" }}
    />
  );
}

export function OrnateDivider({ className = "" }) {
  return (
    <div className={`ornate-divider ${className}`} aria-hidden="true">
      <span />
    </div>
  );
}
