import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import Recommendations from "./pages/Recommendations.jsx";
import LikedMovies from "./pages/LikedMovies.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import WatchLater from "./pages/WatchLater.jsx";
import Profile from "./pages/Profile.jsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/recommendations"
          element={<Recommendations />}
        />
        <Route
  path="/movie/:id"
  element={<MovieDetails />}
/>

<Route
  path="/watchlater"
  element={<WatchLater />}
/>
        <Route
          path="/liked"
          element={<LikedMovies />}
        />

        <Route
  path="/profile"
  element={<Profile />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;