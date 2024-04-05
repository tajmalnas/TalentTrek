import express from "express";
import { addCourse,getCourse,addVideo,getMyCreatedCourses} from "../controllers/Course.js";

const router = express.Router();

router.post('/create-course',addCourse);
router.post('/get-course',getCourse);
router.post('/add-video',addVideo);
router.post('/get-my-created-courses',getMyCreatedCourses);

export default router;