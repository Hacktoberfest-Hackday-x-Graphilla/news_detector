import { analyze } from "../services/orchestrator.js";
import { inferType as sightInferType } from "../services/sightEngineService.js";
import { inferType as hiveInferType } from "../services/hiveService.js";
import { removeFile } from "../utils/fileUtils.js";
import config from "../config/index.js";

function ndjson(res, obj) {
  res.write(JSON.stringify(obj) + "\n");
}

function inferType(filename) {
  return sightInferType(filename) || hiveInferType(filename);
}

export async function detect(req, res, next) {
  try {
    let mediaBuffer;
    let filename;
    let mediaType;

    if (req.file) {
      mediaBuffer = req.file.path;
      filename = req.file.originalname;
      mediaType = inferType(filename);
    } else if (req.body?.media) {
      mediaBuffer = Buffer.from(req.body.media, "base64");
      filename = req.body.filename || "upload";
      mediaType = inferType(filename);
    } else {
      return res.status(400).json({ error: "No media provided. Use multipart/form-data (field: 'media') or application/json (field: 'media' as base64)" });
    }

    if (!mediaType) {
      return res.status(400).json({ error: "Unsupported file type. Supported: images (JPG, PNG, WebP, GIF) and videos (MP4, WebM, AVI, MKV, WMV, MOV)" });
    }

    const hasSightEngineCredentials =
      Boolean(config.sightEngine.apiUser) &&
      Boolean(config.sightEngine.apiSecret);
    const hasHiveCredentials = Boolean(config.hive.apiKey);
    const serviceName =
      mediaType === "video"
        ? hasHiveCredentials
          ? "Hive AI with an optional local Gemma 4 explanation"
          : "video analysis (Hive API key required)"
        : hasSightEngineCredentials
          ? "SightEngine with an optional local Gemma 4 explanation"
          : hasHiveCredentials
            ? "Hive AI with an optional local Gemma 4 explanation"
            : "local Gemma 4 visual description only (no forensic detector configured)";

    res.setHeader("Content-Type", "application/x-ndjson");

    ndjson(res, { type: "status", message: `Sending to ${serviceName} for ${mediaType} analysis...` });

    const result = await analyze(req.file?.path, mediaBuffer, filename, mediaType);

    ndjson(res, { type: "status", message: "Analysis complete" });
    ndjson(res, { type: "result", data: result });

    res.end();
  } catch (err) {
    if (res.headersSent) {
      ndjson(res, { type: "error", message: err.message });
      res.end();
    } else {
      next(err);
    }
  } finally {
    if (req.file) {
      try {
        await removeFile(req.file.path);
      } catch (err) {
        console.error("Failed to remove uploaded media:", err);
      }
    }
  }
}
