/**
 * Global Type Definitions
 */

export interface ModalState {
    isOpen: boolean;
    title?: string;
    content?: React.ReactNode;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void | Promise<void>;
    onCancel?: () => void;
}

export interface ModalContextType {
    modal: ModalState;
    openModal: (config: Omit<ModalState, 'isOpen'>) => void;
    closeModal: () => void;
}
