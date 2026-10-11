import React from 'react';
import { siteData } from '../data/site';

export const WorkList: React.FC = () => {
  return (
    <div className="w-full">
      {/* Section Label */}
      <h2
        id="work-heading"
        className="text-[12px] font-sans font-medium uppercase tracking-[0.08em] text-[var(--muted)] mb-8 sm:mb-12 m-0"
      >
        Selected Work
      </h2>

      {/* Four Rows with 1px dividers */}
      <div className="border-t border-[var(--line)]">
        {siteData.work.map((project) => (
          <a
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.name} — ${project.outcome}`}
            className="group block py-8 sm:py-12 border-b border-[var(--line)] no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline">
              {/* Project Name & Year */}
              <div className="md:col-span-5 flex items-baseline justify-between md:justify-start gap-4">
                <span className="font-serif text-xl sm:text-2xl font-medium text-[var(--text)] group-hover:text-[var(--primary)] transition-colors duration-150">
                  {project.name}
                </span>
                <span className="text-[12px] font-sans font-medium text-[var(--muted)]">
                  {project.year}
                </span>
              </div>

              {/* Outcome & Stack */}
              <div className="md:col-span-6 space-y-1.5">
                <div className="text-[16px] sm:text-[17px] leading-[1.65] text-[var(--text)]">
                  {project.outcome}
                </div>
                <div className="text-[13px] font-sans text-[var(--muted)]">
                  {project.stack}
                </div>
              </div>

              {/* Arrow Glyph (shifts 4px right on hover) */}
              <div className="md:col-span-1 md:text-right hidden sm:block">
                <span
                  className="inline-block text-lg text-[var(--muted)] group-hover:text-[var(--primary)] transform transition-transform duration-150 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default WorkList;
