import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getMovieById,
  getMovies,
  likeMovie,
} from "../services/movieService";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showTrailer, setShowTrailer] =
  useState(false);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [likedMovies, setLikedMovies] = useState(
  JSON.parse(localStorage.getItem("user") || "{}")?.likedMovies || []
);

  const [watchLaterMovies, setWatchLaterMovies] = useState(
  JSON.parse(localStorage.getItem("watchLater")) || []
);

  useEffect(() => {
    fetchMovie();
    fetchAllMovies();
  }, [id]);

  const fetchMovie = async () => {
    try {
      const res = await getMovieById(id);
      setMovie(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load movie");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllMovies = async () => {
    try {
      const res = await getMovies();
      setAllMovies(res.data?.movies || res.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (movieId) => {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    try {
      const alreadyLiked = likedMovies.some(
        (id) => id.toString() === movieId.toString()
      );

      let updatedLikedMovies;

      if (alreadyLiked) {
        updatedLikedMovies = likedMovies.filter(
          (id) => id.toString() !== movieId.toString()
        );

        toast.success("Movie removed 💔");
      } else {
        updatedLikedMovies = [
          ...likedMovies,
          movieId,
        ];

        toast.success("Movie liked ❤️");
      }

      setLikedMovies(updatedLikedMovies);

      const updatedUser = {
        ...user,
        likedMovies: updatedLikedMovies,
      };

      setUser(updatedUser);

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      await likeMovie({
        userId: user._id,
        movieId,
      });

    } catch (error) {
      console.log(error);
      toast.error("Action failed");
    }
  };

  const handleWatchLater = (movieId) => {
  const alreadyAdded = watchLaterMovies.some(
    (id) => id.toString() === movieId.toString()
  );

  let updatedMovies;

  if (alreadyAdded) {
    updatedMovies = watchLaterMovies.filter(
      (id) => id.toString() !== movieId.toString()
    );

    toast.success("Removed from Watch Later");
  } else {
    updatedMovies = [...watchLaterMovies, movieId];

    toast.success("Added to Watch Later 📌");
  }

  setWatchLaterMovies(updatedMovies);

  localStorage.setItem(
    "watchLater",
    JSON.stringify(updatedMovies)
  );
};

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center text-white text-2xl">
        Loading...
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center text-white text-2xl">
        Movie not found
      </div>
    );
  }

  const similarMovies = allMovies.filter(
    (m) =>
      m.genre === movie.genre &&
      m._id !== movie._id
  );

  const isLiked = likedMovies.some(
    (movieId) =>
      movieId.toString() === movie._id.toString()
  );

  const isWatchLater = watchLaterMovies.some(
  (movieId) =>
    movieId.toString() === movie._id.toString()
);

const getEmbedUrl = (url) => {
  if (!url) return "";

  // Already an embed URL
  if (url.includes("/embed/")) {
    return url.split("?")[0];
  }

  // Standard YouTube URL
  const watchMatch = url.match(/[?&]v=([^&]+)/);

  if (watchMatch) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`;
  }

  // Short youtu.be URL
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);

  if (shortMatch) {
    return `https://www.youtube.com/embed/${shortMatch[1]}`;
  }

  return "";
};

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1
            onClick={() => navigate("/")}
            className="text-3xl font-extrabold text-red-500 cursor-pointer"
          >
            MovieFlix
          </h1>

          <button
            onClick={() => navigate("/")}
            className="bg-slate-800 hover:bg-slate-700 px-5 py-2 rounded-lg font-semibold"
          >
            ← Home
          </button>

        </div>
      </nav>

      {/* Movie Details */}
      <section className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid lg:grid-cols-2 gap-12">

          <div>
            <img
            src={movie.poster}
            alt={movie.title}
            className="w-[500px] h-[650px] object-cover rounded-3xl shadow-2xl"
            />
          </div>

          <div className="flex flex-col justify-center">

            <h1 className="text-5xl font-bold">
              {movie.title}
            </h1>

            <div className="flex gap-4 mt-5 flex-wrap">

              <span className="bg-red-500/20 text-red-400 px-4 py-2 rounded-full">
                {movie.genre}
              </span>

              <span className="bg-slate-800 px-4 py-2 rounded-full">
                {movie.year}
              </span>

              <span className="bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full">
                ⭐ {movie.rating}
              </span>

            </div>

            <p className="text-gray-300 text-lg leading-relaxed mt-8">
              {movie.description}
            </p>

            <div className="flex gap-4 mt-8 flex-wrap">

  <button
    onClick={() => handleLike(movie._id)}
    className={`px-8 py-4 rounded-xl font-bold transition ${
      isLiked
        ? "bg-red-500 hover:bg-red-600"
        : "bg-slate-700 hover:bg-slate-600"
    }`}
  >
    {isLiked
      ? "❤️ Liked"
      : "🤍 Like Movie"}
  </button>

  <button
    onClick={() =>
      handleWatchLater(movie._id)
    }
    className={`px-8 py-4 rounded-xl font-bold transition ${
      isWatchLater
        ? "bg-blue-500 hover:bg-blue-600"
        : "bg-slate-700 hover:bg-slate-600"
    }`}
  >
    {isWatchLater
      ? "🔖 Saved"
      : "📌 Watch Later"}
  </button>

  <button
  onClick={() => setShowTrailer(true)}
  className="px-8 py-4 rounded-xl font-bold bg-red-600 hover:bg-red-700 transition"
>
  ▶ Watch Trailer
</button>

</div>

          </div>

        </div>

      </section>

      {/* Similar Movies */}
      <section className="max-w-7xl mx-auto px-6 pb-16">

        <h2 className="text-4xl font-bold mb-8">
          Similar Movies
        </h2>

        {similarMovies.length === 0 ? (
          <p className="text-gray-400">
            No similar movies found.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

            {similarMovies.slice(0, 8).map((movie) => (
              <div
                key={movie._id}
                onClick={() =>
                  navigate(`/movie/${movie._id}`)
                }
                className="cursor-pointer bg-slate-900 rounded-2xl overflow-hidden hover:scale-105 transition"
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-72 object-cover"
                />

                <div className="p-4">
                  <h3 className="font-bold">
                    {movie.title}
                  </h3>

                  <p className="text-gray-400 text-sm mt-2">
                    {movie.genre}
                  </p>
                </div>
              </div>
            ))}

          </div>
        )}

      </section>

      {/* Trailer Modal */}
{showTrailer && (
  <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[999]">

    <div className="relative w-[90%] max-w-5xl">

      <button
        onClick={() => setShowTrailer(false)}
        className="absolute -top-12 right-0 text-white text-3xl hover:text-red-500"
      >
        ✕
      </button>

      <div className="rounded-2xl overflow-hidden shadow-2xl">

        <iframe
  className="w-full aspect-video"
  src={`${getEmbedUrl(movie.trailer)}?autoplay=1`}
  title={movie.title}
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
/>

      </div>

    </div>

  </div>
)}

    </div>
  );
}

export default MovieDetails;