import createCrudHandlers from "../utils/crudFactory.js";
import asyncWrapper from "../utils/asyncWrapper.js";

const usersCrud = createCrudHandlers("users");
const BASE_URL = process.env.BASE_URL || "http://localhost:3000/api";

const createUser = asyncWrapper(async (req, res, next) => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
        }),
    });
    const result = await response.json();
    const userId = result.data.registeredUser.id;
    const { password, ...updates } = req.body;
    const user = await usersCrud.update(userId, updates);
    res.status(201).json({
        status: "success",
        data: { msg: "User created successfully.", user },
    });
});

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
    const options = {};
    const allUsers = await usersCrud.getAll(options);
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
    createUser,
    getUser,
    updateUser,
    deleteUser,
    getUserById,
    getAllUsers,
    updateUserById,
    deleteUserById,
};
export default usersController;
