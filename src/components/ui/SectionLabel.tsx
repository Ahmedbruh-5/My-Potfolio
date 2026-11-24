import { cn } from '../../lib/utils';

type Props = {
  index: string;
  title: string;
  className?: string;
};

export function SectionLabel({ index, title, className }: Props) {
  return (
    <div className={cn('mb-8 flex items-center gap-4', className)}>
      <span className="font-mono text-xs tracking-widest text-accent">{index}</span>
      <span className="h-px flex-1 max-w-16 bg-border" aria-hidden />
      <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{title}</h2>
    </div>
  );
}
