import * as dotenv from "dotenv";
dotenv.config();

import { createClient } from "@supabase/supabase-js";

let supabase;

try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
        console.error("❌ Missing Supabase environment variables:");
        console.error(
            "   SUPABASE_URL:",
            supabaseUrl ? "✅ Set" : "❌ Missing"
        );
        console.error(
            "   SUPABASE_SERVICE_ROLE_KEY:",
            supabaseServiceKey ? "✅ Set" : "❌ Missing"
        );
        console.error("   Please create a .env file with these variables");
        throw new Error("Supabase environment variables are missing");
    }

    supabase = createClient(supabaseUrl, supabaseServiceKey);
    console.log("✅ Supabase client initialized successfully");
} catch (err) {
    console.error("❌ Failed to initialize Supabase client:", err.message);
    // Don't exit the process, let it continue but log the error
}

export default supabase;
