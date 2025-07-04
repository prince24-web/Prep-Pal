import { Router } from "express";

const router = Router();

import protect from "../middlewares/authMiddleware.js";
import verifyTokenAndParse from "../middlewares/verifyTokensAndParse.js";
import summariesController from "../controllers/summaries.controller.js";

router.get(
    "/pdf/:id",
    protect,
    verifyTokenAndParse("summary"),
    summariesController.summarizePDF
);
router.get(
    "/youtube/:id",
    protect,
    verifyTokenAndParse("summary"),
    summariesController.summarizeYouTube
);

router.get("/", protect, summariesController.getAllSummaries);

export default router;
