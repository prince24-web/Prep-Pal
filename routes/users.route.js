import { Router } from "express";
import protect from "../middlewares/authMiddleware.js";

const router = Router();

import tokensRoutes from "./tokens.route.js";
import usersController from "../controllers/users.controller.js";

router.use("/tokens/", tokensRoutes);
router.get("/me/", protect, usersController.getUser);

export default router;
