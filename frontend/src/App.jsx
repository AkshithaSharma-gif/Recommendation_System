import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Recommendations from "./pages/Recommendations";
import LikedMovies from "./pages/LikedMovies";

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
          path="/liked"
          element={<LikedMovies />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;