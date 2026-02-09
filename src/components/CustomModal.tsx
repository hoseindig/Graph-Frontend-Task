import React, { useState } from "react";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  size?: "sm" | "md" | "lg" | "xl";
  animationDuration?: number;
  animateBackdrop?: boolean;
  animateModal?: boolean;
  showBackdrop?: boolean;
  closeOnBackdropClick?: boolean;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  size = "md",
  animationDuration = 300,
  animateBackdrop = true,
  animateModal = true,
  showBackdrop = true,
  closeOnBackdropClick = true,
}) => {
  const [isClosing, setIsClosing] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, animationDuration);
  };

  const handleConfirm = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onConfirm?.();
      onClose();
    }, animationDuration);
  };

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-2xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      {showBackdrop && (
        <div
          className={`absolute inset-0 bg-black ${
            animateBackdrop && isClosing
              ? "animate-backdrop-out"
              : animateBackdrop
                ? "animate-backdrop-in"
                : ""
          }`}
          style={{
            backgroundColor: animateBackdrop
              ? "rgba(0, 0, 0, 0.5)"
              : "rgba(0, 0, 0, 0)",
          }}
          onClick={closeOnBackdropClick ? handleClose : undefined}
        />
      )}

      {/* Modal */}
      <div
        className={`relative bg-white rounded-lg shadow-2xl transform ${
          animateModal ? "transition-all" : ""
        } ${sizeClasses[size]} w-full mx-4 ${
          animateModal && isClosing
            ? "animate-fade-out"
            : animateModal
              ? "animate-fade-in"
              : ""
        }`}
        style={{
          transitionDuration: animateModal ? `${animationDuration}ms` : "0ms",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 max-h-96 overflow-y-auto text-gray-700">
          {children}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-lg">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            {cancelText}
          </button>
          {onConfirm && (
            <button
              onClick={handleConfirm}
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0.95);
          }
        }
        @keyframes backdropIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes backdropOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        .animate-fade-in {
          animation: fadeIn ${animationDuration}ms ease-out forwards;
        }
        .animate-fade-out {
          animation: fadeOut ${animationDuration}ms ease-in forwards;
        }
        .animate-backdrop-in {
          animation: backdropIn ${animationDuration}ms ease-out forwards;
        }
        .animate-backdrop-out {
          animation: backdropOut ${animationDuration}ms ease-in forwards;
        }
      `}</style>
    </div>
  );
};

export default CustomModal;
