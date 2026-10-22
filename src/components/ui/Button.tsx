import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/cn';
import { buttonVariants } from '../../../components/ui/button';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'outline-on-dark' | 'ghost' | 'ghost-on-dark';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  href?: string;
  iconRight?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  to,
  href,
  iconRight,
  className,
  children,
  disabled,
  ...props
}) => {
  const variantMap = {
    primary: 'solid',
    outline: 'outline',
    'outline-on-dark': 'outline',
    ghost: 'ghost',
    'ghost-on-dark': 'ghost',
  } as const;
  const sizeMap = { sm: 'sm', md: 'md', lg: 'lg' } as const;

  const combinedClasses = cn(
    buttonVariants({ variant: variantMap[variant], size: sizeMap[size] }),
    'focus-ring',
    className
  );
  const trailingIcon = iconRight === undefined && variant === 'primary'
    ? <ArrowUpRight aria-hidden="true" className="size-4" />
    : iconRight;
  const content = <>{children}{trailingIcon && <span aria-hidden="true" className="-ml-1 inline-flex">{trailingIcon}</span>}</>;

  if (to) {
    return (
      <Link to={to} className={combinedClasses} aria-disabled={disabled || undefined} onClick={disabled ? (event) => event.preventDefault() : undefined}>
        {content}
      </Link>
    );
  }

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('https://wa.me');
    return (
      <a
        href={href}
        className={combinedClasses}
        aria-disabled={disabled || undefined}
        onClick={disabled ? (event) => event.preventDefault() : undefined}
        target={isExternal && !href.startsWith('mailto:') ? '_blank' : undefined}
        rel={isExternal && !href.startsWith('mailto:') ? 'noopener noreferrer' : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={combinedClasses} disabled={disabled} {...props}>
      {content}
    </button>
  );
};
