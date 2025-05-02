import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  thumbnail: { type: String, required: true },
  videoLink: { type: String, required: true },
  notesLink: { type: String, required: true }
});


const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Tutor' },
  thumbnail: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: String }],
  likeCount:{type: Number},
  viewVount:{type: Number},
  videos: [videoSchema]
});


const Course = mongoose.model('Course', courseSchema);

export default Course;
