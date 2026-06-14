import { useState } from "react";
import { loginUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

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
      const res = await loginUser(formData);

      localStorage.setItem("token", res.data.token);

      // ADD THIS
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      toast.success("Login Successful");

      navigate("/home");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Invalid email or password"
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

    {/* Login Card */}
    <div className="relative z-10 w-full max-w-md px-4">
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">

        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-red-500">
            MovieFlix
          </h1>

          <p className="text-gray-300 mt-2">
            Welcome Back
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
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
              placeholder="Enter your password"
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
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-300 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-red-400 hover:text-red-300 font-semibold"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  </div>
);
}

export default Login;