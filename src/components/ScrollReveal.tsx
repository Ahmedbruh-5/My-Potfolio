import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  offset?: number;
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 650,
  offset = 32,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15, rootMargin: '0px 0px -6% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${className}`.trim()}
      style={{
        '--reveal-offset': `${offset}px`,
        '--reveal-duration': `${duration}ms`,
        '--reveal-delay': visible ? `${delay}ms` : '0ms',
      } as React.CSSProperties}
      data-visible={visible}
    >
      {children}
    </div>
  );
}
