import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../lib/cn';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'none';
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  direction = 'up',
  className,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const offset = direction === 'up' ? 12 : direction === 'down' ? -12 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: offset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.38,
        delay: delay * 0.08,
        ease: [0.25, 1, 0.5, 1], // smooth ease-out
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};
