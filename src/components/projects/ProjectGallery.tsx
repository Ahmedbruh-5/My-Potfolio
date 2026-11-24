import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  images: string[];
  index: number;
  title: string;
  onClose: () => void;
  onIndex: (i: number) => void;
};

export function ProjectGallery({ images, index, title, onClose, onIndex }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onIndex((index + 1) % images.length);
      if (e.key === 'ArrowLeft') onIndex((index - 1 + images.length) % images.length);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [images.length, index, onClose, onIndex]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`${title} gallery`}
      >
        <motion.div
          className="relative w-full max-w-4xl overflow-hidden rounded-xl border border-border bg-elevated"
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <p className="font-mono text-xs text-muted">
              {title} · {index + 1}/{images.length}
            </p>
            <button
              type="button"
              className="font-mono text-xs text-muted hover:text-text"
              onClick={onClose}
            >
              Close
            </button>
          </div>
          <img
            src={images[index]}
            alt=""
            className="max-h-[70vh] w-full object-contain bg-bg"
          />
          {images.length > 1 && (
            <div className="flex justify-between border-t border-border p-3">
              <button
                type="button"
                className="font-mono text-xs text-accent"
                onClick={() => onIndex((index - 1 + images.length) % images.length)}
              >
                Prev
              </button>
              <button
                type="button"
                className="font-mono text-xs text-accent"
                onClick={() => onIndex((index + 1) % images.length)}
              >
                Next
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
