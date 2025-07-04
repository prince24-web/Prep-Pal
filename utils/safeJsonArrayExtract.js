import util from "util";

export default function safeJsonArrayExtract(rawText) {
    // Remove markdown wrappers if any
    let cleaned = rawText.replace(/```json[\s\S]*?```/gi, (block) =>
        block.replace(/```json|```/gi, "")
    );
    if (!cleaned.trim()) cleaned = rawText;

    // Match everything starting from first [ until either the matching ] or EOF
    const match = cleaned.match(/\[\s*{[\s\S]+$/);
    if (!match) {
        console.warn("⚠️ No JSON-like array found in LLM output.");
        return null;
    }

    let json = match[0]
        .trim()
        .replace(/[“”]/g, '"') // smart quotes
        .replace(/[‘’]/g, "'") // smart single quotes
        .replace(/\.\.\./g, "...") // ellipses
        .replace(/,\s*}/g, "}") // trailing comma before }
        .replace(/,\s*]/g, "]"); // trailing comma before ]

    // If there's no closing ], add one to try to fix
    if (!json.trim().endsWith("]")) {
        json += "]";
    }

    try {
        const parsed = JSON.parse(json);
        if (Array.isArray(parsed)) return parsed;
    } catch (e) {
        console.error(
            "❌ Failed to parse JSON array. Final attempt content:",
            util.inspect(json, { maxStringLength: 500 })
        );
    }

    // Final fallback log
    console.error(
        "❌ Could not recover JSON. Raw model output:",
        util.inspect(rawText, { maxStringLength: 500 })
    );
    return null;
}
