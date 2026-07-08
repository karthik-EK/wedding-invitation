import React from "react";
import { motion } from "framer-motion";
import { sceneVariants } from "../animations/motion";

export default function SceneShell({ children, className = "" }) {
  return (
    <motion.section
      className={`scene ${className}`}
      variants={sceneVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.section>
  );
}
