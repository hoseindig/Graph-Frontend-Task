import React, { useState } from "react";
import Modal from "../components/Modal";
import { useModal } from "../hooks/useModal";

/**
 * Home Page Component
 *
 * Demonstrates the usage of custom Modal component and useModal hook
 */
const Home: React.FC = () => {
  const { modal, openModal, closeModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const handleBasicModal = () => {
    openModal({
      title: "Welcome",
      content: (
        <div>
          <p className="text-gray-700">
            This is a beautiful modal component built with React, TypeScript,
            and Framer Motion.
          </p>
          <p className="text-gray-700 mt-3">
            It follows modern React best practices and is fully customizable!
          </p>
        </div>
      ),
      confirmText: "Got it!",
      cancelText: "Close",
      onConfirm: closeModal,
      onCancel: closeModal,
    });
  };

  const handleConfirmModal = async () => {
    openModal({
      title: "Confirm Action",
      content: (
        <p className="text-gray-700">
          Are you sure you want to proceed with this action?
        </p>
      ),
      confirmText: "Proceed",
      cancelText: "Cancel",
      onConfirm: async () => {
        setIsLoading(true);
        // Simulate async operation
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsLoading(false);
        closeModal();
        alert("Action confirmed!");
      },
      onCancel: closeModal,
    });
  };

  const handleCustomModal = () => {
    openModal({
      title: "Subscribe to Newsletter",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">Enter your email to subscribe:</p>
          <input
            type="email"
            placeholder="your@email.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ),
      confirmText: "Subscribe",
      cancelText: "Maybe Later",
      onConfirm: () => {
        closeModal();
        alert("Thank you for subscribing!");
      },
      onCancel: closeModal,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Best Practices
          </h1>
          <p className="text-lg text-gray-600">
            A modern React project with proper structure and custom modal
            component
          </p>
        </div>

        {/* Project Structure Info */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Project Structure
          </h2>
          <div className="text-sm text-gray-600 space-y-2 font-mono">
            <p>src/</p>
            <p className="ml-4">├── components/ (Reusable React components)</p>
            <p className="ml-4">├── hooks/ (Custom React hooks)</p>
            <p className="ml-4">├── pages/ (Page components)</p>
            <p className="ml-4">├── types/ (TypeScript type definitions)</p>
            <p className="ml-4">├── utils/ (Utility functions)</p>
            <p className="ml-4">├── context/ (React Context providers)</p>
            <p className="ml-4">└── assets/ (Images, fonts, etc.)</p>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Features
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-500 font-bold mr-3">✓</span>
              <span>TypeScript for type safety</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 font-bold mr-3">✓</span>
              <span>Custom Modal component with animations</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 font-bold mr-3">✓</span>
              <span>useModal custom hook for state management</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 font-bold mr-3">✓</span>
              <span>Tailwind CSS for styling</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 font-bold mr-3">✓</span>
              <span>Framer Motion for smooth animations</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 font-bold mr-3">✓</span>
              <span>Accessibility-friendly components</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 font-bold mr-3">✓</span>
              <span>ESLint and TypeScript strict mode</span>
            </li>
          </ul>
        </div>

        {/* Demo Buttons */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Try the Modal
          </h2>
          <div className="space-y-4">
            <button
              onClick={handleBasicModal}
              className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
            >
              Basic Modal
            </button>
            <button
              onClick={handleConfirmModal}
              className="w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
            >
              Confirm Modal with Loading
            </button>
            <button
              onClick={handleCustomModal}
              className="w-full px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-semibold"
            >
              Custom Modal with Form
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-600">
          <p>Built with React, TypeScript, Tailwind CSS, and Framer Motion</p>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modal.isOpen}
        title={modal.title}
        confirmText={modal.confirmText}
        cancelText={modal.cancelText}
        onConfirm={modal.onConfirm}
        onCancel={modal.onCancel}
        isLoading={isLoading}
      >
        {modal.content}
      </Modal>
    </div>
  );
};

export default Home;
