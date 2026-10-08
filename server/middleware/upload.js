import multer from "multer";
import { mkdir } from "node:fs/promises";
import config from "../config/index.js";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    mkdir(config.upload.dest, { recursive: true })
      .then(() => cb(null, config.upload.dest))
      .catch(cb);
  },
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}-${file.originalname}`);
  },
});

function fileFilter(_req, file, cb) {
  if (config.upload.allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Unsupported file type: ${file.mimetype}`));
  }
}

export default multer({ storage, fileFilter, limits: { fileSize: config.upload.maxFileSize } });
