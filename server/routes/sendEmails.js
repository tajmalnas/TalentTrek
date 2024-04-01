import express from "express";
import { sendEmails , sendInterviewEmails} from "../controllers/handleEmail.js";

const router = express.Router();

router.post("/", sendEmails);
router.post("/interview", sendInterviewEmails);
export default router;

