export const sceneVariants = {
  initial: { opacity: 0, scale: 1.035, filter: "blur(10px)" },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.25, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.985,
    filter: "blur(8px)",
    transition: { duration: 0.95, ease: [0.76, 0, 0.24, 1] },
  },
};

export const revealUp = {
  initial: { opacity: 0, y: 38 },
  animate: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 1.05, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const slowZoom = {
  animate: {
    scale: [1, 1.065],
    transition: { duration: 7, ease: "easeInOut" },
  },
};
