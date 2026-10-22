import React from 'react';
import { techStackList } from '../../data/process';
import { Container } from '../ui/Container';

export const TechStrip: React.FC = () => {
  return (
    <div className="py-12 border-y border-[var(--text)]/10 bg-[var(--surface)]">
      <Container>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="md:w-1/4">
            <span className="text-xs font-mono tracking-widest text-[var(--primary)] font-bold block mb-1">
              Foundational stack
            </span>
            <p className="text-xs text-[var(--text)]/60 font-sans">
              Type-safe languages, cloud-native runtimes & modern databases.
            </p>
          </div>

          <div className="md:w-3/4 flex flex-wrap items-center gap-x-6 gap-y-3">
            {techStackList.map((item, index) => (
              <div key={item.name} className="flex items-center gap-2 text-sm font-mono text-[var(--text)]">
                <span className="font-semibold text-[var(--dark)]">{item.name}</span>
                <span className="text-[10px] text-[var(--text-secondary)]">({item.category})</span>
                {index < techStackList.length - 1 && (
                  <span className="text-[var(--text)]/20 ml-2 hidden sm:inline" aria-hidden="true">
                    /
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};
