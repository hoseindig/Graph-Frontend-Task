import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import FlightListPage from "./FlightListPage";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleConfirmLogout = () => {
    handleLogout();
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FlightListPage />
      </div>

      {/* Logout Confirmation Modal */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Logout"
        confirmText="Yes, Logout"
        onConfirm={handleConfirmLogout}
        animationDuration={300}
        animateBackdrop={true}
        animateModal={true}
        showBackdrop={true}
        closeOnBackdropClick={true}
      >
        <p className="text-gray-700">Are you sure you want to logout?</p>
      </CustomModal>
    </div>
  );
};

export default Dashboard;
