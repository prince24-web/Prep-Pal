import { Router } from "express";
import adminOnly from "../middlewares/adminOnly.js";
import protect from "../middlewares/authMiddleware.js";

const router = Router();

router.use(protect);
router.use(adminOnly);

// =============
// === Users ===
// =============
import usersController from "../controllers/users.controller.js";
router
    .route("/users/:id")
    .get(usersController.getUserById)
    .patch(usersController.updateUserById)
    .delete(usersController.deleteUserById);
router
    .route("/users/")
    .get(usersController.getAllUsers)
    .post(usersController.createUser);

// ==============
// === Export ===
// ==============

export default router;
