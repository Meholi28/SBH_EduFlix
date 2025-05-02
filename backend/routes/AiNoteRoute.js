import express from 'express';
import { tutorChatController } from '../controllers/tutorChatController.js';

const router = express.Router();

router.post('/' ,  tutorChatController );

export default router;