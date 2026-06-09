import { useState } from 'react';
import { Plus } from 'lucide-react';
import styles from './TodoInput.module.css';

type TodoInputProps = {
  onAdd: (text: string) => void;
};

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) return;
    onAdd(value);
    setValue('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="What needs to be done?"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        autoFocus
      />
      <button
        type="submit"
        className={styles.button}
        disabled={!value.trim()}
        aria-label="Add todo"
      >
        <Plus size={18} />
        <span>Add</span>
      </button>
    </form>
  );
}
