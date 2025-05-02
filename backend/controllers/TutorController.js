import Tutor from "../models/TutorModel.js";


// Create Tutor
export const createTutor = async (req, res) => {
  try {
    const tutor = await Tutor.create(req.body);
    res.status(201).json(tutor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Tutors
export const getAllTutors = async (req, res) => {
  try {
    const tutors = await Tutor.find().populate('courses');
    res.status(200).json(tutors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Tutor by ID
export const getTutorById = async (req, res) => {
  try {
    const tutor = await Tutor.findById(req.params.id).populate('courses');
    if (!tutor) return res.status(404).json({ message: 'Tutor not found' });
    res.status(200).json(tutor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Tutor
export const updateTutor = async (req, res) => {
  try {
    const tutor = await Tutor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tutor) return res.status(404).json({ message: 'Tutor not found' });
    res.status(200).json(tutor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Tutor
export const deleteTutor = async (req, res) => {
  try {
    const tutor = await Tutor.findByIdAndDelete(req.params.id);
    if (!tutor) return res.status(404).json({ message: 'Tutor not found' });
    res.status(200).json({ message: 'Tutor deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Courses by Tutor ID
export const getCoursesByTutorId = async (req, res) => {
  try {
    const tutor = await Tutor.findById(req.params.id).populate('courses');
    if (!tutor) return res.status(404).json({ message: 'Tutor not found' });
    res.status(200).json(tutor.courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
