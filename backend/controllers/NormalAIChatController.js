import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { userGeneralChats } from "../functions/AiGeneralChatSession.js"; // A shared memory map

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function normalAIChatController(req, res) {
  console.log("General AI Chat running...");

  try {
    const { userId, message } = req.body;

    if (!userId || !message) {
      return res.status(400).json({ success: false, error: "Missing userId or message." });
    }

    const sessionKey = `general:${userId}`;
    let chatHistory = userGeneralChats.get(sessionKey) || [];

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const chat = model.startChat({
      history: chatHistory,
      generationConfig: { temperature: 0.7 },
    });

    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    // Update history
    chatHistory.push(
      { role: "user", parts: [{ text: message }] },
      { role: "model", parts: [{ text: responseText }] }
    );
    userGeneralChats.set(sessionKey, chatHistory);

    return res.status(200).json({
      success: true,
      message: responseText,
    });
  } catch (error) {
    console.error("AI Chat Error:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Something went wrong in AI chat.",
    });
  }
}
