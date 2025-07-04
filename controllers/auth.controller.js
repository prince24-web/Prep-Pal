import supabase from "../config/supabaseClient.js";
import CreateError from "../utils/createError.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import createCrudHandlers from "../utils/crudFactory.js";

const usersCrud = createCrudHandlers("users");

const registerUser = asyncWrapper(async (req, res, next) => {
    const { email, password, username } = req.body;

    // Check if Supabase client is available
    if (!supabase) {
        return next(new CreateError("Database connection not available", 500));
    }

    const { data, error } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { username },
    });

    if (error) return next(new CreateError(error.message, 400));

    res.status(201).json({
        status: "success",
        data: { registeredUser: data.user },
    });
});

const loginUser = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;

    // Check if Supabase client is available
    if (!supabase) {
        return next(new CreateError("Database connection not available", 500));
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) return next(new CreateError(error.message, 401));

    res.status(200).json({
        status: "success",
        session: data.session,
        user: data.user,
    });
});

const googleOAuth = asyncWrapper(async (req, res, next) => {
    const { redirectTo } = req.body;

    // Check if Supabase client is available
    if (!supabase) {
        return next(new CreateError("Database connection not available", 500));
    }

    // Construct the proper callback URL
    const callbackUrl = `${
        process.env.FRONTEND_URL || "http://localhost:3000"
    }/api/auth/callback`;

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: callbackUrl,
            queryParams: {
                access_type: "offline",
                prompt: "consent",
            },
        },
    });

    if (error) return next(new CreateError(error.message, 401));

    res.status(200).json({ url: data.url });
});

const googleOAuthCallback = asyncWrapper(async (req, res, next) => {
    const { code } = req.query;

    if (!supabase) {
        return res.redirect(
            `${
                process.env.FRONTEND_URL || "http://localhost:5173"
            }/auth?error=server_error`
        );
    }

    if (!code) {
        return res.redirect(
            `${
                process.env.FRONTEND_URL || "http://localhost:5173"
            }/auth?error=no_code`
        );
    }

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
        console.error("OAuth callback error:", error);
        return res.redirect(
            `${
                process.env.FRONTEND_URL || "http://localhost:5173"
            }/auth?error=auth_failed`
        );
    }

    const { user, session } = data;

    const redirectUrl = `${
        process.env.FRONTEND_URL || "http://localhost:5173"
    }/auth/callback?access_token=${session.access_token}&refresh_token=${
        session.refresh_token
    }`;
    return res.redirect(redirectUrl);
});

const authController = {
    registerUser,
    loginUser,
    googleOAuth,
    googleOAuthCallback,
};
export default authController;
