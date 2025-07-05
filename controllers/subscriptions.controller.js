import createCrudHandlers from "../utils/crudFactory.js";
import asyncWrapper from "../utils/asyncWrapper.js";

const subscriptionsCrud = createCrudHandlers("Subscriptions");

const createSubscription = asyncWrapper(async (req, res, next) => {
    const Subscription = await subscriptionsCrud.create(req.body);
    res.status(201).json({
        status: "success",
        data: {
            msg: "Subscription record created successfully.",
            Subscription,
        },
    });
});

const getSubscription = asyncWrapper(async (req, res, next) => {
    const Subscription = await subscriptionsCrud.getOne(req.params.id);
    res.status(200).json({
        status: "success",
        data: {
            msg: "Subscription retrieved successfully.",
            Subscription,
        },
    });
});

const getAllSubscriptions = asyncWrapper(async (req, res, next) => {
    const allSubscriptions = await subscriptionsCrud.getAll();
    res.status(200).json({
        status: "success",
        data: {
            msg: "All Subscriptions retrieved successfully.",
            Subscriptions: allSubscriptions,
        },
    });
});

const updateSubscriptionById = asyncWrapper(async (req, res, next) => {
    const updatedSubscription = await subscriptionsCrud.update(
        req.params.id,
        req.body
    );
    res.status(200).json({
        status: "success",
        data: { msg: "User updated successfully.", updatedSubscription },
    });
});

const deleteSubscriptionById = asyncWrapper(async (req, res, next) => {
    await subscriptionsCrud.remove(req.params.id);
    res.status(200).json({
        status: "success",
        data: { msg: "User deleted successfully.", id: req.params.id },
    });
});

const subscriptionsController = {
    createSubscription,
    getSubscription,
    getAllSubscriptions,
    updateSubscriptionById,
    deleteSubscriptionById,
};
export default subscriptionsController;
