import clsx from 'clsx';
import type { Filter } from '@/types';
import styles from './FilterBar.module.css';

type FilterBarProps = {
  filter: Filter;
  onChange: (filter: Filter) => void;
  completedCount: number;
  onClearCompleted: () => void;
};

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export default function FilterBar({ filter, onChange, completedCount, onClearCompleted }: FilterBarProps) {
  return (
    <div className={styles.bar}>
      <div className={styles.tabs}>
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            className={clsx(styles.tab, filter === f.value && styles.active)}
            onClick={() => onChange(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <button
        type="button"
        className={styles.clear}
        onClick={onClearCompleted}
        disabled={completedCount === 0}
      >
        Clear completed
      </button>
    </div>
  );
}
