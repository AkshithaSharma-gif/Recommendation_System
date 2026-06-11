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

//     const currentUser = await User.findById(userId);

//     if (!currentUser) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     const currentLiked = currentUser.likedMovies.map(
//       (id) => id.toString()
//     );

//     const allUsers = await User.find({
//       _id: { $ne: userId },
//     });

//     const movieScores = {};

//     allUsers.forEach((user) => {
//       const otherLiked = user.likedMovies.map(
//         (id) => id.toString()
//       );

//       // Count common liked movies
//       const commonLikes = otherLiked.filter((id) =>
//         currentLiked.includes(id)
//       );

//       const similarityScore = commonLikes.length;

//       if (similarityScore === 0) return;

//       // Add score to movies current user hasn't liked
//       otherLiked.forEach((movieId) => {
//         if (!currentLiked.includes(movieId)) {
//           movieScores[movieId] =
//             (movieScores[movieId] || 0) +
//             similarityScore;
//         }
//       });
//     });

//     const sortedMovieIds = Object.entries(movieScores)
//       .sort((a, b) => b[1] - a[1])
//       .map((item) => item[0]);

//     const recommendations = await Movie.find({
//       _id: { $in: sortedMovieIds },
//     });

//     // Preserve score order
//     const orderedRecommendations =
//       sortedMovieIds
//         .map((id) =>
//           recommendations.find(
//             (movie) =>
//               movie._id.toString() === id
//           )
//         )
//         .filter(Boolean);

//     res.status(200).json(
//       orderedRecommendations
//     );

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

    // ----------------------
    // Content-Based
    // ----------------------

    const likedGenres =
      currentUser.likedMovies.map(
        (movie) => movie.genre
      );

    const contentMovies =
      await Movie.find({
        genre: { $in: likedGenres },
        _id: {
          $nin: currentUser.likedMovies.map(
            (movie) => movie._id
          ),
        },
      });

    // ----------------------
    // Collaborative
    // ----------------------

    const otherUsers = await User.find({
      _id: { $ne: userId },
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

    // ----------------------
    // Merge Results
    // ----------------------

    const allMovies = [
      ...contentMovies,
      ...collaborativeMovies,
    ];

    const uniqueMovies = Array.from(
      new Map(
        allMovies.map((movie) => [
          movie._id.toString(),
          movie,
        ])
      ).values()
    );

    res.status(200).json(uniqueMovies);
  } catch (error) {
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