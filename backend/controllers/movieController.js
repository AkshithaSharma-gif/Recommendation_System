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

export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    await Movie.findByIdAndDelete(id);

    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,        // returns updated document
        runValidators: true,
      }
    );

    if (!updatedMovie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    res.status(200).json({
      message: "Movie updated successfully",
      movie: updatedMovie,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
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

    const alreadyLiked = user.likedMovies.includes(movieId);

    if (alreadyLiked) {
      user.likedMovies = user.likedMovies.filter(
        (id) => id.toString() !== movieId
      );

      await user.save();

      return res.status(200).json({
        liked: false,
        message: "Movie removed from liked movies",
      });
    }

    user.likedMovies.push(movieId);

    await user.save();

    res.status(200).json({
      liked: true,
      message: "Movie liked successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// export const getRecommendations = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const currentUser = await User.findById(userId)
//       .populate("likedMovies");

//     if (!currentUser) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     // ----------------------
//     // Content-Based
//     // ----------------------

//     const likedGenres =
//       currentUser.likedMovies.map(
//         (movie) => movie.genre
//       );

//     const contentMovies =
//       await Movie.find({
//         genre: { $in: likedGenres },
//         _id: {
//           $nin: currentUser.likedMovies.map(
//             (movie) => movie._id
//           ),
//         },
//       });

//     // ----------------------
//     // Collaborative
//     // ----------------------

//     const otherUsers = await User.find({
//       _id: { $ne: userId },
//     });

//     let collaborativeMovieIds = [];

//     otherUsers.forEach((user) => {
//       const commonMovies =
//         user.likedMovies.filter((movieId) =>
//           currentUser.likedMovies.some(
//             (movie) =>
//               movie._id.toString() ===
//               movieId.toString()
//           )
//         );

//       if (commonMovies.length > 0) {
//         user.likedMovies.forEach((movieId) => {
//           const alreadyLiked =
//             currentUser.likedMovies.some(
//               (movie) =>
//                 movie._id.toString() ===
//                 movieId.toString()
//             );

//           if (!alreadyLiked) {
//             collaborativeMovieIds.push(
//               movieId.toString()
//             );
//           }
//         });
//       }
//     });

//     collaborativeMovieIds = [
//       ...new Set(collaborativeMovieIds),
//     ];

//     const collaborativeMovies =
//       await Movie.find({
//         _id: {
//           $in: collaborativeMovieIds,
//         },
//       });

//     // ----------------------
//     // Merge Results
//     // ----------------------

//     const allMovies = [
//       ...contentMovies,
//       ...collaborativeMovies,
//     ];

//     const uniqueMovies = Array.from(
//       new Map(
//         allMovies.map((movie) => [
//           movie._id.toString(),
//           movie,
//         ])
//       ).values()
//     );

//     res.status(200).json(uniqueMovies);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

export const getRecommendations = async (req, res) => {
  try {
    const { userId } = req.params;

    const currentUser = await User.findById(userId)
      .populate("likedMovies");

    if (!currentUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // ==========================
    // CONTENT-BASED FILTERING
    // ==========================

    const likedGenres = currentUser.likedMovies.map(
      (movie) => movie.genre
    );

    const contentMovies = await Movie.find({
      genre: {
        $in: likedGenres,
      },
      _id: {
        $nin: currentUser.likedMovies.map(
          (movie) => movie._id
        ),
      },
    });

    // ==========================
    // COLLABORATIVE FILTERING
    // ==========================

    const otherUsers = await User.find({
      _id: {
        $ne: userId,
      },
    });

    let collaborativeMovieIds = [];

    otherUsers.forEach((user) => {
      const commonMovies =
        user.likedMovies.filter((movieId) =>
          currentUser.likedMovies.some(
            (movie) =>
              movie._id.toString() ===
              movieId.toString()
          )
        );

      if (commonMovies.length > 0) {
        user.likedMovies.forEach((movieId) => {
          const alreadyLiked =
            currentUser.likedMovies.some(
              (movie) =>
                movie._id.toString() ===
                movieId.toString()
            );

          if (!alreadyLiked) {
            collaborativeMovieIds.push(
              movieId.toString()
            );
          }
        });
      }
    });

    collaborativeMovieIds = [
      ...new Set(collaborativeMovieIds),
    ];

    const collaborativeMovies =
      await Movie.find({
        _id: {
          $in: collaborativeMovieIds,
        },
      });

    // ==========================
    // CREATE RECOMMENDATIONS
    // WITH EXPLANATIONS
    // ==========================

    const recommendations = [];

    contentMovies.forEach((movie) => {
      const matchedMovie =
        currentUser.likedMovies.find(
          (likedMovie) =>
            likedMovie.genre === movie.genre
        );

      recommendations.push({
        movie,
        reason: matchedMovie
          ? `Because you liked "${matchedMovie.title}"`
          : `Because you enjoy ${movie.genre} movies`,
        type: "Content-Based",
      });
    });

    collaborativeMovies.forEach((movie) => {
      recommendations.push({
        movie,
        reason:
          "Users with similar tastes also liked this movie",
        type: "Collaborative",
      });
    });

    // ==========================
    // REMOVE DUPLICATES
    // ==========================

    const uniqueRecommendations =
      Array.from(
        new Map(
          recommendations.map((item) => [
            item.movie._id.toString(),
            item,
          ])
        ).values()
      );

    // ==========================
    // LIKED MOVIES INFO
    // ==========================

    const likedMovieData =
      currentUser.likedMovies.map(
        (movie) => ({
          _id: movie._id,
          title: movie.title,
          genre: movie.genre,
        })
      );

    // ==========================
    // RESPONSE
    // ==========================

    res.status(200).json({
      recommendations:
        uniqueRecommendations,

      likedMovies:
        likedMovieData,

      totalRecommendations:
        uniqueRecommendations.length,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const getLikedMovies = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId)
      .populate("likedMovies");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user.likedMovies);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};




export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};




export const toggleWatchLater = async (
  req,
  res
) => {
  try {
    const { userId, movieId } = req.body;

    const user = await User.findById(userId);

    const exists =
      user.watchLater.includes(movieId);

    if (exists) {
      user.watchLater =
        user.watchLater.filter(
          (id) =>
            id.toString() !== movieId
        );
    } else {
      user.watchLater.push(movieId);
    }

    await user.save();

    res.status(200).json({
      watchLater: user.watchLater,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



export const getWatchLaterMovies =
  async (req, res) => {
    try {
      const { userId } = req.params;

      const user = await User.findById(
        userId
      ).populate("watchLater");

      res.status(200).json(
        user.watchLater
      );
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };