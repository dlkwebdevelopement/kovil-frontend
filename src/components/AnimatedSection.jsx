import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedSection = ({ children, className = "", delay = 0, yOffset = 30, duration = 0.5, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer = ({ children, className = "", delayChildren = 0.05, staggerChildren = 0.05, ...props }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileInView="visible"
      viewport={{ once: true, margin: "0px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren,
            staggerChildren,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className = "", yOffset = 20, ...props }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: yOffset },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.4, ease: "easeOut" }
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

