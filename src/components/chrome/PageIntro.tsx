import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

type Props = {
  onDone: () => void;
};

export function PageIntro({ onDone }: Props) {
  const reduced = useReducedMotion();
  const [show, setShow] = useState(!reduced);

  useEffect(() => {
    if (reduced) {
      onDone();
      return;
    }
    const t = window.setTimeout(() => {
      setShow(false);
      onDone();
    }, 1200);
    return () => window.clearTimeout(t);
  }, [onDone, reduced]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <button
            type="button"
            className="absolute right-6 top-6 font-mono text-xs text-muted hover:text-text"
            onClick={() => {
              setShow(false);
              onDone();
            }}
          >
            Skip
          </button>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="font-mono text-xs tracking-[0.3em] text-accent">AA</p>
            <p className="mt-3 text-sm text-muted">Loading portfolio</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
