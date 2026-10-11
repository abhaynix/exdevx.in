import React, { useState, useMemo, memo } from 'react';
import { processSteps } from '../../data/process';
import { SectionHeading } from '../ui/SectionHeading';
import { Check } from 'lucide-react';
import { cn } from '../../lib/cn';

export const ProcessStepper: React.FC = memo(() => {
  const [activeStep, setActiveStep] = useState(0);

  const currentStep = useMemo(() => processSteps[activeStep], [activeStep]);

  return (
    <div className="w-full">
      <SectionHeading
        tag="Engineering Lifecycle"
        title="Predictable, zero-noise execution"
        description="Every product follows our disciplined 5-stage engineering pipeline from initial constraint analysis to automated monitoring."
        tone="dark"
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
                'text-left p-3 rounded-xs transition-[background-color,border-color,color] focus-ring-dark cursor-pointer',
                isSelected
                  ? 'bg-[var(--bg)]/15 border-b-2 border-[var(--accent)] text-[var(--bg)]'
                  : 'hover:bg-[var(--bg)]/5 text-[var(--bg)]/70 hover:text-[var(--bg)]'
              )}
            >
              <div className="font-mono text-xs text-[var(--accent)] font-bold">
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
      <div className="bg-[var(--bg)]/5 border border-[var(--bg)]/10 p-6 sm:p-10 rounded-xs">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-2">
            <span>Phase {currentStep.step}</span>
            <span aria-hidden="true">·</span>
            <span>{currentStep.tagline}</span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--bg)] mb-4">
            {currentStep.name}: {currentStep.tagline}
          </h3>

          <p className="text-base text-[var(--bg)]/85 leading-relaxed font-sans mb-6">
            {currentStep.description}
          </p>

          <div className="border-t border-[var(--bg)]/15 pt-6">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--bg)]/60 mb-3">
              Phase Deliverables
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {currentStep.deliverables.map((del) => (
                <div
                  key={del}
                  className="flex items-start gap-2 text-xs font-mono text-[var(--bg)]/90 bg-[var(--bg)]/10 p-3 rounded-xs border border-[var(--bg)]/10"
                >
                  <Check className="w-3.5 h-3.5 text-[var(--accent)] shrink-0 mt-0.5" />
                  <span>{del}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ProcessStepper.displayName = 'ProcessStepper';
