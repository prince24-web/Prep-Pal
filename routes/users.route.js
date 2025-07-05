import { Router } from "express";
import protect from "../middlewares/authMiddleware.js";
import adminOnly from "../middlewares/adminOnly.js";

const router = Router();

import tokensRoutes from "./tokens.route.js";
import usersController from "../controllers/users.controller.js";

router.use("/tokens/", tokensRoutes);
router.get("/me/", protect, usersController.getUser);
router.get("/", protect, adminOnly, usersController.getAllUsers);
router
    .route("/:id")
    .get(protect, usersController.getUserById)
    .patch(usersController.updateUserById)
    .delete(usersController.deleteUserById);

export default router;
