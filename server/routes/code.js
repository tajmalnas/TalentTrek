import express from "express";
import { CodeEditor } from "../controllers/code.js";

const router = express.Router();

router.post("/", CodeEditor);

export default router;
