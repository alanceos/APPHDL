import { Variants } from 'framer-motion';

// Fade in animation
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 1.2, 
      ease: 'easeOut' 
    }
  }
};

// Fade in up animation
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: 'easeOut' 
    }
  }
};

// Stagger children animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Scale in animation
export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: [0.16, 1, 0.3, 1] 
    }
  }
};

// Line draw animation
export const drawLine: Variants = {
  hidden: { 
    pathLength: 0, 
    opacity: 0 
  },
  visible: { 
    pathLength: 1, 
    opacity: 1,
    transition: { 
      pathLength: { type: "spring", duration: 1.5, bounce: 0 },
      opacity: { duration: 0.3 }
    }
  }
};

// Hover animation for cards
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.3 }
};

// Button hover animation
export const buttonHover = {
  scale: 1.05,
  backgroundColor: "#C7B07B",
  color: "#2C1810",
  transition: {
    duration: 0.3,
    ease: "easeInOut"
  }
};
