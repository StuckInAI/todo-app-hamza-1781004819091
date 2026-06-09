import { useMemo, useState } from 'react';
import { useTodos } from '@/hooks/useTodos';
import type { Filter } from '@/types';
import TodoInput from '@/components/TodoInput';
import TodoList from '@/components/TodoList';
import FilterBar from '@/components/FilterBar';
import styles from './HomePage.module.css';

export default function HomePage() {
  const { todos, addTodo, toggleTodo, deleteTodo, updateTodo, clearCompleted } = useTodos();
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.completed);
    if (filter === 'completed') return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.length - activeCount;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Todos</h1>
          <p className={styles.subtitle}>
            {todos.length === 0
              ? 'Add your first task below'
              : `${activeCount} active · ${completedCount} completed`}
          </p>
        </header>

        <div className={styles.card}>
          <TodoInput onAdd={addTodo} />

          {todos.length > 0 && (
            <FilterBar
              filter={filter}
              onChange={setFilter}
              completedCount={completedCount}
              onClearCompleted={clearCompleted}
            />
          )}

          <TodoList
            todos={filtered}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
            emptyMessage={
              todos.length === 0
                ? 'No todos yet. Add one above to get started.'
                : filter === 'active'
                ? 'No active todos. Great job!'
                : 'No completed todos yet.'
            }
          />
        </div>

        <footer className={styles.footer}>
          Your todos are saved locally in your browser.
        </footer>
      </div>
    </div>
  );
}
