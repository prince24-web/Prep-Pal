import youtubedl from "youtube-dl-exec";
import fs from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";

export const downloadCaptions = async (videoUrl) => {
    const tempDir = "./temp";
    await fs.mkdir(tempDir, { recursive: true });
    const filename = `${uuid()}.en.vtt`;

    try {
        const outputPath = path.join(tempDir, filename);

        await youtubedl(videoUrl, {
            writeAutoSub: true,
            subLang: "en",
            skipDownload: true,
            output: `${tempDir}/%(id)s`,
        });

        const files = await fs.readdir(tempDir);
        const vttFile = files.find((f) => f.endsWith(".en.vtt"));
        if (!vttFile) return null;

        const vttPath = path.join(tempDir, vttFile);
        const content = await fs.readFile(vttPath, "utf8");

        await fs.unlink(vttPath); // cleanup

        return content;
    } catch (err) {
        console.error("Caption download error:", err);
        return null;
    }
};
