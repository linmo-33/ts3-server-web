import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  icon?: React.ElementType;
}

const variants = {
  primary:
    'bg-slate-900 text-white hover:bg-slate-800 dark:bg-red-600 dark:text-white dark:hover:bg-red-500 shadow-lg shadow-slate-200/50 dark:shadow-red-900/20',
  secondary:
    'bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-900/30 dark:text-rose-300',
  outline:
    'border border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800',
  ghost:
    'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className,
  icon: Icon,
  ...props
}) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 active:scale-95',
        variants[variant],
        className
      )}
      {...props}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
};
