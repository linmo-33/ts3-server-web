import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps {
  children?: React.ReactNode;
  color?: 'gray' | 'green' | 'red' | 'teal' | 'indigo';
}

const colors = {
  gray: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
  green: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  red: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  teal: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
  indigo: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
};

export const Badge: React.FC<BadgeProps> = ({ children, color = 'gray' }) => {
  return (
    <span className={cn('px-2 py-0.5 rounded-md text-xs font-semibold', colors[color])}>
      {children}
    </span>
  );
};
