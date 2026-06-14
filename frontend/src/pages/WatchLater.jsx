import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getMovies } from "../services/movieService";
import MovieCard from "../components/MovieCard";

function WatchLater() {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [watchLaterMovies, setWatchLaterMovies] = useState(
    JSON.parse(localStorage.getItem("watchLater")) || []
  );

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await getMovies();
      setMovies(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load movies");
    }
  };

  const handleWatchLater = (movieId) => {
    const updatedMovies = watchLaterMovies.filter(
      (id) => id.toString() !== movieId.toString()
    );

    setWatchLaterMovies(updatedMovies);

    localStorage.setItem(
      "watchLater",
      JSON.stringify(updatedMovies)
    );

    toast.success("Removed from Watch Later");
  };

  const safeMovies = Array.isArray(movies) ? movies : [];

const savedMovies = safeMovies.filter((movie) =>
  watchLaterMovies.some(
    (id) => id.toString() === movie._id.toString()
  )
);

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/70 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1
            onClick={() => navigate("/")}
            className="text-3xl font-extrabold text-red-500 cursor-pointer"
          >
            MovieFlix
          </h1>

          <div className="flex gap-3">

            <button
              onClick={() => navigate("/")}
              className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg"
            >
              🏠 Home
            </button>

            <button
              onClick={() => navigate("/liked")}
              className="bg-red-900 hover:bg-red-800 px-4 py-2 rounded-lg"
            >
              ❤️ Liked Movies
            </button>

          </div>

        </div>
      </nav>

      {/* Hero */}
      <section className="py-14 border-b border-slate-800">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-extrabold">
            📌 Watch Later
          </h1>

          <p className="text-gray-400 mt-4">
            Movies you've saved for later.
          </p>

        </div>

      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 py-8">

        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-6">

          <h3 className="text-blue-100">
            Saved Movies
          </h3>

          <p className="text-4xl font-bold mt-2">
            {savedMovies.length}
          </p>

        </div>

      </section>

      {/* Movies */}
      <section className="max-w-7xl mx-auto px-6 pb-16">

        {savedMovies.length === 0 ? (
          <div className="text-center py-20">

            <div className="text-7xl mb-6">
              📌
            </div>

            <h2 className="text-3xl font-bold">
              No Movies Saved Yet
            </h2>

            <p className="text-gray-400 mt-4">
              Add movies to Watch Later from the Home page.
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-8 bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold"
            >
              Browse Movies
            </button>

          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">

              <h2 className="text-3xl font-bold">
                Your Watchlist
              </h2>

              <span className="text-gray-400">
                {savedMovies.length} Movies
              </span>

            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

              {savedMovies.map((movie) => (
                <MovieCard
                  key={movie._id}
                  movie={movie}
                  watchLater={true}
                  handleWatchLater={handleWatchLater}
                />
              ))}

            </div>
          </>
        )}

      </section>

    </div>
  );
}

export default WatchLater;