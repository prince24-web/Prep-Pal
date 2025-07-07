import { Router } from "express";
import protect from "../middlewares/authMiddleware.js";

const router = Router();

import paymentsController from "../controllers/payments.controller.js";

router
    .route("/")
    .get(protect, paymentsController.getAllPayments)
    .post(protect, paymentsController.createPayment);
router
    .route("/:id")
    .get(protect, paymentsController.getPayment)
    .patch(protect, paymentsController.updatePaymentById)
    .delete(protect, paymentsController.deletePaymentById);

export default router;
