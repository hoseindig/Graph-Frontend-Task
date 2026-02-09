import React, { useState, useCallback, type ReactNode } from "react";
import { ModalContext } from "./ModalContextType";
import type { ModalContextType, ModalState } from "../types";

interface ModalProviderProps {
  children: ReactNode;
}

/**
 * Modal Context Provider Component
 *
 * Provides global modal state management for the application
 * Usage: Wrap your app with <ModalProvider> and use useModalContext() hook
 */
const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
  });

  const openModal = useCallback((config: Omit<ModalState, "isOpen">) => {
    setModal((prev) => ({
      ...prev,
      ...config,
      isOpen: true,
    }));
  }, []);

  const closeModal = useCallback(() => {
    setModal((prev) => ({
      ...prev,
      isOpen: false,
    }));
  }, []);

  const value: ModalContextType = {
    modal,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export default ModalProvider;
