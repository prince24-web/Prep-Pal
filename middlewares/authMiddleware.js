import CreateError from "../utils/createError.js";
import supabase from "../config/supabaseClient.js";
import createCrudHandlers from "../utils/crudFactory.js";

const usersCrud = createCrudHandlers("users");

const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer "))
        return next(new CreateError("No token provided", 401));

    const token = authHeader.split(" ")[1];

    try {
        const {
            data: { user },
            error,
        } = await supabase.auth.getUser(token);

        if (error || !user)
            return next(new CreateError("Invalid or expired token", 401));

        const fullUser = await usersCrud.getOne(user.id);
        if (!fullUser)
            return next(new CreateError("User not found in local DB", 404));

        req.user = fullUser;
        next();
    } catch (err) {
        return next(new CreateError("Auth verification failed", 401));
    }
};

export default protect;
