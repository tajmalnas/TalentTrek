import express from "express";
import { signup, login, google } from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/google", google);

export default router;
