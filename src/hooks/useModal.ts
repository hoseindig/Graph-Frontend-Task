import { useState, useCallback } from 'react';
import type { ModalState } from '../types';

/**
 * Custom Hook: useModal
 * 
 * Manages modal state and provides methods to open/close the modal
 * Usage:
 * const { modal, openModal, closeModal } = useModal();
 */
export const useModal = () => {
    const [modal, setModal] = useState<ModalState>({
        isOpen: false,
        title: '',
        content: undefined,
        confirmText: 'Confirm',
        cancelText: 'Cancel',
    });

    const openModal = useCallback(
        (config: Omit<ModalState, 'isOpen'>) => {
            setModal((prev) => ({
                ...prev,
                ...config,
                isOpen: true,
            }));
        },
        []
    );

    const closeModal = useCallback(() => {
        setModal((prev) => ({
            ...prev,
            isOpen: false,
        }));
    }, []);

    return { modal, openModal, closeModal };
};
