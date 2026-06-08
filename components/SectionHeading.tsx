import type { ReactNode } from 'react';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  centered?: boolean;
};

export function SectionHeading({ eyebrow, title, children, centered = false }: SectionHeadingProps) {
  return (
    <div className={`section-heading${centered ? ' centered' : ''}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
