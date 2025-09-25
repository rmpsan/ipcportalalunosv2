
import { GoogleGenAI, Chat } from "@google/genai";

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export function createChatSession(): Chat {
    const chat: Chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: 'You are a helpful and creative AI assistant for audiovisual students at Instituto Paulista de Cinema. Your goal is to help them with creative ideation, scriptwriting, technical questions, and project planning. Be encouraging and provide practical, actionable advice.',
        },
    });
    return chat;
}

export async function sendMessageStream(chat: Chat, message: string) {
    return chat.sendMessageStream({ message });
}
