import * as React from 'react'
import { Link } from 'react-router-dom'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

type Action = { label: string; href: string; external?: boolean }

function ActionLink({ action, className, children }: { action: Action; className: string; children: React.ReactNode }) {
  if (action.external || action.href.startsWith('http') || action.href.startsWith('mailto:')) {
    return <a href={action.href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>
  }
  if (action.href.startsWith('#')) {
    return <a href={action.href} className={className}>{children}</a>
  }
  return <Link to={action.href} className={className}>{children}</Link>
}

/**
 * Split hero: copy on the left, one real product on the right. Text-only
 * buttons (no decorative arrows), no badge animation, no masked media.
 */
export function Hero({
  badge,
  title,
  children,
  primary,
  secondary,
  media,
  className,
}: {
  badge?: React.ReactNode
  title: React.ReactNode
  children?: React.ReactNode
  primary?: Action
  secondary?: Action
  media?: React.ReactNode
  className?: string
}) {
  return (
    <section className={cn('w-full', className)}>
      <div data-hero="content" className="home-hero-inner">
        <div>
          {badge && <p data-hero="eyebrow" className="home-hero-kicker">{badge}</p>}
          <h1 data-hero="title">{title}</h1>
          {children && <p data-hero="copy" className="home-hero-lead">{children}</p>}
          {(primary || secondary) && (
            <div data-hero="actions" className="home-hero-actions">
              {primary && <ActionLink action={primary} className={buttonVariants({ variant: 'solid' })}>{primary.label}</ActionLink>}
              {secondary && <ActionLink action={secondary} className={buttonVariants({ variant: 'outline' })}>{secondary.label}</ActionLink>}
            </div>
          )}
        </div>
        {media && <div data-hero="visual">{media}</div>}
      </div>
    </section>
  )
}
