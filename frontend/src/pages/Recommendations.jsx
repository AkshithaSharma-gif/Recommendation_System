
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecommendations } from "../services/movieService";
import MovieCard from "../components/MovieCard";
import toast from "react-hot-toast";

function Recommendations() {
  const navigate = useNavigate();

  const [recommendations, setRecommendations] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      fetchRecommendations();
    }
  }, []);

  const fetchRecommendations = async () => {
    try {
      const res = await getRecommendations(user._id);

      setRecommendations(
        res.data.recommendations || []
      );

      setLikedMovies(
        res.data.likedMovies || []
      );

      

    } catch (error) {
      console.log(error);
      toast.error("Failed to load recommendations");
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

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/70 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1
            onClick={() => navigate("/home")}
            className="text-3xl font-extrabold text-red-500 tracking-wide cursor-pointer"
          >
            MovieFlix
          </h1>

          <div className="flex items-center gap-3">

            <div className="hidden md:flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-full">
              <span>👤</span>
              <span className="text-gray-300">
                {user?.username || "Guest"}
              </span>
            </div>

            <button
              onClick={() => navigate("/home")}
              className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg font-semibold transition"
            >
              🏠 Home
            </button>

            <button
              onClick={() => navigate("/liked")}
              className="bg-red-900 hover:bg-red-800 px-4 py-2 rounded-lg font-semibold transition"
            >
              ❤️ Liked Movies
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold transition"
            >
              Logout
            </button>

          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-[320px] flex items-center">

        <img
          src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c"
          alt="recommendations"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">

          <h1 className="text-5xl md:text-6xl font-extrabold">
            Recommended
            <span className="text-red-500">
              {" "}For You
            </span>
          </h1>

          <p className="text-gray-300 mt-4 text-lg max-w-2xl">
            Personalized recommendations powered by
            Content-Based and Collaborative Filtering.
          </p>

        </div>

      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 py-8">

        <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-2xl p-6 shadow-xl">

          <h3 className="text-red-100">
            Recommended Movies
          </h3>

          <p className="text-4xl font-bold mt-2">
            {recommendations.length}
          </p>

        </div>

      </section>

      {/* Recently Liked */}
      {likedMovies.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 mb-10">

          <h2 className="text-2xl font-bold mb-5">
            ❤️ Movies You Liked
          </h2>

          <div className="flex flex-wrap gap-3">

            {likedMovies.map((movieId) => (
  <span
    key={movieId}
    className="bg-red-500/20 text-red-400 px-4 py-2 rounded-full"
  >
    {movieId}
  </span>
))}

          </div>

        </section>
      )}

      {/* Recommendations */}
<section className="max-w-7xl mx-auto px-6 pb-16">

  {recommendations.length === 0 ? (
    <div className="text-center py-20">

      <div className="text-7xl mb-6">
        🎬
      </div>

      <h2 className="text-3xl font-bold">
        Like some movies first ❤️
      </h2>

      <p className="text-gray-400 mt-4">
        Recommendations will appear here.
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-8 bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg font-semibold"
      >
        Browse Movies
      </button>

    </div>
  ) : (
    <>
      <div className="flex justify-between items-center mb-8">

        <h2 className="text-3xl font-bold">
          Recommended For You
        </h2>

        <span className="text-gray-400">
          {recommendations.length} Movies
        </span>

      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {recommendations.map((item) => (
          <div
            key={item.movie._id}
            className="relative"
          >

            {/* Recommendation Type Badge */}
            <div
              className={`absolute top-3 left-3 z-20 px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
                item.type === "Collaborative"
                  ? "bg-blue-600 text-white"
                  : "bg-green-600 text-white"
              }`}
            >
              {item.type}
            </div>

            <MovieCard
              movie={item.movie}
              handleLike={() => {}}
              liked={false}
            />

            {/* Reason */}
            <div className="mt-3 rounded-xl bg-gradient-to-r from-red-500/10 to-transparent border-l-4 border-red-500 p-3">

            <p className="text-sm text-gray-200">
              {item.reason}
            </p>

</div>

          </div>
        ))}

      </div>

    </>
  )}

</section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <h2 className="text-2xl font-bold text-red-500">
            MovieFlix
          </h2>

          <p className="text-gray-500 mt-2">
            Hybrid Movie Recommendation System
          </p>

          <p className="text-gray-600 text-sm mt-4">
            © 2026 All Rights Reserved
          </p>

        </div>

      </footer>

    </div>
  );
}

export default Recommendations;