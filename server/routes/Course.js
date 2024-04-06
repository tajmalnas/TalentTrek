import express from "express";
import { 
    addCourse,
    getCourse,
    addVideo,
    getMyCreatedCourses,
    addAIQuestions,
    getAIQuestions,
    addFinalQuestions,
    getFinalQuestions,
    getAllCourses,
    enrollInCourse
} from "../controllers/Course.js";

const router = express.Router();

router.post('/create-course',addCourse);
router.post('/get-course',getCourse);
router.post('/add-video',addVideo);
router.post('/get-my-created-courses',getMyCreatedCourses);

router.post('/add-ai-questions',addAIQuestions);
router.post('/get-ai-questions',getAIQuestions);

router.post('/add-final-questions',addFinalQuestions);
router.post('/get-final-questions',getFinalQuestions);

router.get('/get-all-courses',getAllCourses);
router.post('/enroll-in-course',enrollInCourse);

export default router;