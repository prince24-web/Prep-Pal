import { Router } from "express";
import protect from "../middlewares/authMiddleware.js";
import adminOnly from "../middlewares/adminOnly.js";

const router = Router();

import tokensRoutes from "./tokens.route.js";
import usersController from "../controllers/users.controller.js";

router.use("/tokens/", tokensRoutes);
router
    .route("/me/")
    .get(protect, usersController.getUser)
    .patch(protect, usersController.updateUser)
    .delete(protect, usersController.deleteUser);
router.get("/", protect, adminOnly, usersController.getAllUsers);
router
    .route("/:id")
    .get(protect, usersController.getUserById)
    .patch(protect, adminOnly, usersController.updateUserById)
    .delete(protect, adminOnly, usersController.deleteUserById);

export default router;
