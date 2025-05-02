import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { userChatSessions } from "../functions/tutorChatSessions.js"; // For storing chat history

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function tutorChatController(req, res) {
  console.log("Gemini Tutor Chat running...");

  try {
    const { userId, domain, subject, topic, question } = req.body;

    if (!userId || !domain || !subject || !topic) {
      return res.status(400).json({ success: false, error: "Missing required fields: userId, domain, subject, or topic." });
    }

    const sessionKey = `${userId}:${domain}:${subject}:${topic}`;

    let chatHistory = userChatSessions.get(sessionKey) || [];

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const chat = model.startChat({
      history: chatHistory,
      generationConfig: { temperature: 0.6 },
    });

    let userPrompt;

    if (!question && chatHistory.length === 0) {
      // Initial explanation if user is starting a topic
      userPrompt = `Act as a human tutor. Give complete structured notes on the topic "${topic}" in ${subject} (${domain}) with:
- Simple explanations
- Real-life examples (if applicable)
- Diagrams in text format (if helpful)
- Subheadings, bullet points, and summary.`;
    } else if (question) {
      // Follow-up query
      userPrompt = question;
    } else {
      // If somehow message is empty after session has begun
      userPrompt = `Continue explaining "${topic}" in more detail.`;
    }

    const result = await chat.sendMessage(userPrompt);
    const responseText = result.response.text();

    // Save updated chat history
    chatHistory.push(
      { role: "user", parts: [{ text: userPrompt }] },
      { role: "model", parts: [{ text: responseText }] }
    );
    userChatSessions.set(sessionKey, chatHistory);

    return res.status(200).json({
      success: true,
      message: responseText,
    });
  } catch (error) {
    console.error("Gemini Tutor Chat Error:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Something went wrong in the tutor session.",
    });
  }
}
