import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { ServiceItem } from '../../data/services';

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = memo(({ service, index }) => {
  return (
    <article className="editorial-card p-6 sm:p-8 flex flex-col justify-between h-full">
      <div>
        {/* Card Header with index and unboxed metric */}
        <div className="flex items-center justify-between text-xs font-mono text-[var(--primary)] mb-4">
          <span className="font-bold">0{index + 1}</span>
          <span className="text-[var(--text)]/60">{service.metrics}</span>
        </div>

        <h3 className="font-display text-2xl font-semibold tracking-tight text-[var(--primary)] mb-3">
          {service.title}
        </h3>

        <p className="text-sm font-sans text-[var(--text)]/80 leading-relaxed mb-6">
          {service.shortDescription}
        </p>

        {/* Deliverables List */}
        <div className="border-t border-[var(--text)]/10 pt-4 mb-6">
          <div className="text-xs font-mono uppercase tracking-wider text-[var(--text)]/50 mb-3">
            Core Deliverables
          </div>
          <ul className="space-y-2">
            {service.deliverables.slice(0, 4).map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs text-[var(--text)]/90">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--primary)] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        {/* Unboxed tech stack metadata */}
        <div className="pt-4 border-t border-[var(--text)]/10 flex flex-wrap items-center gap-1.5 text-xs text-[var(--text)]/60 font-mono mb-4">
          {service.techStack.map((tech, idx) => (
            <React.Fragment key={tech}>
              <span>{tech}</span>
              {idx < service.techStack.length - 1 && <span aria-hidden="true">·</span>}
            </React.Fragment>
          ))}
        </div>

        <Link
          to={`/services#${service.id}`}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-[var(--primary)] hover:text-[var(--dark)] group focus-ring py-1"
        >
          <span>Examine Architecture</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
});

ServiceCard.displayName = 'ServiceCard';
