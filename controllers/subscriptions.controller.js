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

const getSubscriptionById = asyncWrapper(async (req, res, next) => {
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

const getUserSubscription = asyncWrapper(async (req, res, next) => {
    const userId = req.user.id;
    const subscription = subscriptionsCrud.getAll({
        limit: 1,
        orderBy: { column: "created_at", ascending: false },
        filter: [
            { op: "eq", column: "user_id", value: userId },
            {
                op: "gte",
                column: "created_at",
                value: new Date().setDate(new Date().getDate() - 30),
            },
        ],
    });
    if (subscription) res.status(200).json({ status: "success" });
    else next(new CreateError("User doesn't have any subscriptions.", 404));
});

const createUserSubscription = asyncWrapper(async (req, res, next) => {
    const userId = req.user.id;
    const subscription = await subscriptionsCrud.create({
        ...req.body,
        user_id: userId,
    });
    res.status(201).json({
        status: "success",
        data: { msg: "User subscription created successfully.", subscription },
    });
});

const subscriptionsController = {
    createSubscription,
    getAllSubscriptions,
    getSubscriptionById,
    updateSubscriptionById,
    deleteSubscriptionById,
    getUserSubscription,
    createUserSubscription,
};
export default subscriptionsController;
