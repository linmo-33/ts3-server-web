import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  icon?: React.ElementType;
}

const variants = {
  primary:
    'bg-gradient-to-r from-cyber-cyan to-cyber-purple text-cyber-bg hover:brightness-110 shadow-lg shadow-cyber-cyan/30',
  secondary:
    'bg-cyber-purple/20 text-cyber-purple hover:bg-cyber-purple/30 border border-cyber-purple/30',
  outline:
    'border border-cyber-border text-cyber-text-secondary hover:bg-cyber-cyan/10 hover:border-cyber-cyan/30 hover:text-cyber-cyan',
  ghost:
    'text-cyber-text-muted hover:text-cyber-cyan hover:bg-cyber-cyan/10',
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
