import React from "react";
import { X } from "lucide-react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-fresh-text/20 backdrop-blur-sm">
      <div className="theme-card w-full max-w-lg max-h-[90vh] p-6 relative flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg transition-all text-fresh-text-muted hover:text-fresh-text hover:bg-fresh-text/5"
          style={{ border: "2px solid #1F2937" }}
        >
          <X size={18} />
        </button>

        <h3 className="text-xl font-black mb-4 text-fresh-text">{title}</h3>

        <div className="flex-1 overflow-y-auto pr-2">{children}</div>

        <div className="mt-6 flex justify-end flex-shrink-0">
          <button onClick={onClose} className="theme-btn px-6 py-2.5">
            知道了
          </button>
        </div>
      </div>
    </div>
  );
};
