import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getMovies, likeMovie } from "../services/movieService";
import MovieCard from "../components/MovieCard";

function Home() {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

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

      toast.success("Movie liked ❤️");
    } catch (error) {
      console.log(error);
      toast.error("Failed to like movie");
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

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/70 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          
          <h1 className="text-3xl font-extrabold text-red-500 tracking-wide">
            MovieFlix
          </h1>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-full">
              <span>👤</span>
              <span className="text-gray-300">
                {user?.username || "Guest"}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <section className="relative h-[500px] flex items-center">
        <img
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba"
          alt="banner"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-extrabold">
            Unlimited Movies,
            <br />
            <span className="text-red-500">Recommendations</span>
          </h1>

          <p className="mt-4 text-gray-300 max-w-xl text-lg">
            Discover trending movies, like your favorites,
            and get personalized recommendations powered by AI.
          </p>

          <div className="flex gap-4 mt-8">
            <button className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg font-bold">
              Browse Movies
            </button>

            <button className="bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-lg font-bold">
              For Me
            </button>
          </div>
        </div>
      </section>

      {/* Dashboard Cards */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-gray-400">Total Movies</h3>
            <p className="text-4xl font-bold mt-2">
              {movies.length}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-gray-400">Liked Movies</h3>
            <p className="text-4xl font-bold mt-2">
              {user?.likedMovies?.length || 0}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-gray-400">User</h3>
            <p className="text-xl font-semibold mt-2">
              {user?.username || "Guest"}
            </p>
          </div>

        </div>
      </section>

      {/* Search */}
      <section className="max-w-7xl mx-auto px-6 mb-10">
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 outline-none focus:border-red-500"
        />
      </section>

      {/* Movies */}
      <section className="max-w-7xl mx-auto px-6 pb-16">

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">
            Trending Movies
          </h2>

          <span className="text-gray-400">
            {filteredMovies.length} Movies
          </span>
        </div>

        {filteredMovies.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold">
              No Movies Found
            </h3>

            <p className="text-gray-400 mt-2">
              Try searching another movie.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredMovies.map((movie) => (
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