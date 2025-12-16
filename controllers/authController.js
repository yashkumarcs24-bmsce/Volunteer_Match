import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Volunteer from "../models/Volunteer.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await Volunteer.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = new Volunteer({
      name,
      email,
      password: hashed
    });

    await user.save();
    res.json({ message: "Registered successfully!" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Volunteer.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      message: "Login successful",
      token,
      user
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};