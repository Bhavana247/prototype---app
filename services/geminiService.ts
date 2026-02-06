
import { GoogleGenAI } from "@google/genai";
// Fixed the import to use BMWModel instead of the non-existent BMWCar
import { BMWModel } from "../types";

// Always use a named parameter and the process.env.API_KEY directly as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Fixed the parameter type to BMWModel
export const getCarInsights = async (car: BMWModel): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      // Updated to gemini-3-pro-preview for complex reasoning tasks and to match the UI's "Gemini Pro Analysis" label
      model: 'gemini-3-pro-preview',
      contents: `Provide a short, professional automotive expert's perspective on the ${car.name}. 
      Mention its performance of ${car.specs.horsepower} HP, ${car.specs.acceleration}s 0-100 time, 
      and how it stacks up in its class. Keep it under 100 words.`,
      config: {
        systemInstruction: "You are a professional automotive journalist and BMW specialist.",
        temperature: 0.7,
      }
    });

    // Directly access .text property from GenerateContentResponse as per guidelines.
    return response.text || "No insights found for this model.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating AI insights.";
  }
};

// Fixed the parameter types to BMWModel
export const getCarComparison = async (car1: BMWModel, car2: BMWModel): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      // Updated to gemini-3-pro-preview for complex reasoning tasks
      model: 'gemini-3-pro-preview',
      contents: `Compare the ${car1.name} with the ${car2.name}. 
      Focus on performance, target audience, and value for money. 
      Use a concise, expert tone.`,
    });
    // Directly access .text property from GenerateContentResponse as per guidelines.
    return response.text || "Comparison unavailable.";
  } catch (error) {
    return "Failed to fetch comparison.";
  }
};
