import { Router } from "express";

const router = Router();

import protect from "../middlewares/authMiddleware.js";
import verifyTokensAndParse from "../middlewares/verifyTokensAndParse.js";
import flashcardsController from "../controllers/flashcards.controller.js";

router.get(
    "/pdf/:id",
    protect,
    verifyTokensAndParse("flashcards"),
    flashcardsController.generateFlashcardsPDF
);
router.get(
    "/youtube/:id",
    protect,
    verifyTokensAndParse("flashcards"),
    flashcardsController.generateFlashcardsYouTube
);

router.get("/", protect, flashcardsController.getAllFlashcards);

export default router;
