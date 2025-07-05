import { Router } from "express";
import protect from "../middlewares/authMiddleware.js";

const router = Router();

import subscriptionsController from "../controllers/subscriptions.controller.js";

router
    .route("/")
    .get(protect, subscriptionsController.getAllSubscriptions)
    .post(protect, subscriptionsController.createSubscription);
router
    .route("/:id")
    .get(protect, subscriptionsController.getSubscription)
    .patch(subscriptionsController.updateSubscriptionById)
    .delete(subscriptionsController.deleteSubscriptionById);

export default router;
