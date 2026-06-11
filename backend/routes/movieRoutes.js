import express from "express";

import {
  addMovie,
  getMovies,
  likeMovie,
  getRecommendations,
  getLikedMovies
} from "../controllers/movieController.js";

const router = express.Router();

router.post("/add", addMovie);

router.get("/", getMovies);

router.post("/like", likeMovie);

router.get(
  "/recommendations/:userId",
  getRecommendations
);

router.get(
  "/recommendations/:userId",
  getRecommendations
);

router.get("/liked/:userId", getLikedMovies);

export default router;