import express from "express";
import authController from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/google", authController.googleOAuth);
router.get("/callback", authController.googleOAuthCallback);

export default router;
