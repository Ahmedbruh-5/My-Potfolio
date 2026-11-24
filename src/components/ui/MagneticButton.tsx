import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { cn } from '../../lib/utils';

type Props = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'ghost' | 'outline';
  target?: string;
  rel?: string;
};

export function MagneticButton({
  children,
  className,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  target,
  rel,
}: Props) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 20 });
  const springY = useSpring(y, { stiffness: 280, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.25);
    y.set(dy * 0.25);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const styles = cn(
    'inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-colors',
    variant === 'primary' && 'bg-accent text-bg hover:brightness-110',
    variant === 'ghost' && 'text-text hover:bg-white/5',
    variant === 'outline' &&
      'border border-border text-text hover:border-accent/50 hover:text-accent',
    className,
  );

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="inline-flex"
    >
      {href ? (
        <a href={href} target={target} rel={rel} className={styles} onClick={onClick}>
          {children}
        </a>
      ) : (
        <button type={type} className={styles} onClick={onClick}>
          {children}
        </button>
      )}
    </motion.div>
  );
}
