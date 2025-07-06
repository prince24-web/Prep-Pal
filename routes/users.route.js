import { Router } from "express";
import protect from "../middlewares/authMiddleware.js";

const router = Router();

import tokensRoutes from "./tokens.route.js";
import usersController from "../controllers/users.controller.js";

router.use("/tokens/", tokensRoutes);
router
    .route("/me/")
    .get(protect, usersController.getUser)
    .patch(protect, usersController.updateUser)
    .delete(protect, usersController.deleteUser);

export default router;
