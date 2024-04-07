import express from "express";
import { addFinalTest, getFinalTest } from "../controllers/finalTest.js";

const router = express.Router();

router.post("/", addFinalTest);
router.post("/getFinal", getFinalTest);

export default router;
