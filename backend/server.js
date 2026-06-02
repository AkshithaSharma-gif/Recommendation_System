import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Running");
});

const PORT = process.env.PORT || 5000;

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URL);

    console.log("DB connection successful");

    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  } catch (err) {
    console.log("Error in DB connection:", err);
  }
}

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);


//error handling middleware(must be present at the end of the file only) - only exectes when error is occured
app.use((err,req,res,next)=>{
    console.log(err.name)
    //validation error
    if(err.name==='ValidationError'){
        return res.status(400).json({message:"Error",error:err.message})
    }
    //cast error
    if(err.name==='CastError'){
        return res.status(400).json({message:"Error",error:err.message})
    }

    //send server side errors
    res.status(500).json({message:"Error from server side",error:err.message})
})