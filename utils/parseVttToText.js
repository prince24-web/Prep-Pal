export const parseVttToText = (vtt) => {
    return vtt
        .split("\n")
        .filter((line) => line && !line.includes("-->") && isNaN(line))
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();
};
