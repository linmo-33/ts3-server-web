import React from 'react';
import { Activity } from 'lucide-react';
import { Button } from './Button';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-lg shadow-2xl shadow-black/20 p-6 relative animate-in zoom-in-95 duration-200 border border-slate-100 dark:border-slate-800">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 dark:hover:text-white"
        >
          <Activity size={20} className="rotate-45" />
        </button>
        <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">{title}</h3>
        <div className="prose dark:prose-invert max-h-[60vh] overflow-y-auto">
          {children}
        </div>
        <div className="mt-6 flex justify-end">
          <Button onClick={onClose} variant="primary">
            知道了
          </Button>
        </div>
      </div>
    </div>
  );
};
