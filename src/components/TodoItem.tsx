import { useEffect, useRef, useState } from 'react';
import { Check, Pencil, Trash2, X } from 'lucide-react';
import clsx from 'clsx';
import type { Todo } from '@/types';
import styles from './TodoItem.module.css';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const startEdit = () => {
    setDraft(todo.text);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setDraft(todo.text);
    setIsEditing(false);
  };

  const saveEdit = () => {
    const trimmed = draft.trim();
    if (!trimmed) {
      cancelEdit();
      return;
    }
    if (trimmed !== todo.text) {
      onUpdate(todo.id, trimmed);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') saveEdit();
    else if (e.key === 'Escape') cancelEdit();
  };

  return (
    <li className={clsx(styles.item, todo.completed && styles.completed)}>
      <button
        type="button"
        className={clsx(styles.checkbox, todo.completed && styles.checked)}
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark as not done' : 'Mark as done'}
      >
        {todo.completed && <Check size={14} strokeWidth={3} />}
      </button>

      {isEditing ? (
        <input
          ref={inputRef}
          className={styles.editInput}
          type="text"
          value={draft}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={saveEdit}
        />
      ) : (
        <span
          className={styles.text}
          onDoubleClick={startEdit}
          title="Double-click to edit"
        >
          {todo.text}
        </span>
      )}

      <div className={styles.actions}>
        {isEditing ? (
          <>
            <button
              type="button"
              className={styles.iconButton}
              onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                saveEdit();
              }}
              aria-label="Save"
            >
              <Check size={16} />
            </button>
            <button
              type="button"
              className={styles.iconButton}
              onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                cancelEdit();
              }}
              aria-label="Cancel"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className={styles.iconButton}
              onClick={startEdit}
              aria-label="Edit"
            >
              <Pencil size={15} />
            </button>
            <button
              type="button"
              className={clsx(styles.iconButton, styles.danger)}
              onClick={() => onDelete(todo.id)}
              aria-label="Delete"
            >
              <Trash2 size={15} />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
