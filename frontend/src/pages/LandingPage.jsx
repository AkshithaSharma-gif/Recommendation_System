import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/70 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1 className="text-3xl font-extrabold text-red-500">
            MovieFlix 
          </h1>

          <div className="flex gap-3">

            <button
              onClick={() => navigate("/login")}
              className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold"
            >
              Register
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

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">

          <h1 className="text-5xl md:text-7xl font-extrabold">
            Hybrid
            <br />
            <span className="text-red-500">Movie Recommendations</span>
          </h1>

          <p className="mt-5 text-gray-400 max-w-2xl">
            Discover movies you’ll love using Content-Based Filtering and Collaborative Filtering.
            Like movies, build your watchlist, and get personalized recommendations.
          </p>

          <div className="flex gap-4 mt-8">

            <button
              onClick={() => navigate("/login")}
              className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg font-bold"
            >
              Browse Movies
            </button>

            <button
              onClick={() => navigate("/login")}
              className="bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-lg font-bold"
            >
              Get Recommendations
            </button>

          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-6">

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-xl font-bold text-red-500 mb-2">
            ❤️ Liked Movies System
          </h3>
          <p className="text-gray-400">
            Save your favorite movies and access them anytime from your personalized liked section.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-xl font-bold text-red-500 mb-2">
            🎯 Content-Based Filtering
          </h3>
          <p className="text-gray-400">
            Get recommendations based on genres, cast, and similarity of movies you liked.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-xl font-bold text-red-500 mb-2">
            👥 Collaborative Filtering
          </h3>
          <p className="text-gray-400">
            Discover movies liked by users with similar taste patterns.
          </p>
        </div>

      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-6 pb-16">

        <h2 className="text-3xl font-bold mb-6">How It Works</h2>

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
            <h4 className="text-red-500 font-bold">1. Browse</h4>
            <p className="text-gray-400 mt-2">Explore all available movies</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
            <h4 className="text-red-500 font-bold">2. Like</h4>
            <p className="text-gray-400 mt-2">Save movies you enjoy</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
            <h4 className="text-red-500 font-bold">3. Content-based and Collaborative Filtering</h4>
            <p className="text-gray-400 mt-2">System learns your taste</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
            <h4 className="text-red-500 font-bold">4. Recommend</h4>
            <p className="text-gray-400 mt-2">Get personalized movies</p>
          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 py-6 text-center text-gray-500">
         MovieFlix • Recommendation System
      </footer>

    </div>
  );
}