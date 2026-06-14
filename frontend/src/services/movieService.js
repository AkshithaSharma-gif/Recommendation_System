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
export const getMovies = () => axios.get(`${API}`);

// ✅ GET movie by ID (public)
export const getMovieById = (id) =>
  axios.get(`${API}/${id}`);

// ✅ LIKE movie (protected)
export const likeMovie = (data) =>
  axios.post(`${API}/like`, data, authHeader());

// ✅ GET liked movies (protected)
export const getLikedMovies = (userId) =>
  axios.get(`${API}/liked/${userId}`, authHeader());

// ✅ WATCH LATER toggle (protected)
export const toggleWatchLater = (data) =>
  axios.post(`${API}/watchlater`, data, authHeader());

// ✅ GET watch later list (if used anywhere)
export const getWatchLaterMovies = (userId) =>
  axios.get(`${API}/watchlater/${userId}`, authHeader());

// ✅ RECOMMENDATIONS (protected)
export const getRecommendations = (userId) =>
  axios.get(`${API}/recommendations/${userId}`, authHeader());