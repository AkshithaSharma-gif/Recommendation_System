import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getMovies, likeMovie } from "../services/movieService";
import MovieCard from "../components/MovieCard";

function Home() {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [likedMovies, setLikedMovies] = useState(
    JSON.parse(localStorage.getItem("user"))?.likedMovies || []
  );

  useEffect(() => {
    fetchMovies();

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
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

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/70 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1
            onClick={() => navigate("/")}
            className="text-3xl font-extrabold text-red-500 cursor-pointer"
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

            {/* FOR YOU BUTTON*/}
            <button
              onClick={() => navigate("/recommendations")}
              className="bg-slate-800 hover:bg-slate-700 border-slate-600 px-4 py-2 rounded-lg font-semibold transition"
            >
              For You
            </button>

            {/* LIKED BUTTON */}
            <button
              onClick={() => navigate("/liked")}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-600 px-4 py-2 rounded-lg font-semibold transition"
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

      {/* HERO */}
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

          <p className="mt-5 text-gray-300 max-w-2xl">
            Explore movies, like your favorites, and get smart recommendations.
          </p>

          <div className="flex gap-4 mt-8">

            <button className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg font-bold">
              Browse Movies
            </button>

            <button
              onClick={() => navigate("/recommendations")}
              className="bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-lg font-bold"
            >
              For Me
            </button>

          </div>
        </div>
      </section>

      {/* DASHBOARD */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-gray-400">Total Movies</h3>
            <p className="text-4xl font-bold mt-2">{movies.length}</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-gray-400">Liked Movies</h3>
            <p className="text-4xl font-bold mt-2">
              {likedMovies.length}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-gray-400">User</h3>
            <p className="text-xl font-bold mt-2">
              {user?.username || "Guest"}
            </p>
          </div>

        </div>
      </section>

      {/* SEARCH */}
      <section className="max-w-7xl mx-auto px-6 mb-10">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search movies..."
          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4"
        />
      </section>

      {/* MOVIES */}
      <section className="max-w-7xl mx-auto px-6 pb-16">

        <div className="flex justify-between mb-8">
          <h2 className="text-3xl font-bold">Trending Movies</h2>
          <span className="text-gray-400">{filteredMovies.length}</span>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              handleLike={handleLike}
              liked={likedMovies.includes(movie._id)}
            />
          ))}
        </div>

      </section>
    </div>
  );
}

export default Home;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// import { getMovies, likeMovie } from "../services/movieService";
// import MovieCard from "../components/MovieCard";

// function Home() {
//   const navigate = useNavigate();

//   const [movies, setMovies] = useState([]);
//   const [search, setSearch] = useState("");
//   const [genreFilter, setGenreFilter] = useState("All");

//   const [user, setUser] = useState(
//     JSON.parse(localStorage.getItem("user"))
//   );

//   const [likedMovies, setLikedMovies] = useState(
//     JSON.parse(localStorage.getItem("user"))?.likedMovies || []
//   );

//   useEffect(() => {
//     fetchMovies();
//   }, []);

//   const fetchMovies = async () => {
//     try {
//       const res = await getMovies();
//       setMovies(res.data);
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to load movies");
//     }
//   };

//   const handleLike = async (movieId) => {
//     if (!user) {
//       toast.error("Please login first");
//       navigate("/login");
//       return;
//     }

//     try {
//       const isLiked = likedMovies.includes(movieId);

//       let updatedLikes;

//       if (isLiked) {
//         updatedLikes = likedMovies.filter((id) => id !== movieId);
//         toast.success("Removed from liked 💔");
//       } else {
//         updatedLikes = [...likedMovies, movieId];
//         toast.success("Added to liked ❤️");
//       }

//       setLikedMovies(updatedLikes);

//       const updatedUser = {
//         ...user,
//         likedMovies: updatedLikes,
//       };

//       setUser(updatedUser);
//       localStorage.setItem("user", JSON.stringify(updatedUser));

//       await likeMovie({
//         userId: user._id,
//         movieId,
//       });
//     } catch (error) {
//       console.log(error);
//       toast.error("Action failed");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     toast.success("Logged Out");

//     setTimeout(() => {
//       navigate("/login");
//     }, 800);
//   };

//   // dynamic genres from DB
//   const genres = [
//     "All",
//     ...new Set(movies.map((m) => m.genre)),
//   ];

//   // filtering logic
//   const filteredMovies = movies.filter((movie) => {
//     const matchesSearch = movie.title
//       .toLowerCase()
//       .includes(search.toLowerCase());

//     const matchesGenre =
//       genreFilter === "All" || movie.genre === genreFilter;

//     return matchesSearch && matchesGenre;
//   });

//   return (
//     <div className="min-h-screen bg-black text-white">

//       {/* NAVBAR */}
//       <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/70 border-b border-slate-800">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

//           <h1
//             onClick={() => navigate("/")}
//             className="text-3xl font-extrabold text-red-500 cursor-pointer"
//           >
//             MovieFlix
//           </h1>

//           <div className="flex items-center gap-3">

//             <button
//               onClick={() => navigate("/recommendations")}
//               className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold"
//             >
//               For You
//             </button>

//             <button
//               onClick={() => navigate("/liked")}
//               className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-lg font-semibold"
//             >
//               ❤️ Liked
//             </button>

//             <button
//               onClick={handleLogout}
//               className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold"
//             >
//               Logout
//             </button>

//           </div>
//         </div>
//       </nav>

//       {/* HERO */}
//       <section className="relative h-[500px] flex items-center">
//         <img
//           src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba"
//           className="absolute w-full h-full object-cover opacity-30"
//         />
//         <div className="relative z-10 max-w-7xl mx-auto px-6">
//           <h1 className="text-5xl md:text-7xl font-extrabold">
//             Discover Movies
//             <br />
//             <span className="text-red-500">You’ll Love</span>
//           </h1>

//           <p className="mt-4 text-gray-300 max-w-2xl">
//             Personalized recommendations using likes & genres
//           </p>
//         </div>
//       </section>

//       {/* STATS */}
//       <section className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6">

//         <div className="bg-slate-900 p-6 rounded-2xl">
//           <h3 className="text-gray-400">Total Movies</h3>
//           <p className="text-4xl font-bold">{movies.length}</p>
//         </div>

//         <div className="bg-slate-900 p-6 rounded-2xl">
//           <h3 className="text-gray-400">Liked Movies</h3>
//           <p className="text-4xl font-bold">{likedMovies.length}</p>
//         </div>

//         <div className="bg-slate-900 p-6 rounded-2xl">
//           <h3 className="text-gray-400">User</h3>
//           <p className="text-xl font-bold">{user?.username || "Guest"}</p>
//         </div>

//       </section>

//       {/* SEARCH */}
//       <section className="max-w-7xl mx-auto px-6 mb-6">
//         <input
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search movies..."
//           className="w-full p-4 bg-slate-900 border border-slate-700 rounded-xl"
//         />
//       </section>

//       {/* GENRE FILTER */}
//       <section className="max-w-7xl mx-auto px-6 mb-8">
//         <div className="flex flex-wrap gap-3">

//           {genres.map((genre) => (
//             <button
//               key={genre}
//               onClick={() => setGenreFilter(genre)}
//               className={`px-4 py-2 rounded-full ${
//                 genreFilter === genre
//                   ? "bg-red-500"
//                   : "bg-slate-800 hover:bg-slate-700"
//               }`}
//             >
//               {genre}
//             </button>
//           ))}

//         </div>
//       </section>

//       {/* MOVIES */}
//       <section className="max-w-7xl mx-auto px-6 pb-16">

//         {filteredMovies.length === 0 ? (
//           <p className="text-center text-gray-400">
//             No movies found
//           </p>
//         ) : (
//           <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

//             {filteredMovies.map((movie) => (
//               <MovieCard
//                 key={movie._id}
//                 movie={movie}
//                 handleLike={handleLike}
//                 liked={likedMovies.includes(movie._id)}
//               />
//             ))}

//           </div>
//         )}

//       </section>

//     </div>
//   );
// }

// export default Home;