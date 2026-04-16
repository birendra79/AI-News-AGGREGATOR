const { GoogleGenerativeAI } = require('@google/generative-ai');

let genAI = null;
let model = null;

const initializeAI = () => {
    if (!process.env.GEMINI_API_KEY) {
        console.warn("GEMINI_API_KEY is not set. AI Summarization will fail.");
        return;
    }
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
};

const generateSummary = async (text, language = 'English') => {
    if (!model) {
        initializeAI();
        if (!model) throw new Error("AI service is not configured with an API key.");
    }

    const prompt = `You are an AI News Summarizer. Summarize the following news article clearly and concisely in 2-3 short paragraphs. Highlight the key points and keep the tone objective.
Ensure the output is strictly written in ${language}.

Article Details:
${text}

Summary:`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("AI Generation failed:", error.message);
        throw new Error("Failed to generate summary from AI. " + error.message);
    }
};

module.exports = {
    generateSummary
};
