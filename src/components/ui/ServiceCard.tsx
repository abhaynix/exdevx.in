import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Database, Globe2, PenTool, Search, Smartphone, Sparkles, Workflow } from 'lucide-react';
import { ServiceItem } from '../../data/services';
import { Card } from '../../../components/ui/card';

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const Icon = {
    'web-applications': Code2,
    'mobile-apps': Smartphone,
    'automation-systems': Workflow,
    'ai-integrations': Sparkles,
    'backend-api': Database,
    'ui-ux-design': PenTool,
    'seo-digital-marketing': Search,
  }[service.id] ?? Globe2;

  return (
    <Card role="article" className="editorial-card p-6 sm:p-8 flex flex-col justify-between h-full">
      <div>
        <div className="mb-4 flex items-center justify-between text-xs font-medium text-[var(--primary)]">
          Service {String(index + 1).padStart(2, '0')}
          <Icon className="home-service-icon" size={19} strokeWidth={1.5} aria-hidden="true" />
        </div>

        <h3 className="font-display text-2xl font-semibold tracking-tight text-[var(--dark)] mb-3">
          {service.title}
        </h3>

        <p className="text-sm font-sans text-[var(--text)]/80 leading-relaxed mb-6">
          {service.shortDescription}
        </p>

        <ul className="mb-6 space-y-2 border-t border-[var(--text)]/10 pt-4">
          {service.deliverables.slice(0, 3).map((item) => (
            <li key={item} className="text-sm text-[var(--text)]/85">{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <Link
          to={`/services#${service.id}`}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[var(--primary)] hover:text-[var(--accent-hover)] group focus-ring py-1"
        >
          <span>View service</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </Card>
  );
};
