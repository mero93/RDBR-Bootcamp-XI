'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

import ModalManager, { ModalKey } from '@/components/ModalManager';

type ModalContextType = {
  openModal: (key: ModalKey) => void;
  closeModal: () => void;
  isTransitioning: boolean;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export default function ModalProvider({ children }: { children: ReactNode }) {
  const [activeKey, setActiveKey] = useState<ModalKey | undefined>();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const openModal = (key: ModalKey) => {
    if (isTransitioning) return;

    setActiveKey(key);
  };

  const closeModal = () => {
    if (isTransitioning) return;

    setActiveKey(undefined);
  };

  const modalContext = { openModal, closeModal, isTransitioning };

  return (
    <ModalContext.Provider value={modalContext}>
      <ModalManager setIsTransitioning={setIsTransitioning} isTransitioning={isTransitioning} activeKey={activeKey} />
      {children}
    </ModalContext.Provider>
  );
}

export function useModalStates() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Something went wrong with setting up modal states');
  }

  return context;
}
