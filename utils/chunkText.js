export const extractTextChunks = (text, maxLength = 3000) => {
    const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [text];
    const chunks = [];

    let current = "";
    for (let sentence of sentences) {
        if ((current + sentence).length > maxLength) {
            chunks.push(current);
            current = "";
        }
        current += sentence;
    }
    if (current) chunks.push(current);

    return chunks;
};
