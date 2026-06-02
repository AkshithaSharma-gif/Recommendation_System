import express from "express";

import {
  addMovie,
  getMovies,
  likeMovie,
  getRecommendations
} from "../controllers/movieController.js";

const router = express.Router();

router.post("/add", addMovie);

router.get("/", getMovies);

router.post("/like", likeMovie);

router.get(
  "/recommendations/:userId",
  getRecommendations
);

export default router;