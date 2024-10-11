// Generic modal component

'use client';

import React, { ReactNode, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { theme } from '../styles/theme';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className='fixed inset-0 z-50 flex items-center justify-center px-2'>
      <div
        className='fixed inset-0 bg-black opacity-50'
        onClick={onClose}
      ></div>
      <div
        className={`${theme.text.highContrast} ${theme.bg.highContrast} relative z-50 p-6 rounded-lg shadow-lg`}
      >
        {children}
        <button
          className='absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-300'
          onClick={onClose}
        >
          ×
        </button>
      </div>
    </div>,
    document.body
  );
};

// Custom hook - useModal
export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return { isOpen, openModal, closeModal };
};
