import express from 'express';
import { checkAnswer} from '../controllers/Ai-Interview.js';
const router = express.Router();

router.post('/check-answer',checkAnswer);


export default router;