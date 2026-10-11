import React from 'react';

interface SectionProps {
  id?: string;
  ariaLabelledBy?: string;
  children: React.ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({
  id,
  ariaLabelledBy,
  children,
  className = '',
}) => {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={`py-20 lg:py-32 ${className}`}
    >
      {children}
    </section>
  );
};

export default Section;
