import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Handles quiz generation using Gemini Flash
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
export async function generateQuizController(req, res) {
  console.log("Gemini running...");

  try {
    const { domain, subject, topic, questionCount } = req.body;

    if (!domain || !subject || !topic) {
      return res.status(400).json({ success: false, error: "Missing required fields: domain, subject, or topic." });
    }

    const count = questionCount && Number(questionCount) >= 5 && Number(questionCount) <= 10
      ? Number(questionCount)
      : 5;

    const prompt = `Create a quiz with ${count} multiple-choice questions about "${topic}" in ${subject} (${domain}).

Each question should include:
1. A clear question
2. Four options (A, B, C, D)
3. The correct answer (only the letter)
4. A short explanation

Respond in the following JSON format:
[
  {
    "question": "Question text",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "correctAnswer": "A",
    "explanation": "Because..."
  },
  ...
]`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    let quiz;
    try {
      quiz = JSON.parse(text);
    } catch (e) {
      const match = text.match(/\[[\s\S]*\]/);
      quiz = match ? JSON.parse(match[0]) : null;
    }

    if (!quiz || !Array.isArray(quiz)) {
      throw new Error("Invalid format returned by Gemini.");
    }

    return res.status(200).json({
      success: true,
      questions: quiz,
    });
  } catch (error) {
    console.error("Gemini Quiz Error:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Something went wrong generating the quiz.",
    });
  }
}
