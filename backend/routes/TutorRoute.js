import express from 'express';
import {
  createTutor,
  getAllTutors,
  getTutorById,
  updateTutor,
  deleteTutor,
  getCoursesByTutorId
} from '../controllers/TutorController.js';

const router = express.Router();

// CRUD routes
router.post('/', createTutor);
router.get('/', getAllTutors);
router.get('/:id', getTutorById);
router.put('/:id', updateTutor);
router.delete('/:id', deleteTutor);

// Get all courses by tutor ID
router.get('/:id/courses', getCoursesByTutorId);

export default router;
