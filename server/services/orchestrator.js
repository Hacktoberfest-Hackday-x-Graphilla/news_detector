import { analyzeGemini } from "./geminiService.js";
import config from "../config/index.js";

export async function analyze(filePath, mediaBuffer, filename, mediaType) {
  const buffer = mediaBuffer || filePath;
  const { apiKey, model } = config.gemini;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY must be set for media analysis");
  }

  return analyzeGemini(buffer, filename, mediaType, apiKey, model);
}
