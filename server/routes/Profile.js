import express from "express";
import { getProfile , getOthers} from "../controllers/Profile.js";
const router = express.Router();

router.post("/", getProfile);
router.post("/getOthers", getOthers);

export default router;
