import express from "express";
import { addCourse,getCourse,addVideo} from "../controllers/Course.js";

const router = express.Router();

router.post('/create-course',addCourse);
router.post('/get-course',getCourse);
router.post('/add-video',addVideo);

export default router;