import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getMovies } from "../services/movieService";

function AdminDashboard() {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await getMovies();
      setMovies(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load movies");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Navbar */}
      <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">

          <h1 className="text-3xl font-bold text-red-500">
            🎬 Admin Panel
          </h1>

          <button
            onClick={() => navigate("/")}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
          >
            Back Home
          </button>

        </div>
      </nav>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-4xl font-bold">
          Welcome, {user.username}
        </h2>

        <p className="text-gray-400 mt-2">
          Manage your movie database
        </p>
      </div>

      {/* Actions */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <button
          onClick={() => navigate("/admin/add")}
          className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-bold"
        >
          ➕ Add New Movie
        </button>
      </div>

      {/* Movies Table */}
      <div className="max-w-7xl mx-auto px-6 pb-16">

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">

          {movies.map((movie) => (
            <div
              key={movie._id}
              className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800"
            >

              <img
                src={movie.poster}
                className="w-full h-60 object-cover"
              />

              <div className="p-4">

                <h3 className="font-bold text-lg">
                  {movie.title}
                </h3>

                <p className="text-gray-400 text-sm">
                  {movie.genre}
                </p>

                <div className="flex gap-2 mt-4">

                  <button className="bg-red-500 px-3 py-1 rounded text-sm">
                    Delete
                  </button>

                  <button className="bg-slate-700 px-3 py-1 rounded text-sm">
                    Edit
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;