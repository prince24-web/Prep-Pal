import axios from "axios";
import pdf from "pdf-parse";
import supabase from "../config/supabaseClient.js";
import CreateError from "../utils/createError.js";
import { extractTextChunks } from "../utils/chunkText.js";
import { downloadCaptions } from "../utils/downloadCaptions.js";
import { parseVttToText } from "../utils/parseVttToText.js";
import uploadsCrudFactory from "../utils/crudFactory.js";

const uploadsCrud = uploadsCrudFactory("uploads");

// type: 'summary' | 'flashcards' | 'mock'
const verifyTokensAndParse = (type = "summary") => {
    return async (req, res, next) => {
        const userId = req.user.id;
        const fileId = req.params.id;

        // 1. Get upload record
        const file = await uploadsCrud.getOne(fileId);
        if (!file || file.user_id !== userId) {
            return next(
                new CreateError("Upload not found or unauthorized", 404)
            );
        }

        let rawText = "";

        // 2. Extract rawText based on file type
        try {
            if (file.content_type === "pdf") {
                const response = await axios.get(file.content_url, {
                    responseType: "arraybuffer",
                });
                const pdfData = await pdf(response.data);
                rawText = pdfData.text;
            } else if (file.content_type === "youtube") {
                const vtt = await downloadCaptions(file.content_url);
                if (!vtt) throw new Error("Failed to get captions");
                rawText = parseVttToText(vtt);
            } else {
                return next(new CreateError("Unsupported content type", 400));
            }
        } catch (err) {
            console.error("❌ Parsing failed:", err.message);
            return next(new CreateError("Failed to parse file content", 500));
        }

        // 3. Estimate token cost
        const chunks = extractTextChunks(rawText, 3000);
        let tokensNeeded;

        switch (type) {
            case "summary":
                tokensNeeded = chunks.length * 1800;
                break;
            case "flashcards":
                tokensNeeded = chunks.length * 1800; // 1 chunk = 5 flashcards = same
                break;
            case "mock":
                tokensNeeded = chunks.length * 2200; // let’s assume mock generation is more expensive
                break;
            default:
                return next(new CreateError("Unknown generation type", 400));
        }

        // 4. Check token quota
        const { data: user, error } = await supabase
            .from("users")
            .select("available_tokens")
            .eq("id", userId)
            .single();

        if (error || !user) {
            return next(new CreateError("User not found", 404));
        }

        if (user.available_tokens < tokensNeeded) {
            return next(
                new CreateError(
                    `You need at least ${tokensNeeded} tokens for this action.`,
                    403
                )
            );
        }

        // 5. Pass values to next handler
        req.chunks = chunks;
        req.rawText = rawText;
        req.tokensNeeded = tokensNeeded;
        req.file = file;

        next();
    };
};

export default verifyTokensAndParse;
