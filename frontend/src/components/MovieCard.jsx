function MovieCard({
  movie,
  handleLike,
  liked,
}) {
  return (
    <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-slate-700">

      <div className="relative">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-80 object-cover"
        />

        {/* Heart Button */}
        <button
          onClick={() => handleLike(movie._id)}
          className={`absolute top-3 right-3 w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg transition-all duration-300 ${
            liked
              ? "bg-red-500 scale-110"
              : "bg-black/70 hover:bg-slate-700"
          }`}
        >
          {liked ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="p-5">
        <h2 className="text-xl font-bold text-white truncate">
          {movie.title}
        </h2>

        <div className="flex justify-between items-center mt-3">
          <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">
            {movie.genre}
          </span>

          <span className="text-gray-300 text-sm">
            {movie.year}
          </span>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-yellow-400 font-semibold">
            ⭐ {movie.rating}
          </span>

          <span className="text-gray-400 text-sm">
            IMDb Rating
          </span>
        </div>

        <p className="text-gray-400 text-sm mt-4 line-clamp-3">
          {movie.description}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;