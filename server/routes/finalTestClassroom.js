import express from "express";
import { addFinalTestClassroom } from "../controllers/finalTestClassroom.js";

const router = express.Router();

router.post('/',addFinalTestClassroom);

export default router;
