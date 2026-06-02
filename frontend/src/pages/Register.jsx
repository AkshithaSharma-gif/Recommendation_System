import { useState } from "react";
import { registerUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await registerUser(formData);

      toast.success("Registration Successful 🎉");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/75"></div>

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">

          <div className="text-center mb-8">
            <h1 className="text-5xl font-extrabold text-red-500">
              MovieFlix
            </h1>

            <p className="text-gray-300 mt-2">
              Create Your Account
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label className="text-gray-300 text-sm block mb-2">
                Username
              </label>

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
                className="w-full p-4 bg-slate-900/70 border border-slate-700 rounded-xl text-white outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="text-gray-300 text-sm block mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full p-4 bg-slate-900/70 border border-slate-700 rounded-xl text-white outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="text-gray-300 text-sm block mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
                className="w-full p-4 bg-slate-900/70 border border-slate-700 rounded-xl text-white outline-none focus:border-red-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-500 hover:bg-red-600 text-white p-4 rounded-xl font-bold transition-all duration-300"
            >
              {loading
                ? "Creating Account..."
                : "Register"}
            </button>
          </form>

          <p className="text-center text-gray-300 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-red-400 hover:text-red-300 font-semibold"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register;