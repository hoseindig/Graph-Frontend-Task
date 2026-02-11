import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { post } from "../api";
import { useUser } from "../context/UserContext";
import { useFlights } from "../context/FlightsContext";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userContext = useUser();
  const { loadFlights } = useFlights();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const isLoggedIn = location.pathname !== "/login" && !!userContext;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsPopoverOpen(false);
      }
    };

    if (isPopoverOpen)
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isPopoverOpen]);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    try {
      await post("/logout");
    } catch (err) {
      console.error(err);
    }
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">✈️ FlightHub</h1>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4 relative">
            {isLoggedIn && (
              <div ref={popoverRef} className="relative">
                <button
                  onClick={() => setIsPopoverOpen((s) => !s)}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center space-x-3"
                >
                  <span className="font-medium">
                    {userContext?.isLoading ? "..." : userContext?.user?.username}
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform ${isPopoverOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isPopoverOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-semibold text-gray-800">
                        {userContext?.user?.username}
                      </p>
                      <p className="text-xs text-gray-500">User Account</p>
                      <div className="px-2 py-1">
                        <button
                          onClick={() => loadFlights(1)}
                          className="w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50 transition mb-2 rounded"
                        >
                          Load Flights
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition flex items-center space-x-2"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
