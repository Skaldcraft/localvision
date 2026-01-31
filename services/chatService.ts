import { GoogleGenAI, Chat } from "@google/genai";

export class LocalVisionChat {
  private chat: Chat;

  constructor() {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
    this.chat = ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: `You are 'LocalVision Chat', a specialized AI business assistant. 
        You help users understand local market dynamics, refine business ideas, and plan their entrepreneurial journey. 
        Be professional, data-centric, and encouraging. 
        Focus on hyper-local business strategy.`,
      },
    });
  }

  async sendMessage(message: string) {
    try {
      const response = await this.chat.sendMessage({ message });
      return response.text;
    } catch (error) {
      console.error("Chat Error:", error);
      return "I'm sorry, I'm having trouble connecting to my knowledge base. Please try again in a moment.";
    }
  }
}