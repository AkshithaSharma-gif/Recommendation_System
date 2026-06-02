function MovieCard({ movie, handleLike }) {
  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition duration-300">
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-72 object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-bold text-white">
          {movie.title}
        </h2>

        <p className="text-gray-400 text-sm mt-2">
          {movie.genre}
        </p>

        <p className="text-yellow-400 mt-2">
          ⭐ {movie.rating}
        </p>

        <p className="text-gray-300 text-sm mt-2">
          {movie.year}
        </p>

        <button
          onClick={() => handleLike(movie._id)}
          className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition"
        >
          ❤️ Like
        </button>
      </div>
    </div>
  );
}

export default MovieCard;