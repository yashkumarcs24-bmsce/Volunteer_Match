import express from "express";
import Volunteer from "../models/Volunteer.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

/* ===========================
   REGISTER USER
   =========================== */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, skills } = req.body;

    // Check if the user already exists
    const exists = await Volunteer.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new volunteer
    const newUser = new Volunteer({
      name,
      email,
      password: hashedPassword,
      skills,
    });

    await newUser.save();

    res.json({
      message: "Registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ===========================
   LOGIN USER
   =========================== */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await Volunteer.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user,
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ===========================
   EXPORT ROUTES
   =========================== */
export default router;
