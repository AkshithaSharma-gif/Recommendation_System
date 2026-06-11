import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { getLikedMovies } from "../services/movieService";

import MovieCard from "../components/MovieCard";

function LikedMovies() {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    fetchLikedMovies();
  }, []);

  const fetchLikedMovies = async () => {
    try {
      const res = await getLikedMovies(user._id);

      setMovies(res.data);
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to load liked movies"
      );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Navbar */}
      <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">

          <h1
            className="text-3xl font-bold text-red-500 cursor-pointer"
            onClick={() => navigate("/")}
          >
            MovieFlix
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

        <h1 className="text-4xl font-bold mb-2">
          ❤️ My Liked Movies
        </h1>

        <p className="text-gray-400">
          Movies you've added to your favorites
        </p>

      </div>

      {/* Movies */}
      <div className="max-w-7xl mx-auto px-6 pb-10">

        {movies.length === 0 ? (
          <div className="text-center py-20">

            <h2 className="text-2xl font-bold">
              No liked movies yet
            </h2>

            <p className="text-gray-400 mt-2">
              Start liking movies to see them here.
            </p>

          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

            {movies.map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
                handleLike={() => {}}
              />
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default LikedMovies;