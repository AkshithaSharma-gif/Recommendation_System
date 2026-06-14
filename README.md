MovieFlix – Movie Recommendation System (MERN Stack)

A full-stack movie recommendation web application built using the MERN stack (MongoDB, Express, React, Node.js).
It allows users to browse movies, like them, save them for later, and get personalized recommendations based on their preferences.

🚀 Features
🎥 Movie Features
Browse all movies in a clean UI
View detailed movie information
Watch trailers (YouTube embed support)
Filter movies by genre
Sort movies (A-Z, rating, newest, oldest)
Similar movies suggestions

❤️ User Interaction
Like / Unlike movies
Save movies to Watch Later
Dedicated Liked Movies page
Watch Later page with saved movies

🎯 Recommendation System
Content-based filtering (based on liked genres)
Collaborative filtering (users with similar taste)
Smart recommendation reasons shown per movie

👤 User System
User authentication (Login/Register)
Profile page with:
Liked movies count
Watch later count
Favorite genre detection
Engagement score

🛠️ Tech Stack
Frontend
React.js
React Router DOM
Tailwind CSS
React Hot Toast
Backend
Node.js
Express.js
MongoDB
Mongoose
Others
REST APIs
LocalStorage (for session caching)
YouTube Embed API


1. Backend Setup

cd backend
npm install

Create .env file:
MONGO_URI=***
PORT=***


3. Frontend Setup
cd frontend
npm install
npm run dev
🔌 API Endpoints
🎬 Movies
GET /movies → Get all movies
GET /movies/:id → Get single movie
POST /movies/like → Like/Unlike movie
👤 User
POST /users/register
POST /users/login
❤️ Liked Movies
GET /users/:userId/liked
📌 Watch Later
GET /users/:userId/watchlater
POST /users/watchlater/toggle
🎯 Recommendations
GET /users/:userId/recommendations


📊 Recommendation Logic

1. Content-Based Filtering
Movies recommended based on genres of liked movies

2. Collaborative Filtering
Finds users with similar liked movies
Suggests movies liked by similar users
🧠 Key Highlights
Fully dynamic recommendation system
Real-time like/unlike updates
Watch Later stored in localStorage
Clean UI with Tailwind CSS
Responsive design for all devices

