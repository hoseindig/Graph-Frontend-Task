import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import { get } from "../api";
import FlightListPage from "./FlightListPage";

interface User {
  username: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getuserdata = async () => {
    try {
      const res = await get("/username");
      console.log(res);
      setUser({ username: res.data.username });
    } catch (error) {
      navigate("/login");
    }
  };

  useEffect(() => {
    getuserdata();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleConfirmLogout = () => {
    handleLogout();
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition duration-200 font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Card */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome! 👋</h2>
          <p className="text-gray-600 text-lg">
            You are logged in as:{" "}
            <span className="font-semibold text-blue-600">{user.username}</span>
          </p>
        </div>
        <FlightListPage />
      </main>

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
