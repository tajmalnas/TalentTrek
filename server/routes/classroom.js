import express from "express";
import { createClassroom, getClassroom , addVideo, getEnrolledClassroom, enrollCandidate} from "../controllers/classRoom.js";

const router = express.Router();

router.post("/create", createClassroom);
router.post("/get-classroom", getClassroom);
router.post("/add-video", addVideo);
router.post("/get-enrolled", getEnrolledClassroom);
router.post("/enroll", enrollCandidate);
router.post("/view-classroom", viewClassroom);


export default router;

