import { useNavigate } from "react-router-dom";

function MovieCard({
  movie,
  handleLike,
  liked,
  watchLater,
  handleWatchLater,
  recommendationReason = "",
}) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/movie/${movie._id}`)}
      className="group bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-slate-700 cursor-pointer"
    >
      {/* Poster */}
      <div className="relative h-80 overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Watch Later */}
        {handleWatchLater && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleWatchLater(movie._id);
            }}
            className={`absolute top-3 left-3 w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-lg transition-all duration-300 ${
              watchLater
                ? "bg-blue-500 scale-110"
                : "bg-black/70 hover:bg-slate-700"
            }`}
          >
            {watchLater ? "🔖" : "📌"}
          </button>
        )}

        {/* Like */}
        {handleLike && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLike(movie._id);
            }}
            className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-lg transition-all duration-300 ${
              liked
                ? "bg-red-500 scale-110"
                : "bg-black/70 hover:bg-slate-700"
            }`}
          >
            {liked ? "❤️" : "🤍"}
          </button>
        )}

        {/* Recommendation Overlay */}
        {recommendationReason && (
          <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center p-4">
            <div className="text-center">
              <h3 className="text-red-400 font-bold mb-2">
                🎯 Why Recommended?
              </h3>

              <p className="text-sm text-gray-300 leading-relaxed">
                {recommendationReason}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="p-4">
        <h2 className="text-lg font-bold text-white line-clamp-2 min-h-[52px]">
          {movie.title}
        </h2>

        <div className="flex justify-between items-center mt-3">
          <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-medium">
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

          <span className="text-gray-400 text-xs">
            IMDb Rating
          </span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;