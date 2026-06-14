// import express from "express";

// import {
//   addMovie,
//   getMovies,
//   likeMovie,
//   getRecommendations,
//   getLikedMovies,
//   getMovieById,
//   getWatchLaterMovies,
//   toggleWatchLater,
//   deleteMovie,
//   updateMovie,
// } from "../controllers/movieController.js";

// import { VerifyToken } from "../middleware/VerifyToken.js";

// const router = express.Router();

// /*PUBLIC ROUTES*/
// router.get("/", getMovies);
// router.get("/:id", getMovieById);

// /*USER ROUTES (LOGIN REQUIRED)*/
// router.post("/like", VerifyToken(), likeMovie);


// router.put("/update/:id", VerifyToken("ADMIN"), updateMovie);

// router.get(
//   "/liked/:userId",
//   VerifyToken(),
//   getLikedMovies
// );

// router.post(
//   "/watchlater",
//   VerifyToken(),
//   toggleWatchLater
// );

// router.get(
//   "/watchlater/:userId",
//   VerifyToken(),
//   getWatchLaterMovies
// );

// router.get(
//   "/recommendations/:userId",
//   VerifyToken(),
//   getRecommendations
// );

// /*ADMIN ROUTES*/

// // only admin can add movie
// router.post("/add", VerifyToken("admin"), addMovie);

// // update movie (admin only)
// router.put("/:id", VerifyToken("admin"), updateMovie);

// // delete movie (admin only)
// router.delete("/:id", VerifyToken("admin"), deleteMovie);

// export default router;


import express from "express";

import {
  addMovie,
  getMovies,
  likeMovie,
  getRecommendations,
  getLikedMovies,
  getMovieById,
  getWatchLaterMovies,
  toggleWatchLater
} from "../controllers/movieController.js";

const router = express.Router();

// PUBLIC ROUTES
router.get("/", getMovies);
router.get("/:id", getMovieById);
router.get("/liked/:userId", getLikedMovies);
router.get("/recommendations/:userId", getRecommendations);
router.get("/watchlater/:userId", getWatchLaterMovies);

// ACTION ROUTES (NO AUTH)
router.post("/add", addMovie);
router.post("/like", likeMovie);
router.post("/watchlater", toggleWatchLater);

export default router;