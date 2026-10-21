import React, { useState } from 'react';
import { processSteps } from '../../data/process';
import { SectionHeading } from '../ui/SectionHeading';
import { Check } from 'lucide-react';
import { cn } from '../../lib/cn';

export const ProcessStepper: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="w-full">
      <SectionHeading
        tag="Process"
        title="From idea to delivery"
        description="A straightforward process for planning, building and handing over your product."
      />

      {/* Interactive Step Switcher for Mobile & Desktop Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pb-6 border-b border-[var(--bg)]/15 mb-8">
        {processSteps.map((item, idx) => {
          const isSelected = activeStep === idx;
          return (
            <button
              key={item.step}
              type="button"
              onClick={() => setActiveStep(idx)}
              className={cn(
                'text-left p-3 transition-colors focus-ring cursor-pointer',
                isSelected
                  ? 'bg-[var(--surface)] border-b-2 border-[var(--primary)] text-[var(--dark)]'
                  : 'hover:bg-[var(--surface)] text-[var(--text)]/70 hover:text-[var(--dark)]'
              )}
            >
              <div className="text-xs text-[var(--primary)] font-semibold">
                {item.step}
              </div>
              <div className="font-display font-medium text-sm sm:text-base mt-0.5">
                {item.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Step Deep Dive Card */}
      <div className="bg-[var(--surface)] border border-[var(--text)]/10 p-6 sm:p-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 text-xs text-[var(--primary)] mb-2">
            <span>Phase {processSteps[activeStep].step}</span>
            <span aria-hidden="true">·</span>
            <span>{processSteps[activeStep].tagline}</span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--dark)] mb-4">
            {processSteps[activeStep].name}: {processSteps[activeStep].tagline}
          </h3>

          <p className="text-base text-[var(--text)]/85 leading-relaxed font-sans mb-6">
            {processSteps[activeStep].description}
          </p>

          <div className="border-t border-[var(--text)]/10 pt-6">
            <h4 className="text-xs uppercase tracking-wider text-[var(--text)]/60 mb-3">
              Phase Deliverables
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {processSteps[activeStep].deliverables.map((del) => (
                <div
                  key={del}
                  className="flex items-start gap-2 text-sm text-[var(--text)]/85 bg-[var(--bg)] p-3 border border-[var(--text)]/10"
                >
                  <Check className="w-3.5 h-3.5 text-[var(--primary)] shrink-0 mt-0.5" />
                  <span>{del}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
