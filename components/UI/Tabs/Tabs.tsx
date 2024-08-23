import React from 'react';
import styles from './Tabs.module.css';
import clsx from 'clsx';

export type Tab = {
  id: number,
  name: string,
}

interface ITabsProps {
  current: Tab;
  items: Tab[];
  onChange: (v: Tab) => void;
  className?: string;
}

const Tabs:React.FC<ITabsProps> = ({
  current,
  items,
  onChange,
  className
}) => {
  return (
    <div className={clsx(styles.tabs, className)}>
      {items.map((item) => (
        <button
          className={clsx(
            styles.tab,
            item.id === current.id && styles.tab_active
          )}
          key={item.id}
          disabled={item.id === current.id}
          type="button"
          onClick={() => onChange(item)}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
