import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PortfolioProject } from '../../data/projects';

interface CaseStudyCardProps {
  project: PortfolioProject;
  featured?: boolean;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ project, featured = false }) => {
  return (
    <article className="editorial-card p-6 sm:p-8 flex flex-col justify-between h-full">
      <div>
        <p className="mb-3 text-xs font-medium text-[var(--primary)]">{project.category}</p>
        <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--dark)] mb-2">
          {project.title}
        </h3>
        <p className="text-sm font-sans text-[var(--text)]/80 leading-relaxed mb-5">
          {project.summary}
        </p>
      </div>

      <div>
        <div className="flex items-center justify-between gap-4">
          {project.caseStudyUrl ? (
            <Link
              to={project.caseStudyUrl}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[var(--primary)] hover:text-[var(--accent-hover)] group focus-ring py-1"
            >
              <span>Read case study</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          ) : project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} project (opens in a new tab)`}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[var(--primary)] hover:text-[var(--accent-hover)] group focus-ring py-1"
            >
              <span>View Project</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          ) : null}

          {project.caseStudyUrl && project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[var(--text)]/50 hover:text-[var(--text)] transition-colors focus-ring"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
};
