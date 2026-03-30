import { GoogleGenerativeAI } from "@google/generative-ai";

// Google Gemini — completely free, no credit card
// Get your key at https://aistudio.google.com/apikey
// Free tier: 15 RPM, 1M tokens/day, 1500 RPD

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Gemini 2.5 Flash — best free model available
// Free tier: 10 RPM, 250 RPD
export function getChatModel() {
  return genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
}

// Lighter model for intent scoring
export function getLiteModel() {
  return genAI.getGenerativeModel({ model: "gemma-3-4b-it" });
}
