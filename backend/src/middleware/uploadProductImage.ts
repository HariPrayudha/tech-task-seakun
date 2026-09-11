import multer, { MulterError } from "multer";
import type { RequestHandler } from "express";

import { env } from "../config/env.js";
import { AppError } from "../errors/AppError.js";
import { ALLOWED_IMAGE_MIME_TYPES } from "../services/imageStorage.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: env.MAX_IMAGE_SIZE_BYTES,
    files: 1,
  },
  fileFilter: (_request, file, callback) => {
    if (!ALLOWED_IMAGE_MIME_TYPES.has(file.mimetype)) {
      callback(new AppError("Only JPG, PNG, and WebP images are allowed", 415, "INVALID_IMAGE"));
      return;
    }

    callback(null, true);
  },
});

export const uploadProductImage: RequestHandler = (request, response, next) => {
  upload.single("image")(request, response, (error: unknown) => {
    if (!error) {
      next();
      return;
    }

    if (error instanceof MulterError && error.code === "LIMIT_FILE_SIZE") {
      next(new AppError("Image exceeds the maximum allowed size", 413, "UPLOAD_TOO_LARGE"));
      return;
    }

    if (error instanceof AppError) {
      next(error);
      return;
    }

    next(new AppError("Invalid image upload", 400, "INVALID_IMAGE"));
  });
};
