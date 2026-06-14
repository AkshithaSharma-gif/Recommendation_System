
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getMovies } from "../services/movieService";

function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {};

  // ✅ SAFE FIX
  const likedMovies = Array.isArray(user?.likedMovies)
    ? user.likedMovies
    : [];

  const watchLaterMovies = Array.isArray(
    JSON.parse(localStorage.getItem("watchLater"))
  )
    ? JSON.parse(localStorage.getItem("watchLater"))
    : [];

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await getMovies();

      // ✅ SAFE FIX
      setMovies(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load profile data");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged Out");

    setTimeout(() => {
      navigate("/login");
    }, 800);
  };

  const safeMovies = Array.isArray(movies) ? movies : [];

  // ✅ SAFE FIX (string-safe comparison)
  const likedMovieObjects = safeMovies.filter((movie) =>
    likedMovies.some(
      (id) => id?.toString() === movie._id?.toString()
    )
  );

  const genreCount = {};

  likedMovieObjects.forEach((movie) => {
    genreCount[movie.genre] =
      (genreCount[movie.genre] || 0) + 1;
  });

  const favoriteGenre =
    Object.keys(genreCount).length > 0
      ? Object.keys(genreCount).reduce((a, b) =>
          genreCount[a] > genreCount[b] ? a : b
        )
      : "None";

  const engagement =
    safeMovies.length > 0
      ? Math.round(
          ((likedMovies.length + watchLaterMovies.length) /
            safeMovies.length) *
            100
        )
      : 0;

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1
            onClick={() => navigate("/home")}
            className="text-3xl font-extrabold text-red-500 cursor-pointer"
          >
            MovieFlix
          </h1>

          <button
            onClick={() => navigate("/home")}
            className="bg-slate-800 hover:bg-slate-700 px-5 py-2 rounded-lg font-semibold"
          >
            🏠 Home
          </button>

        </div>
      </nav>

      {/* Profile Header */}
      <section className="max-w-6xl mx-auto px-6 py-10">

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between">

            <div>
              <h1 className="text-5xl font-bold mb-2">
                👤 {user.username || "Guest"}
              </h1>

              <p className="text-gray-400 text-lg">
                {user.email || "No Email"}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="mt-6 md:mt-0 bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl font-bold transition"
            >
              🚪 Logout
            </button>

          </div>

        </div>

      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-6">

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-gray-400">❤️ Liked Movies</h3>
            <p className="text-4xl font-bold mt-3">
              {likedMovies.length}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-gray-400">📌 Watch Later</h3>
            <p className="text-4xl font-bold mt-3">
              {watchLaterMovies.length}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-gray-400">🎬 Favorite Genre</h3>
            <p className="text-3xl font-bold mt-3 text-red-400">
              {favoriteGenre}
            </p>
          </div>

        </div>

      </section>

      {/* Activity Score */}
      <section className="max-w-6xl mx-auto px-6 py-10">

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

          <h2 className="text-3xl font-bold mb-6">
            📊 Movie Activity
          </h2>

          <div className="w-full bg-slate-700 rounded-full h-5 overflow-hidden">

            <div
              className="bg-red-500 h-full transition-all duration-700"
              style={{ width: `${engagement}%` }}
            />

          </div>

          <p className="mt-4 text-gray-300">
            Engagement Score:
            <span className="text-red-400 font-bold ml-2">
              {engagement}%
            </span>
          </p>

        </div>

      </section>

      {/* Summary */}
      <section className="max-w-6xl mx-auto px-6 pb-12">

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

          <h2 className="text-3xl font-bold mb-6">
            📈 Profile Summary
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div>
              <p className="text-gray-400">Total Movies</p>
              <h3 className="text-3xl font-bold mt-2">
                {safeMovies.length}
              </h3>
            </div>

            <div>
              <p className="text-gray-400">Movies Liked</p>
              <h3 className="text-3xl font-bold mt-2 text-red-400">
                {likedMovies.length}
              </h3>
            </div>

            <div>
              <p className="text-gray-400">Saved For Later</p>
              <h3 className="text-3xl font-bold mt-2 text-blue-400">
                {watchLaterMovies.length}
              </h3>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Profile;