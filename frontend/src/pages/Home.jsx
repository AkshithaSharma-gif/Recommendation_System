import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getMovies, likeMovie } from "../services/movieService";
import MovieCard from "../components/MovieCard";

function Home() {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  // ✅ ADDED ONLY THIS
  const [sortBy, setSortBy] = useState("default");

  const [selectedGenre, setSelectedGenre] = useState("All");

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [likedMovies, setLikedMovies] = useState(
    JSON.parse(localStorage.getItem("user"))?.likedMovies || []
  );

  const [watchLaterMovies, setWatchLaterMovies] = useState(
    JSON.parse(localStorage.getItem("watchLater")) || []
  );

  useEffect(() => {
    fetchMovies();

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await getMovies();
      setMovies(res.data?.movies || []);
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
      const alreadyLiked = likedMovies.some(
        (id) => id.toString() === movieId.toString()
      );

      let updatedLikedMovies;

      if (alreadyLiked) {
        updatedLikedMovies = likedMovies.filter(
          (id) => id.toString() !== movieId.toString()
        );
        toast.success("Removed from liked 💔");
      } else {
        updatedLikedMovies = [...likedMovies, movieId];
        toast.success("Added to liked ❤️");
      }

      setLikedMovies(updatedLikedMovies);

      const updatedUser = {
        ...user,
        likedMovies: updatedLikedMovies,
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      await likeMovie({
        userId: user._id,
        movieId,
      });
    } catch (error) {
      console.log(error);
      toast.error("Action failed");
    }
  };

const handleWatchLater = (
movieId
) => {
const alreadyAdded =
watchLaterMovies.some(
(id) =>
id.toString() ===
movieId.toString()
);


let updatedMovies;

if (alreadyAdded) {
  updatedMovies =
    watchLaterMovies.filter(
      (id) =>
        id.toString() !==
        movieId.toString()
    );

  toast.success(
    "Removed from Watch Later"
  );
} else {
  updatedMovies = [
    ...watchLaterMovies,
    movieId,
  ];

  toast.success(
    "Added to Watch Later 📌"
  );
}

setWatchLaterMovies(
  updatedMovies
);

localStorage.setItem(
  "watchLater",
  JSON.stringify(updatedMovies)
);


};


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged Out");

    setTimeout(() => {
      navigate("/login");
    }, 800);
  };

  // ✅ FILTER (UNCHANGED LOGIC)
// const safeMovies = Array.isArray(movies) ? movies : [];

// const filteredMovies = safeMovies
//   .filter((movie) => {
//     const matchesSearch = movie.title
//       .toLowerCase()
//       .includes(search.toLowerCase());

//     const matchesGenre =
//       selectedGenre === "All" || movie.genre === selectedGenre;

//     return matchesSearch && matchesGenre;
//   });

//     // ✅ ONLY ADD SORTING HERE (SAFE)
//     .sort((a, b) => {
//       switch (sortBy) {
//         case "az":
//           return a.title.localeCompare(b.title);

//         case "za":
//           return b.title.localeCompare(a.title);

//         case "ratingHigh":
//           return b.rating - a.rating;

//         case "ratingLow":
//           return a.rating - b.rating;

//         case "new":
//           return b.year - a.year;

//         case "old":
//           return a.year - b.year;

//         default:
//           return 0;
//       }
//     });

const safeMovies = Array.isArray(movies) ? movies : [];

const filteredMovies = safeMovies
  .filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesGenre =
      selectedGenre === "All" || movie.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  })
  .sort((a, b) => {
    switch (sortBy) {
      case "az":
        return a.title.localeCompare(b.title);

      case "za":
        return b.title.localeCompare(a.title);

      case "ratingHigh":
        return b.rating - a.rating;

      case "ratingLow":
        return a.rating - b.rating;

      default:
        return 0;
    }
  });


  const genres = [
    "All",
    ...new Set(movies.map((movie) => movie.genre)),
  ];

  return (
    <div className="min-h-screen bg-black text-white">

      {/* NAVBAR (UNCHANGED) */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/70 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1
            onClick={() => navigate("/")}
            className="text-3xl font-extrabold text-red-500 cursor-pointer"
          >
            MovieFlix
          </h1>

          <div className="flex items-center gap-3">

            <button onClick={() => navigate("/recommendations")}
              className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg"
            >
              🎯 For You
            </button>

            <button onClick={() => navigate("/liked")}
              className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg"
            >
              ❤️ Liked Movies
            </button>

            <button
          onClick={() =>
            navigate(
              "/watchlater"
            )
          }
          className="bg-slate-800 hover:bg-slate-700 border border-slate-600 px-4 py-2 rounded-lg font-semibold transition"
        >
          📌 Watch Later
        </button>

            <button onClick={() => navigate("/profile")}
              className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg"
            >
              👤 Profile
            </button>

          </div>
        </div>
      </nav>

      {/* HERO (UNCHANGED) */}
      <section className="relative h-[550px] flex items-center">
        <img
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-extrabold">
            Discover Movies
            <br />
            <span className="text-red-500">You'll Love</span>
          </h1>
        </div>
      </section>

      

      {/* DASHBOARD (UNCHANGED) */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-gray-400">Total Movies</h3>
            <p className="text-4xl font-bold mt-2">{movies.length}</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-gray-400">Liked Movies</h3>
            <p className="text-4xl font-bold mt-2">{likedMovies.length}</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-gray-400">Watch Later</h3>
            <p className="text-4xl font-bold mt-2">{watchLaterMovies.length}</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-gray-400">User</h3>
            <p className="text-xl font-bold mt-2">
              {user?.username || "Guest"}
            </p>
          </div>

        </div>
      </section>

      {/* SEARCH (UNCHANGED) */}
      <section className="max-w-7xl mx-auto px-6 mb-10">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search movies..."
          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4"
        />
      </section>

      {/* GENRE FILTER (UNCHANGED) */}
      <section className="max-w-7xl mx-auto px-6 mb-8">
        <div className="flex flex-wrap gap-3">

          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-2 rounded-full ${
                selectedGenre === genre
                  ? "bg-red-500"
                  : "bg-slate-800"
              }`}
            >
              {genre}
            </button>
          ))}

        </div>
      </section>

      {/* SORT (NEW BUT SAFE) */}
      <section className="max-w-7xl mx-auto px-6 mb-6 flex justify-end">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-lg"
        >
          <option value="default">Sort By</option>
          <option value="az">A → Z</option>
          <option value="za">Z → A</option>
          <option value="ratingHigh">⭐ High Rating</option>
          <option value="ratingLow">⭐ Low Rating</option>
          <option value="new">🆕 Newest</option>
          <option value="old">📅 Oldest</option>
        </select>
      </section>

      {/* MOVIES (UNCHANGED) */}
      <section className="max-w-7xl mx-auto px-6 pb-16">

        <div className="flex justify-between mb-8">
          <h2 className="text-3xl font-bold">Browse</h2>
          <span className="text-gray-400">{filteredMovies.length}</span>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredMovies.map((movie) => (
            <MovieCard
  key={movie._id}
  movie={movie}
  handleLike={handleLike}
  liked={likedMovies.some(
    (id) => id.toString() === movie._id.toString()
  )}
  watchLater={watchLaterMovies.some(
    (id) => id.toString() === movie._id.toString()
  )}
  handleWatchLater={handleWatchLater}
/>
          ))}
        </div>

      </section>
    </div>
  );
}

export default Home;