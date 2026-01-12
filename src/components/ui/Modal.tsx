import React from 'react';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
  isDark?: boolean;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, isDark = true }) => {
  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-200 ${
      isDark ? 'bg-cyber-bg/80' : 'bg-cream-bg/80'
    }`}>
      <div className={`theme-card rounded-2xl w-full max-w-lg shadow-2xl p-6 relative animate-in zoom-in-95 duration-200 ${
        isDark ? 'shadow-cyber-cyan/10' : 'shadow-cream-primary/10'
      }`}>
        {/* Decorative top border */}
        <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent to-transparent ${
          isDark ? 'via-cyber-cyan/50' : 'via-cream-primary/50'
        }`}></div>

        <button
          onClick={onClose}
          className={`absolute top-4 right-4 transition-colors ${
            isDark ? 'text-cyber-text-muted hover:text-cyber-cyan' : 'text-cream-text-muted hover:text-cream-primary'
          }`}
        >
          <X size={20} />
        </button>

        <h3 className={`text-xl font-bold mb-4 gradient-text`}>{title}</h3>

        <div className="max-h-[60vh] overflow-y-auto pr-2">
          {children}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="theme-btn font-medium rounded-xl px-5 py-2.5"
          >
            知道了
          </button>
        </div>
      </div>
    </div>
  );
};
