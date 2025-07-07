import { Router } from "express";
import protect from "../middlewares/authMiddleware.js";

const router = Router();
router.use(protect);

import subscriptionsController from "../controllers/subscriptions.controller.js";

router
    .route("/")
    .get(subscriptionsController.getUserSubscription)
    .post(subscriptionsController.createUserSubscription);

export default router;
