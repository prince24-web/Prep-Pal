import asyncWrapper from "../utils/asyncWrapper.js";
import createCrudHandlers from "../utils/crudFactory.js";
import CreateError from "../utils/createError.js";

const usersCrud = createCrudHandlers("users");
const tokensUsedCrud = createCrudHandlers("tokens_used");

const getUserTokens = asyncWrapper(async (req, res, next) => {
    const userId = req.user.id;

    const user = await usersCrud.getOne(userId);
    const availableTokens = user?.available_tokens;

    if (availableTokens)
        res.status(200).json({
            status: "success",
            data: { userId, availableTokens },
        });
    else
        return next(
            new CreateError("Couldn't find user's availabe tokens", 404)
        );
});

const useUserTokens = asyncWrapper(async (req, res, next) => {
    const userId = req.user.id;
    const amountUsed = req.query.amount;

    const user = await usersCrud.getOne(userId);
    const availableTokens = user?.available_tokens;

    if (availableTokens < amountUsed)
        return next(
            new CreateError("User's tokens isn't enough to proceed.", 400)
        );

    const updatedUserData = await usersCrud.update(userId, {
        available_tokens: availableTokens - amountUsed,
    });
    if (!updatedUserData)
        return next(new CreateError("User is not found.", 404));

    const tokensUsedLog = await tokensUsedCrud.create({
        user_id: userId,
        amount_used: amountUsed,
        usage_date: new Date(),
    });

    res.status(200).json({
        status: "success",
        data: {
            userId,
            previousTokensAmount: availableTokens,
            amountUsed,
            currentTokensAmount: updatedUserData.available_tokens,
            tokensUsedLog,
        },
    });
});

const addUserTokens = asyncWrapper(async (req, res, next) => {
    const userId = req.user.id;
    const amountAdded = req.query.amount;

    const user = await usersCrud.getOne(userId);
    const availableTokens = user?.available_tokens;

    const updatedUserData = await usersCrud.update(userId, {
        available_tokens: availableTokens + amountAdded,
    });
    if (!updatedUserData)
        return next(new CreateError("User is not found.", 404));

    res.status(200).json({
        status: "success",
        data: {
            userId,
            previousTokensAmount: availableTokens,
            amountAdded,
            currentTokensAmount: updatedUserData.available_tokens,
        },
    });
});

const tokensController = {
    getUserTokens,
    useUserTokens,
    addUserTokens,
};
export default tokensController;
