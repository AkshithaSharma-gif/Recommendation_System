import axios from "axios";

const API = "https://movieflix-5uo6.onrender.com";

// 🔐 Helper: attach token safely
const authHeader = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return {};
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ✅ GET all movies (public)
export const getMovies = () => axios.get(`${API}/api/movies`);

// ✅ GET movie by ID (public)
export const getMovieById = (id) =>
  axios.get(`${API}/api/movies/${id}`);

// ✅ LIKE movie (protected)
export const likeMovie = (data) =>
  axios.post(`${API}/api/movies/like`, data, authHeader());

// ✅ GET liked movies (protected)
export const getLikedMovies = (userId) =>
  axios.get(`${API}/api/movies/liked/${userId}`, authHeader());

// ✅ WATCH LATER toggle (protected)
export const toggleWatchLater = (data) =>
  axios.post(`${API}/api/movies/watchlater`, data, authHeader());

// ✅ GET watch later list (if used anywhere)
export const getWatchLaterMovies = (userId) =>
  axios.get(`${API}/api/movies/watchlater/${userId}`, authHeader());

// ✅ RECOMMENDATIONS (protected)
export const getRecommendations = (userId) =>
  axios.get(`${API}/api/movies/recommendations/${userId}`, authHeader());





// const API = "https://movieflix-5uo6.onrender.com";

// // GET all movies
// export const getMovies = () =>
//   axios.get(`${API}/api/movies`);

// // GET movie by ID
// export const getMovieById = (id) =>
//   axios.get(`${API}/api/movies/${id}`);

// // LIKE movie
// export const likeMovie = (data) =>
//   axios.post(`${API}/api/movies/like`, data, authHeader());

// // WATCH LATER toggle
// export const toggleWatchLater = (data) =>
//   axios.post(`${API}/api/movies/watchlater`, data, authHeader());

// // WATCH LATER list
// export const getWatchLaterMovies = (userId) =>
//   axios.get(`${API}/api/movies/watchlater/${userId}`, authHeader());

// // RECOMMENDATIONS
// export const getRecommendations = (userId) =>
//   axios.get(`${API}/api/movies/recommendations/${userId}`, authHeader());