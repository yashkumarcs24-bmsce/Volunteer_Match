import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config(); // Load .env variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});


// Routes example (add more later)
import volunteerRoutes from "./routes/volunteerRoutes.js";
app.use("/api/volunteers", volunteerRoutes);

// Start server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import authRoutes from "./routes/authRoutes.js";
app.use("/api/auth", authRoutes);
