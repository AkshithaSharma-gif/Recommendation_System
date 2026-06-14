import axios from "axios";

const API = "https://movieflix-5uo6.onrender.com";

export const registerUser = (data) => {
  return axios.post(`${API}/register`, data);
};

export const loginUser = (data) => {
  return axios.post(`${API}/login`, data);
};