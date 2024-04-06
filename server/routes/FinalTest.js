import express from "express";
import { addFinalTest } from "../controllers/finalTest.js";

const router = express.Router();

router.post('/',addFinalTest);

export default router;
