export const easing = {
  smooth: [0.25, 0.46, 0.45, 0.94],
  smoothOut: [0.16, 1, 0.3, 1],
  smoothIn: [0.7, 0, 0.84, 0],
  sharp: [0.4, 0, 0.6, 1],
};

export const duration = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  verySlow: 1.2,
};

export const stagger = {
  sm: 0.05,
  md: 0.1,
  lg: 0.15,
};

export const viewport_config = {
  once: true,
  amount: 0.3,
};

export const fade_in_up = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
};

export const fade_in = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
};

export const scale_in = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
};

export const stagger_container = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};
