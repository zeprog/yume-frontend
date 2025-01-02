import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  theme: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, theme }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={theme === 'light' ? "bg-white rounded-lg shadow-lg max-w-md w-full relative" : "bg-gray-800 text-white rounded-lg shadow-lg max-w-md w-full relative"}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white rounded-full p-2 focus:outline-none"
          title="Close"
        >
          ✖️
        </button>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;