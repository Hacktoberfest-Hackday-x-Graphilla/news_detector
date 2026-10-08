import { readFile } from "node:fs/promises";
import config from "../config/index.js";

const REQUEST_TIMEOUT_MS = 120_000;

function buildPrompt(mediaType, detectorResult) {
  if (detectorResult) {
    return [
      "Give a brief, cautious explanation of this digital-media analysis.",
      "The listed detector verdict and scores are authoritative; do not change them or claim independent forensic verification.",
      mediaType === "image"
        ? "You may describe visible image content, but do not infer authenticity from appearance alone."
        : "You have not received the video itself. Explain only the supplied detector result; do not claim to have watched or inspected the video.",
      "State one or two useful limitations. Keep the response under 120 words.",
      `Detector result: ${JSON.stringify({
        verdict: detectorResult.verdict,
        confidence: detectorResult.confidence,
        reasoning: detectorResult.reasoning,
        details: detectorResult.details,
        frameCount: detectorResult.frameCount,
      })}`,
    ].join("\n");
  }

  return [
    "Briefly describe only what is visibly present in this image, in plain language.",
    "Do not decide whether it is real, fake, AI-generated, manipulated, or authentic.",
    "Do not infer identity, intent, provenance, or events that are not clearly visible.",
    "State that visual description alone cannot verify authenticity. Keep the response under 100 words.",
  ].join("\n");
}

async function getImageBase64(mediaInput) {
  const buffer =
    typeof mediaInput === "string" ? await readFile(mediaInput) : mediaInput;
  return buffer.toString("base64");
}

export async function explainWithGemma(
  mediaInput,
  filename,
  mediaType,
  detectorResult,
) {
  const message = {
    role: "user",
    content: buildPrompt(mediaType, detectorResult),
  };

  if (mediaType === "image") {
    message.images = [await getImageBase64(mediaInput)];
  }

  let response;
  try {
    const baseUrl = config.gemma.baseUrl.replace(/\/+$/, "");
    response = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: config.gemma.model,
        messages: [message],
        stream: false,
        options: { temperature: 0.2 },
      }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch (error) {
    if (error instanceof Error && error.name === "TimeoutError") {
      throw new Error("Local Gemma 4 request timed out. Check that Ollama is running and the model is loaded.");
    }
    throw new Error(
      "Could not connect to local Ollama. Start Ollama and confirm it is listening at the configured OLLAMA_BASE_URL.",
    );
  }

  if (!response.ok) {
    const responseBody = await response.text();
    throw new Error(
      `Local Gemma 4 request failed (${response.status}): ${responseBody.slice(0, 500)}`,
    );
  }

  const data = await response.json();
  const explanation = data.message?.content?.trim();
  if (!explanation) {
    throw new Error("Local Gemma 4 returned an empty explanation.");
  }

  return {
    status: "ready",
    model: config.gemma.model,
    filename,
    explanation,
  };
}
