import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

type Props = {
  src: string;
  alt: string;
  accent: string;
  onClick?: () => void;
};

export function BrowserFrame({ src, alt, accent, onClick }: Props) {
  const reduced = usePrefersReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springX = useSpring(rx, { stiffness: 180, damping: 18 });
  const springY = useSpring(ry, { stiffness: 180, damping: 18 });
  const transform = useMotionTemplate`perspective(900px) rotateX(${springX}deg) rotateY(${springY}deg)`;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="group relative w-full text-left"
      style={{ transform: reduced ? undefined : transform }}
      onMouseMove={(e) => {
        if (reduced) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        ry.set((px - 0.5) * 10);
        rx.set((0.5 - py) * 8);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      data-cursor="hover"
    >
      <div
        className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl transition group-hover:opacity-50"
        style={{ background: `radial-gradient(circle at 50% 40%, ${accent}88, transparent 65%)` }}
        aria-hidden
      />
      <div className="relative overflow-hidden rounded-xl border border-border bg-elevated shadow-2xl">
        <div className="flex items-center gap-2 border-b border-border px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="ml-2 truncate rounded bg-white/5 px-2 py-0.5 font-mono text-[10px] text-muted">
            {alt}
          </span>
        </div>
        <div className="aspect-[16/10] overflow-hidden bg-bg">
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
      </div>
    </motion.button>
  );
}
