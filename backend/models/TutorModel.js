// /models/Tutor.js
import mongoose from 'mongoose';

const tutorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  degree: { type: String },
  photo: { type: String }, // photo URL
  document: { type: String }, // verification document URL
  rating: { type: Number, default: 0, min: 0, max: 5 },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
}, {
  timestamps: true
});

const Tutor = mongoose.model('Tutor', tutorSchema);

export default Tutor;
