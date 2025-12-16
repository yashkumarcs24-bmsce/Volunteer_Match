import express from "express";
import Volunteer from "../models/Volunteer.js";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("New Volunteer Data:", req.body);
  const v = new Volunteer(req.body);
  await v.save();
  res.status(201).json(v);
});

router.get("/", async (req, res) => { const list = await Volunteer.find(); res.json(list); });

export default router;
