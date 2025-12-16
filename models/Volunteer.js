import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  skills: [String],
});

export default mongoose.model("Volunteer", volunteerSchema);
