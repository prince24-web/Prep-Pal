import createCrudHandlers from "../utils/crudFactory.js";
import asyncWrapper from "../utils/asyncWrapper.js";

const paymentsCrud = createCrudHandlers("payments");

const createPayment = asyncWrapper(async (req, res, next) => {
    const payment = await paymentsCrud.create(req.body);
    res.status(201).json({
        status: "success",
        data: { msg: "Payment record created successfully.", payment },
    });
});

const getPayment = asyncWrapper(async (req, res, next) => {
    const payment = await paymentsCrud.getOne(req.params.id);
    res.status(200).json({
        status: "success",
        data: {
            msg: "Payment retrieved successfully.",
            payment,
        },
    });
});

const getAllPayments = asyncWrapper(async (req, res, next) => {
    const allPayments = await paymentsCrud.getAll();
    res.status(200).json({
        status: "success",
        data: {
            msg: "All Payments retrieved successfully.",
            payments: allPayments,
        },
    });
});

const updatePaymentById = asyncWrapper(async (req, res, next) => {
    const updatedPayment = await paymentsCrud.update(req.params.id, req.body);
    res.status(200).json({
        status: "success",
        data: { msg: "User updated successfully.", updatedPayment },
    });
});

const deletePaymentById = asyncWrapper(async (req, res, next) => {
    await paymentsCrud.remove(req.params.id);
    res.status(200).json({
        status: "success",
        data: { msg: "User deleted successfully.", id: req.params.id },
    });
});

const paymentsController = {
    createPayment,
    getPayment,
    getAllPayments,
    updatePaymentById,
    deletePaymentById,
};
export default paymentsController;
