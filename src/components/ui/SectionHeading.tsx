import React from 'react';
import { cn } from '../../lib/cn';

interface SectionHeadingProps {
  tag?: string;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  tag,
  title,
  description,
  align = 'left',
  tone = 'light',
  className,
}) => {
  const isDark = tone === 'dark';

  return (
    <div
      className={cn(
        'max-w-3xl mb-12 sm:mb-16',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {tag && (
        <div
          className={cn(
            'text-xs font-mono tracking-widest uppercase mb-3 font-semibold',
            isDark ? 'text-[var(--accent)]' : 'text-[var(--primary)]'
          )}
        >
          {tag}
        </div>
      )}

      <h2
        className={cn(
          'font-display text-[length:var(--type-section)] font-semibold tracking-tight leading-[var(--leading-display)]',
          isDark ? 'text-[var(--bg)]' : 'text-[var(--primary)]'
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            'mt-4 text-base sm:text-lg leading-relaxed font-sans',
            isDark ? 'text-[var(--bg)]/80' : 'text-[var(--text)]/80'
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};
