import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export function CustomCursor() {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 400, damping: 35 });
  const springY = useSpring(y, { stiffness: 400, damping: 35 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine || reduced) return;

    document.body.classList.add('has-custom-cursor');

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const interactive = t?.closest('a, button, [data-cursor="hover"]');
      setHovering(Boolean(interactive));
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, [reduced, x, y]);

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden mix-blend-difference md:block"
      style={{
        x: springX,
        y: springY,
        opacity: visible ? 1 : 0,
      }}
    >
      <div
        className="rounded-full border border-white bg-white/20 transition-all duration-200"
        style={{
          width: hovering ? 44 : 14,
          height: hovering ? 44 : 14,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </motion.div>
  );
}
