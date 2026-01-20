
import { GoogleGenAI, Type } from "@google/genai";

// Use the API key exclusively from the environment variable as per guidelines.
// Always create a new GoogleGenAI instance inside the call to ensure the latest API key is used.
export const getSmartBusinessRecommendations = async (query: string, businesses: any[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  const model = 'gemini-3-flash-preview';

  const businessData = businesses.map(b => ({
    id: b.id,
    name: b.name,
    category: b.category,
    description: b.description
  }));

  const prompt = `Based on the user's request: "${query}", which of these businesses would be best? 
  Businesses: ${JSON.stringify(businessData)}
  
  Return the ID of the best business and a short reason why.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            bestBusinessId: { 
              type: Type.STRING,
              description: 'The unique ID of the recommended business.'
            },
            reason: { 
              type: Type.STRING,
              description: 'Brief explanation for why this business matches the query.'
            }
          },
          required: ["bestBusinessId", "reason"],
          propertyOrdering: ["bestBusinessId", "reason"],
        }
      }
    });

    // Directly access response.text property (not a function)
    const text = response.text;
    if (!text) return null;
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};
