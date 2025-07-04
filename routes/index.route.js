import { Router } from "express";

const router = Router();

import authRoutes from "./auth.route.js";
import usersRoutes from "./users.route.js";
import uploadsRoutes from "./uploads.route.js";
import summariesRoutes from "./summaries.route.js";
import flashcardsRoutes from "./flashcards.route.js";

router.use("/auth/", authRoutes);
router.use("/user/", usersRoutes);
router.use("/upload/", uploadsRoutes);
router.use("/summarize/", summariesRoutes);
router.use("/flashcards/", flashcardsRoutes);

export default router;
