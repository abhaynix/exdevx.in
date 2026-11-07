import React from 'react';
import { Link } from 'react-router-dom';
import { ServiceItem } from '../../data/services';
import { Card } from '../../../components/ui/card';

interface ServiceCardProps {
  service: ServiceItem;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <Card role="article" className="editorial-card p-6 sm:p-8 flex flex-col justify-between h-full">
      <div>
        <h3 className="font-display text-2xl font-semibold tracking-tight text-[var(--dark)] mb-3">
          {service.title}
        </h3>

        <p className="text-sm font-sans text-[var(--text)]/80 leading-relaxed mb-6">
          {service.shortDescription}
        </p>

        <ul className="mb-6 space-y-2 border-t border-[var(--text)]/10 pt-4">
          {service.deliverables.slice(0, service.id === 'whatsapp-crm-ai' ? 4 : 3).map((item) => (
            <li key={item} className="text-sm text-[var(--text)]/85">{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <Link
          to={`/services#${service.id}`}
          className="inline-flex items-center text-sm font-semibold text-[var(--accent-bright)] underline underline-offset-4 hover:text-[var(--accent-hover)] focus-ring py-1"
        >
          View service
        </Link>
      </div>
    </Card>
  );
};
