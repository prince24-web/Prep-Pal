import * as dotenv from "dotenv";
dotenv.config();

import multer from "multer";
import express from "express";
import cors from "cors";
const app = express();

// Middleware
app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json());

import routes from "./routes/index.route.js";
app.use("/api/", routes);

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({ error: "File too large" });
        }
    }

    console.error("🚨 Error:", err.message);

    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong";

    res.status(statusCode).json({
        success: false,
        message,
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server is listening on port:", PORT));
