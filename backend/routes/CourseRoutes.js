
import express from 'express';
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  likeCourse,
  unlikeCourse,
  viewCourse
} from '../controllers/CourseController.js';
import generateRelevantCourses from '../functions/RecomendationSystem.js';

const router = express.Router();

router.post('/', createCourse);
router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

// Special actions
router.get('/recommendation/:courseId' , generateRelevantCourses);
router.patch('/:id/like', likeCourse);
router.patch('/:id/unlike', unlikeCourse);
router.patch('/:id/view', viewCourse);

export default router;
