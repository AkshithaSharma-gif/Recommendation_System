import Movie from "../models/Movie.js";
import User from "../models/UserModel.js";

export const addMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);

    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();

    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



export const likeMovie = async (req, res) => {
  try {
    const { userId, movieId } = req.body;

    const user = await User.findById(userId);

    if (!user.likedMovies.includes(movieId)) {
      user.likedMovies.push(movieId);
      await user.save();
    }

    res.status(200).json({
      message: "Movie liked successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};




export const getRecommendations = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("likedMovies");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const genres = user.likedMovies.map(
      (movie) => movie.genre
    );

    const recommendations = await Movie.find({
      genre: { $in: genres },
      _id: { $nin: user.likedMovies.map((m) => m._id) },
    });

    res.status(200).json(recommendations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};