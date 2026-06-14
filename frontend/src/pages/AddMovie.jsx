import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { addMovie } from "../services/movieService";

function AddMovie() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    poster: "",
    genre: "",
    year: "",
    rating: "",
    trailer: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addMovie(form);

      toast.success("Movie Added Successfully");

      navigate("/admin");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add movie");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold mb-8">
        ➕ Add Movie
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4 max-w-2xl"
      >

        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          className="p-3 bg-slate-800 rounded"
        />

        <input
          name="poster"
          placeholder="Poster URL"
          onChange={handleChange}
          className="p-3 bg-slate-800 rounded"
        />

        <input
          name="genre"
          placeholder="Genre"
          onChange={handleChange}
          className="p-3 bg-slate-800 rounded"
        />

        <input
          name="year"
          placeholder="Year"
          onChange={handleChange}
          className="p-3 bg-slate-800 rounded"
        />

        <input
          name="rating"
          placeholder="Rating"
          onChange={handleChange}
          className="p-3 bg-slate-800 rounded"
        />

        <input
          name="trailer"
          placeholder="Trailer URL"
          onChange={handleChange}
          className="p-3 bg-slate-800 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="p-3 bg-slate-800 rounded"
        />

        <button
          type="submit"
          className="bg-green-500 p-3 rounded font-bold"
        >
          Save Movie
        </button>

      </form>

    </div>
  );
}

export default AddMovie;