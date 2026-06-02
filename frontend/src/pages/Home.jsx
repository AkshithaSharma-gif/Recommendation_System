import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getMovies, likeMovie } from "../services/movieService";
import MovieCard from "../components/MovieCard";

function Home() {
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

  const handleLike = async (movieId) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    try {
      await likeMovie({
        userId: user._id,
        movieId,
      });

      toast.success("Movie liked successfully ❤️");
    } catch (error) {
      console.log(error);
      toast.error("Failed to like movie");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black">
      
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur border-b border-slate-800 px-6 md:px-10 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-red-500">
            MovieFlix
          </h1>

          <div className="flex items-center gap-4">
            <span className="hidden md:block text-gray-300">
              Welcome,{" "}
              <span className="text-white font-semibold">
                {user?.username || "Guest"}
              </span>
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white font-semibold transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 md:px-10 py-16">
        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
          Discover Amazing
          <span className="text-red-500"> Movies</span>
        </h1>

        <p className="text-gray-400 mt-4 max-w-2xl text-lg">
          Like movies you enjoy and get personalized recommendations
          based on your interests.
        </p>

        <div className="mt-8 flex gap-4">
          <button className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg text-white font-semibold">
            Browse Movies
          </button>

          <button className="bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-lg text-white font-semibold">
            Recommendations
          </button>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 md:px-10 mb-10">
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h3 className="text-gray-400 uppercase text-sm tracking-wider">
            Total Movies
          </h3>

          <p className="text-4xl font-bold text-white mt-2">
            {movies.length}
          </p>
        </div>
      </section>

      {/* Movies */}
      <section className="px-6 md:px-10 pb-12">
        <h2 className="text-white text-3xl font-bold mb-8">
          Trending Movies
        </h2>

        {movies.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-white text-2xl">
              No Movies Available
            </h3>

            <p className="text-gray-400 mt-2">
              Add movies from the backend.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {movies.map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
                handleLike={handleLike}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;