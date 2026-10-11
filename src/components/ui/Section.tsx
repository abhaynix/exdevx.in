import React from 'react';
import { cn } from '../../lib/cn';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  tone?: 'default' | 'surface' | 'dark';
  className?: string;
  id?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  tone = 'default',
  className,
  id,
  ...props
}) => {
  const toneClasses = {
    default: 'bg-[var(--bg)] text-[var(--text)]',
    surface: 'bg-[var(--surface)] text-[var(--text)] border-y border-[var(--text)]/5',
    dark: 'bg-[var(--dark)] text-[var(--bg)]',
  };

  return (
    <section
      id={id}
      className={cn('py-16 sm:py-24 transition-colors', toneClasses[tone], className)}
      {...props}
    >
      {children}
    </section>
  );
};
