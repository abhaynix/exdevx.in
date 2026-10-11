import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'outline-on-dark' | 'ghost' | 'ghost-on-dark';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  href?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = memo(({
  variant = 'primary',
  size = 'md',
  to,
  href,
  className,
  children,
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-sans font-medium transition-[transform,background-color,border-color,box-shadow,color] duration-150 ease-out focus-ring cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:transform-none select-none';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 rounded-sm tracking-wide',
    md: 'text-sm px-5 py-2.5 rounded-sm tracking-wide',
    lg: 'text-base px-7 py-3.5 rounded-sm tracking-wide',
  };

  const variantStyles = {
    primary:
      'bg-[var(--accent)] text-[var(--on-accent)] font-semibold shadow-xs hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.98]',
    outline:
      'border border-[var(--primary)] text-[var(--primary)] bg-transparent hover:bg-[var(--primary)]/5 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
    'outline-on-dark':
      'border border-[var(--bg)]/40 text-[var(--bg)] bg-transparent hover:bg-[var(--bg)]/10 hover:border-[var(--bg)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
    ghost:
      'text-[var(--primary)] bg-transparent hover:bg-[var(--primary)]/5 active:scale-[0.98]',
    'ghost-on-dark':
      'text-[var(--bg)] bg-transparent hover:bg-[var(--bg)]/10 active:scale-[0.98]',
  };

  const combinedClasses = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  if (to) {
    return (
      <Link to={to} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('https://wa.me');
    return (
      <a
        href={href}
        className={combinedClasses}
        target={isExternal && !href.startsWith('mailto:') ? '_blank' : undefined}
        rel={isExternal && !href.startsWith('mailto:') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClasses} disabled={disabled} {...props}>
      {children}
    </button>
  );
});

Button.displayName = 'Button';
