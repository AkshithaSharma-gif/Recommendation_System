
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getLikedMovies,
  likeMovie,
} from "../services/movieService";

import MovieCard from "../components/MovieCard";

function LikedMovies() {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  useEffect(() => {
    fetchLikedMovies();
  }, []);

  const fetchLikedMovies = async () => {
    try {
      const res = await getLikedMovies(user._id);

      setMovies(res.data?.likedMovies || res.data || []);
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to load liked movies"
      );
    }
  };

  const handleLike = async (movieId) => {
    try {
      const updatedLikedMovies =
        user.likedMovies.filter(
          (id) =>
            id.toString() !==
            movieId.toString()
        );

      const updatedUser = {
        ...user,
        likedMovies: updatedLikedMovies,
      };

      setUser(updatedUser);

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      setMovies((prevMovies) =>
        prevMovies.filter(
          (movie) =>
            movie._id.toString() !==
            movieId.toString()
        )
      );

      toast.success(
        "Removed from liked 💔"
      );

      await likeMovie({
        userId: user._id,
        movieId,
      });
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to update liked movies"
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

        <div className="mt-6 bg-gradient-to-r from-red-600 to-red-500 rounded-2xl p-6">

          <h3 className="text-red-100">
            Total Liked Movies
          </h3>

          <p className="text-4xl font-bold mt-2">
            {movies.length}
          </p>

        </div>

      </div>

      {/* Movies */}
      <div className="max-w-7xl mx-auto px-6 pb-10">

        {movies.length === 0 ? (
          <div className="text-center py-20">

            <div className="text-7xl mb-6">
              ❤️
            </div>

            <h2 className="text-2xl font-bold">
              No liked movies yet
            </h2>

            <p className="text-gray-400 mt-2">
              Start liking movies to see them here.
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-6 bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg font-semibold"
            >
              Browse Movies
            </button>

          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

            {movies.map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
                liked={true}
                handleLike={handleLike}
              />
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default LikedMovies;