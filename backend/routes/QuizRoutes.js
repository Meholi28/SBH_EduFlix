import express from 'express';
import { generateQuizController } from '../controllers/QuizController.js';
const router = express.Router();

router.post('/' ,   generateQuizController);

export default router;