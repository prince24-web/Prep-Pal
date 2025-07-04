// utils/deductTokens.js
import supabase from "../config/supabaseClient.js";
import CreateError from "./createError.js";

const deductTokens = async (userId, tokens, trx = {}) => {
    const usage_day = new Date().toISOString().split("T")[0];

    // 1. Get user
    const { data: user, error: userError } = await supabase
        .from("users")
        .select("available_tokens")
        .eq("id", userId)
        .single();

    if (userError || !user) throw new CreateError("User not found", 404);
    if (user.available_tokens < tokens)
        throw new CreateError("Not enough tokens", 403);

    // 2. Deduct tokens
    const { error: updateError } = await supabase
        .from("users")
        .update({
            available_tokens: user.available_tokens - tokens,
        })
        .eq("id", userId);

    if (updateError) {
        console.error("❌ Failed to deduct tokens:", updateError);
        throw new CreateError("Failed to deduct tokens", 500);
    }

    // 3. Log token usage
    const { error: logError } = await supabase.from("tokens_used").insert([
        {
            user_id: userId,
            amount_used: tokens,
            usage_day,
        },
    ]);

    if (logError) {
        console.error("❌ Failed to log token usage:", logError);
        throw new CreateError("Failed to log token usage", 500);
    }

    return true;
};

export default deductTokens;
