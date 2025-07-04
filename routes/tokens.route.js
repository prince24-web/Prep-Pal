import { Router } from "express";

const router = Router();

import protect from "../middlewares/authMiddleware.js";

import tokensController from "../controllers/tokens.controller.js";

router.get("/", protect, tokensController.getUserTokens);
router.patch("/use", protect, tokensController.useUserTokens);
router.patch("/add", protect, tokensController.addUserTokens);

export default router;
