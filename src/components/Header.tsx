import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { get, post } from "../api";

interface User {
  username: string;
}

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);

  const isLoggedIn = location.pathname !== "/login";

  const getuserdata = useCallback(async () => {
    try {
      const res = await get("/username");

      if (!res.ok) {
        navigate("/login");
        return;
      }

      setUser({ username: res.data.username });
    } catch (error) {
      console.error(error);
    }
  }, [navigate]);

  useEffect(() => {
    getuserdata();
  }, [getuserdata]);

  const handleLogout = async () => {
    localStorage.removeItem("token");

    await post("/logout");

    navigate("/login");
  };
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">✈️ FlightHub</h1>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
