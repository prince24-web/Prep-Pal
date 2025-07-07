import { Router } from "express";

const router = Router();

import protect from "../middlewares/authMiddleware.js";
import verifyTokensAndParse from "../middlewares/verifyTokensAndParse.js";
import quizzesController from "../controllers/quizzes.controller.js";

router.get(
    "/pdf/:id",
    protect,
    verifyTokensAndParse("quiz"),
    quizzesController.generateQuizPDF
);

router.get("/", protect, quizzesController.getAllQuizzes);

export default router;
