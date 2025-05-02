import express from 'express';
import { normalAIChatController } from '../controllers/NormalAIChatController.js';


const router = express.Router();

router.post('/' ,  normalAIChatController);

export default router;