export const estimateTokensFromFlashcards = (flashcardsArray) => {
    return flashcardsArray.length * 400;
};

export const estimateTokensFromChunks = (chunksArray) => {
    return chunksArray.length * 1800;
};
