import asyncWrapper from "../utils/asyncWrapper.js";
import CreateError from "../utils/createError.js";

const adminOnly = asyncWrapper(async (req, _, next) => {
    if (req.user.role !== "admin")
        return next(
            new CreateError("This route is allowed for admins only.", 401)
        );
    next();
});

export default adminOnly;
