import { useContext } from "react";
import { ModalContext } from "../context/ModalContextType";
import type { ModalContextType } from "../types";

/**
 * Custom hook to use Modal Context
 * 
 * Usage:
 * const { modal, openModal, closeModal } = useModalContext();
 * 
 * Must be used within ModalProvider
 */
export const useModalContext = (): ModalContextType => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModalContext must be used within ModalProvider");
    }
    return context;
};
