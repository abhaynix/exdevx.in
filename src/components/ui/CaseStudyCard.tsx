import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import { ProjectCaseStudy } from '../../data/projects';

interface CaseStudyCardProps {
  project: ProjectCaseStudy;
  featured?: boolean;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ project, featured = false }) => {
  return (
    <article className="editorial-card p-6 sm:p-8 flex flex-col justify-between h-full">
      <div>
        {/* Unboxed Metadata Header */}
        <div className="flex items-center justify-between text-xs font-mono text-[var(--text)]/60 mb-4 pb-3 border-b border-[var(--text)]/10">
          <div className="flex items-center gap-2">
            <span className="text-[var(--primary)] font-semibold">{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
          </div>
          <span>{project.client}</span>
        </div>

        {/* Project Title */}
        <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--primary)] mb-2">
          {project.title}
        </h3>

        <p className="text-xs font-mono text-[var(--text)]/60 uppercase tracking-wider mb-4">
          {project.subtitle}
        </p>

        {/* One Line Outcome Banner */}
        <div className="bg-[var(--bg)] border-l-2 border-[var(--accent)] p-3.5 mb-6 text-xs sm:text-sm text-[var(--text)] font-sans leading-relaxed">
          <span className="font-semibold text-[var(--dark)]">Outcome: </span>
          {project.oneLineOutcome}
        </div>

        <p className="text-sm font-sans text-[var(--text)]/80 leading-relaxed mb-6">
          {project.summary}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6 p-3 bg-[var(--bg)]/60 rounded-xs border border-[var(--text)]/5">
          {project.metrics.slice(0, 2).map((metric) => (
            <div key={metric.label}>
              <div className="font-display text-lg font-bold text-[var(--primary)]">
                {metric.value}
              </div>
              <div className="text-[10px] font-mono uppercase text-[var(--text)]/60">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        {/* Unboxed Stack Tags */}
        <div className="pt-4 border-t border-[var(--text)]/10 flex flex-wrap items-center gap-1.5 text-xs text-[var(--text)]/60 font-mono mb-6">
          {project.stack.map((tech, idx) => (
            <React.Fragment key={tech}>
              <span>{tech}</span>
              {idx < project.stack.length - 1 && <span aria-hidden="true">·</span>}
            </React.Fragment>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4">
          <Link
            to={`/work/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[var(--primary)] hover:text-[var(--dark)] group focus-ring py-1"
          >
            <span>Read Case Study</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          {project.liveUrl && (
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
