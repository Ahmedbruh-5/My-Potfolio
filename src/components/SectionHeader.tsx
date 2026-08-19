import React from 'react';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

function SectionHeader({ eyebrow, title, subtitle }: SectionHeaderProps) {
  return (
    <header className="section-header">
      <p className="section-header__eyebrow">{eyebrow}</p>
      <h1 className="section-header__title">{title}</h1>
      {subtitle && <p className="section-header__subtitle">{subtitle}</p>}
    </header>
  );
}

export default SectionHeader;
