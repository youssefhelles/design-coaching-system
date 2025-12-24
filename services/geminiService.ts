
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are an expert design career counselor for "The System" (النظام) training program. 
Your goal is to explain why this 1-on-1 program is better than recorded courses.
The program has 3 phases: 
1. Engineering Foundations (Academic rules, psychology).
2. Market Simulation (Real-world client handling).
3. Income System (Pricing, high-ticket clients).

Key Selling Points:
- Direct 1-on-1 mentorship with Youssef Ayman.
- Real client projects, not just exercises.
- Focus on income and professional delivery.
- Uses Canva + AI for high-end market results.

Always respond in professional and encouraging Arabic. 
Keep answers concise but high-value. 
If asked about price, mention it's an investment in a partnership and recommend contacting Youssef via WhatsApp for a tailored quote.
`;

/**
 * Fetches a response from Gemini AI.
 * Follows the guideline: create a new GoogleGenAI instance right before the call.
 */
export const getGeminiResponse = async (userMessage: string) => {
  // Use the process.env.API_KEY directly as specified.
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

    /**
     * Correct usage: .text is a property getter.
     * Guideline: Do not call response.text().
     */
    const generatedText = response.text;
    return generatedText || "عذراً، حدث خطأ ما في الاتصال بالذكاء الاصطناعي.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "نعتذر، لم أتمكن من معالجة طلبك حالياً.";
  }
};
