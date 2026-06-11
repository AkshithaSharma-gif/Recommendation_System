import axios from "axios";

const API = "http://localhost:5000/api/movies";

export const getMovies = () => {
  return axios.get(API);
};

export const likeMovie = (data) => {
  return axios.post(`${API}/like`, data);
};

export const getRecommendations = (userId) => {
  return axios.get(`${API}/recommendations/${userId}`);
};

export const getLikedMovies = (userId) => {
  return axios.get(`${API}/liked/${userId}`);
};

