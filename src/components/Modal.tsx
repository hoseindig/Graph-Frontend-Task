import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  children?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

/**
 * Custom Modal Component
 *
 * A reusable modal component with animations powered by Framer Motion
 * Features:
 * - Smooth enter/exit animations
 * - Customizable title, content, and buttons
 * - Keyboard support (ESC to close)
 * - Accessibility-friendly
 */
const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  children,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  isLoading = false,
}) => {
  // Handle ESC key press
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCancel?.();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onCancel]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
              {/* Header */}
              {title && (
                <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 border-b border-gray-200">
                  <h2
                    id="modal-title"
                    className="text-xl font-semibold text-white"
                  >
                    {title}
                  </h2>
                </div>
              )}

              {/* Content */}
              <div className="px-6 py-4">
                {children ? (
                  children
                ) : (
                  <p className="text-gray-600">Modal content goes here</p>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-3 justify-end">
                <button
                  onClick={onCancel}
                  disabled={isLoading}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors button-secondary"
                >
                  {cancelText}
                </button>
                {onConfirm && (
                  <button
                    onClick={onConfirm}
                    disabled={isLoading}
                    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors button-primary"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent" />
                        Loading...
                      </span>
                    ) : (
                      confirmText
                    )}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
