
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are an expert design career counselor for "The System" training program. 
Your goal is to explain why this 1-on-1 program is better than recorded courses.
The program has 3 phases: 
1. Engineering Foundations (Academic rules, psychology).
2. Market Simulation (Real-world client handling).
3. Income System (Pricing, high-ticket clients).

Always respond in professional and encouraging Arabic. 
Keep answers concise but high-value. 
If asked about price, mention it's an investment in a partnership, not just a fee.
`;

export const getGeminiResponse = async (userMessage: string) => {
  // Always use process.env.API_KEY directly as per guidelines.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    // response.text is a property getter, do not call as a function.
    return response.text || "عذراً، حدث خطأ ما في الاتصال بالذكاء الاصطناعي.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "نعتذر، لم أتمكن من معالجة طلبك حالياً.";
  }
};
