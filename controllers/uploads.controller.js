// controllers/uploads.controller.js
import multer from "multer";
import supabase from "../config/supabaseClient.js";
import CreateError from "../utils/createError.js";
import createCrudHandlers from "../utils/crudFactory.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import { downloadCaptions } from "../utils/downloadCaptions.js";
import { parseVttToText } from "../utils/parseVttToText.js";

const uploadsCrud = createCrudHandlers("uploads");

const storage = multer.memoryStorage();
const fileFilter = (_, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new CreateError("Only PDF files are allowed", 400), false);
};

const uploadUtil = multer({
    storage,
    fileFilter,
    limits: { fileSize: 50 * 1024 * 1024 },
});

const uploadPDF = asyncWrapper(async (req, res, next) => {
    const userId = req.user.id;

    if (!req.file) return next(new CreateError("No file uploaded", 400));
    const filename = `${userId}-${Date.now()}`;

    const { data, error } = await supabase.storage
        .from("pdfs")
        .upload(filename, req.file.buffer, {
            contentType: "application/pdf",
            cacheControl: "3600",
            upsert: false,
        });

    if (error) return next(new CreateError("Failed to upload file", 500));

    const { data: urlData } = supabase.storage
        .from("pdfs")
        .getPublicUrl(filename);

    const uploadLog = await uploadsCrud.create({
        user_id: userId,
        content_type: "pdf",
        content_url: urlData.publicUrl,
        uploaded_at: new Date(),
    });

    res.status(201).json({
        status: "success",
        data: {
            msg: "File uploaded successfully",
            filename,
            path: data.path,
            uploadLog,
        },
    });
});

const uploadYouTube = asyncWrapper(async (req, res, next) => {
    const userId = req.user.id;
    const vidUrl = req.body.url;

    const match = vidUrl.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (!match) return next(new CreateError("Invalid YouTube URL", 400));

    const transcriptVtt = await downloadCaptions(vidUrl);
    if (!transcriptVtt) {
        return next(
            new CreateError(
                "This video doesn't have English auto-generated captions.",
                400
            )
        );
    }

    const result = await uploadsCrud.create({
        user_id: userId,
        content_type: "youtube",
        content_url: vidUrl,
        uploaded_at: new Date(),
    });

    res.status(201).json({
        status: "success",
        data: {
            msg: "YouTube video added successfully",
            record: result,
        },
    });
});

const uploadsController = { uploadUtil, uploadPDF, uploadYouTube };
export default uploadsController;
