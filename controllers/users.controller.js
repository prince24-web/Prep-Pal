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

const updateUser = asyncWrapper(async (req, res, next) => {
    const updatedUser = await usersCrud.update(req.user.id, req.body);
    res.status(200).json({
        status: "success",
        data: {
            msg: "Authorized user updated successfully.",
            user: updatedUser,
        },
    });
});

const deleteUser = asyncWrapper(async (req, res, next) => {
    await usersCrud.remove(req.user.id);
    res.status(200).json({
        status: "success",
        data: { msg: "User deleted successfully.", id: req.user.id },
    });
});

const getUserById = asyncWrapper(async (req, res, next) => {
    const user = await usersCrud.getOne(req.params.id);
    res.status(200).json({
        status: "success",
        data: { msg: "User retrieved successfully.", id: req.params.id, user },
    });
});

const getAllUsers = asyncWrapper(async (req, res, next) => {
    const allUsers = await usersCrud.getAll();
    res.status(200).json({
        status: "success",
        data: { msg: "All users retrieved successfully.", users: allUsers },
    });
});

const updateUserById = asyncWrapper(async (req, res, next) => {
    const updatedUser = await usersCrud.update(req.params.id, req.body);
    res.status(200).json({
        status: "success",
        data: { msg: "User updated successfully.", updatedUser },
    });
});

const deleteUserById = asyncWrapper(async (req, res, next) => {
    await usersCrud.remove(req.params.id);
    res.status(200).json({
        status: "success",
        data: { msg: "User deleted successfully.", id: req.user.id },
    });
});

const usersController = {
    getUser,
    updateUser,
    deleteUser,
    getUserById,
    getAllUsers,
    updateUserById,
    deleteUserById,
};
export default usersController;
