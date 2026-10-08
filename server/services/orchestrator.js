import { analyzeSightEngine } from "./sightEngineService.js";
import { analyzeHive } from "./hiveService.js";
import { explainWithGemma } from "./gemmaService.js";
import config from "../config/index.js";

async function addGemmaExplanation(result, buffer, filename, mediaType) {
  try {
    const gemma = await explainWithGemma(
      buffer,
      filename,
      mediaType,
      result,
    );
    result.gemmaExplanation = { ...gemma, mode: "supplementary" };
  } catch (error) {
    result.gemmaExplanation = {
      mode: "supplementary",
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Unknown error while requesting a Gemma 4 explanation.",
    };
  }

  return result;
}

export async function analyze(filePath, mediaBuffer, filename, mediaType) {
  const buffer = mediaBuffer || filePath;

  if (mediaType === "image") {
    const { apiUser, apiSecret } = config.sightEngine;
    const { apiKey } = config.hive;
    const hasSightEngineCredentials = apiUser && apiSecret;
    const hasHiveCredentials = Boolean(apiKey);

    if (!hasSightEngineCredentials && !hasHiveCredentials) {
      const gemma = await explainWithGemma(
        buffer,
        filename,
        mediaType,
        null,
      );
      return {
        verdict: "INCONCLUSIVE",
        confidence: 0,
        reasoning:
          "No dedicated forensic detector is configured. Gemma 4 can describe visible content but cannot provide a verified real/fake authenticity verdict.",
        gemmaExplanation: { ...gemma, mode: "fallback" },
      };
    }

    const result = hasSightEngineCredentials
      ? await analyzeSightEngine(
          buffer,
          filename,
          mediaType,
          apiUser,
          apiSecret,
        )
        : await analyzeHive(buffer, filename, mediaType, apiKey);
    return addGemmaExplanation(result, buffer, filename, mediaType);
  }

  if (mediaType === "video") {
    const { apiKey } = config.hive;
    if (!apiKey) {
      throw new Error(
        "Video analysis requires HIVE_API_KEY. Local Gemma fallback currently supports images only.",
      );
    }

    const result = await analyzeHive(buffer, filename, mediaType, apiKey);
    return addGemmaExplanation(result, buffer, filename, mediaType);
  }

  throw new Error(`Unsupported media type: ${mediaType}`);
}
