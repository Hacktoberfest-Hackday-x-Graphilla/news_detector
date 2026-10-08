import { readFile } from "node:fs/promises";

const GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models";
const IMAGE_EXTENSIONS = new Set(["jpg", "jpeg", "png", "gif", "webp", "bmp"]);
const VIDEO_EXTENSIONS = new Set(["mp4", "webm", "avi", "mkv", "wmv", "mov", "m4v"]);

const MIME_TYPES = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  webp: "image/webp",
  bmp: "image/bmp",
  mp4: "video/mp4",
  webm: "video/webm",
  avi: "video/x-msvideo",
  mkv: "video/x-matroska",
  wmv: "video/x-ms-wmv",
  mov: "video/quicktime",
  m4v: "video/mp4",
};

const ANALYSIS_PROMPT = `Analyze this media for signs of AI generation, synthetic editing, manipulation, or deepfake content.
Return only valid JSON with this exact shape:
{
  "verdict": "REAL" | "FAKE" | "INCONCLUSIVE",
  "confidence": number,
  "reasoning": string,
  "aiGeneratedScore": number,
  "deepfakeScore": number,
  "generator": string
}
Scores and confidence must be numbers from 0 to 1. Do not claim certainty when the media is ambiguous.`;

function extensionOf(filename) {
  return filename.split(".").pop()?.toLowerCase() || "";
}

function mimeFromName(filename) {
  return MIME_TYPES[extensionOf(filename)] || "application/octet-stream";
}

export function inferType(filename) {
  const extension = extensionOf(filename);
  if (IMAGE_EXTENSIONS.has(extension)) return "image";
  if (VIDEO_EXTENSIONS.has(extension)) return "video";
  return null;
}

function clampScore(value) {
  const score = Number(value);
  return Number.isFinite(score) ? Math.min(1, Math.max(0, score)) : 0;
}

function parseModelResponse(text) {
  const candidate = text.match(/\{[\s\S]*\}/)?.[0];
  if (!candidate) throw new Error("Gemini returned no JSON analysis");

  let parsed;
  try {
    parsed = JSON.parse(candidate);
  } catch {
    throw new Error("Gemini returned invalid JSON analysis");
  }

  const aiGeneratedScore = clampScore(parsed.aiGeneratedScore);
  const deepfakeScore = clampScore(parsed.deepfakeScore);
  const confidence = Math.round(clampScore(parsed.confidence) * 100);
  const verdict = ["REAL", "FAKE", "INCONCLUSIVE"].includes(parsed.verdict)
    ? parsed.verdict
    : "INCONCLUSIVE";
  const reasoning =
    typeof parsed.reasoning === "string" && parsed.reasoning.trim()
      ? parsed.reasoning.trim()
      : "Gemini did not provide a detailed explanation.";
  const generator =
    typeof parsed.generator === "string" && parsed.generator.trim()
      ? parsed.generator.trim()
      : "none";

  return {
    verdict,
    confidence,
    reasoning,
    details: {
      aiGenerated: {
        verdict: aiGeneratedScore >= 0.5 ? "FAKE" : "REAL",
        score: Number(aiGeneratedScore.toFixed(4)),
      },
      deepfake: {
        verdict: deepfakeScore >= 0.5 ? "FAKE" : "REAL",
        score: Number(deepfakeScore.toFixed(4)),
      },
      generator: {
        name: generator,
        score: Number(Math.max(aiGeneratedScore, deepfakeScore).toFixed(4)),
      },
    },
  };
}

export async function analyzeGemini(mediaInput, filename, mediaType, apiKey, model) {
  const buffer =
    typeof mediaInput === "string" ? await readFile(mediaInput) : mediaInput;
  if (!buffer || !Buffer.isBuffer(buffer)) {
    throw new Error("Media data could not be read for Gemini analysis");
  }

  const response = await fetch(
    `${GEMINI_ENDPOINT}/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: `${ANALYSIS_PROMPT}\nMedia type: ${mediaType}.` },
              {
                inlineData: {
                  mimeType: mimeFromName(filename),
                  data: buffer.toString("base64"),
                },
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.1,
          responseMimeType: "application/json",
        },
      }),
    },
  );

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error");
    throw new Error(`Gemini API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts
    ?.map((part) => part.text || "")
    .join("");
  if (!text) throw new Error("Gemini returned an empty analysis");

  return parseModelResponse(text);
}
