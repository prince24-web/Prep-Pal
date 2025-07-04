import createCrudHandlers from "../utils/crudFactory.js";
import asyncWrapper from "../utils/asyncWrapper.js";

const usersCrud = createCrudHandlers("users");

const getUser = asyncWrapper(async (req, res, next) => {
    res.status(200).json({
        status: "success",
        data: {
            msg: "Authorized user retrieved successfully.",
            user: req.user,
        },
    });
});

const usersController = { getUser };
export default usersController;
