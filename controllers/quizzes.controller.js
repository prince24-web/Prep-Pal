import axios from "axios";
import zlib from "zlib";
import supabase from "../config/supabaseClient.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import CreateError from "../utils/createError.js";
import createCrudHandlers from "../utils/crudFactory.js";
import deductTokens from "../utils/deductTokens.js";

const quizzesCrud = createCrudHandlers("quizzes");
const QUIZ_MODEL = "mistralai/mistral-7b-instruct-v0.3";

// Upload quiz JSON
const uploadQuizFile = async (recordId, quiz) => {
    const json = JSON.stringify(quiz);
    const compressed = zlib.gzipSync(json);
    const path = `${recordId}.json.gz`;

    const { error } = await supabase.storage
        .from("quizzes")
        .upload(path, compressed, {
            contentType: "application/gzip",
            upsert: true,
        });

    if (error) {
        console.error("❌ Quiz upload error:", error.message, error);
        throw new Error("Failed to upload quiz file.");
    }

    const { data } = supabase.storage.from("quizzes").getPublicUrl(path);
    return data.publicUrl;
};

// Generate MCQ quiz from chunks
const generateQuizWithOpenRouter = async (textChunks) => {
    // Concatenate all chunks into a single string
    const fullText = textChunks.join("\n\n");
    const prompt = `You are an API that generates a mini MCQ quiz in JSON format only, with 10-20 questions. Each question must be an object: {\n  "question": "...",\n  "options": ["A", "B", "C", "D"],\n  "correct": 0,\n  "explanation": "..."\n} and the quiz must be wrapped as follows:\n{\n  "topics": ["Topic 1", "Topic 2", ...],\n  "questionsData": [ ... ]\n}\nDo not explain your response.\n\nInput Text:\n${fullText}\n\nReturn this format only.`;
    const { data } = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
            model: QUIZ_MODEL,
            messages: [{ role: "user", content: prompt }],
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
            },
        }
    );
    let llmOutput = data.choices[0].message.content;
    // Try to parse the output
    let parsed;
    try {
        parsed = JSON.parse(llmOutput);
    } catch (e) {
        // Try to extract JSON if extra text is present
        const match = llmOutput.match(/\{[\s\S]*\}/);
        if (match) {
            try {
                parsed = JSON.parse(match[0]);
            } catch (e2) {
                parsed = null;
            }
        }
    }
    if (parsed && parsed.questionsData && Array.isArray(parsed.questionsData)) {
        // Limit to 10-20 questions
        if (parsed.questionsData.length > 20)
            parsed.questionsData = parsed.questionsData.slice(0, 20);
        if (parsed.questionsData.length < 10) return null;
        return parsed;
    } else {
        console.warn("⚠️ Skipping malformed quiz. LLM output:", llmOutput);
        return null;
    }
};

// 📄 PDF
const generateQuizPDF = asyncWrapper(async (req, res, next) => {
    const { id: fileId } = req.params;
    const { id: userId } = req.user;
    const { chunks, tokensNeeded } = req;
    const quiz = await generateQuizWithOpenRouter(chunks);
    if (!quiz) {
        return next(
            new CreateError(
                "Failed to generate a valid quiz from the provided content. Please try again or contact support.",
                500
            )
        );
    }
    const url = await uploadQuizFile(fileId, quiz);
    const record = await quizzesCrud.create({
        user_id: userId,
        upload_id: fileId,
        content_type: "pdf",
        tokens_used: tokensNeeded,
        quiz_url: url,
        topics: quiz.topics,
        created_at: new Date(),
    });
    await deductTokens(userId, tokensNeeded);
    res.status(200).json({
        status: "success",
        data: { quiz_url: url, record },
    });
});

// 📥 Get all quizzes
const getAllQuizzes = asyncWrapper(async (req, res, next) => {
    const { data, error } = await supabase
        .from("quizzes")
        .select("*")
        .eq("user_id", req.user.id);

    if (error) return next(new CreateError(error.message, 400));

    const PDFQuizzes = data.filter((s) => s.content_type === "pdf");

    res.status(200).json({
        status: "success",
        data: {
            msg: "Quizzes retrieved successfully.",
            PDFQuizzes,
        },
    });
});

export default {
    generateQuizPDF,
    getAllQuizzes,
};
