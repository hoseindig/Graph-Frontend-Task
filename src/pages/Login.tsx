import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post, setAuthToken } from "../api";
import CustomModal from "../components/CustomModal";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await post<{ token?: string; user?: { email: string } }>(
        "/login",
        {
          username,
          password,
        },
      );

      if (!res.ok) {
        setError(res.error?.message ?? "Login failed");
        setLoading(false);
        return;
      }

      const data = res.data ?? {};
      const token = data.token;
      if (token) setAuthToken(token);

      navigate("/dashboard");
    } catch (err: any) {
      setError(err?.message ?? "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Login</h1>
          <p className="text-gray-500 mt-2">Sign in to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="text"
              value={username}
              onChange={(e) => setUername(e.target.value)}
              placeholder="Enter your Username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>

      {/* Error Modal */}
      <CustomModal
        isOpen={!!error}
        onClose={() => setError(null)}
        title="Login Failed"
        cancelText="Close"
        size="sm"
      >
        <div className="text-center">
          <p className="text-gray-700 mb-4">{error}</p>
          <p className="text-sm text-gray-500">
            Please check your username and password and try again.
          </p>
        </div>
      </CustomModal>
    </div>
  );
};

export default Login;
