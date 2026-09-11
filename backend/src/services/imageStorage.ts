import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import { basename, join, resolve, sep } from "node:path";

import { fileTypeFromBuffer } from "file-type";

import { env } from "../config/env.js";
import { AppError } from "../errors/AppError.js";

export const ALLOWED_IMAGE_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export type UploadedImage = {
  buffer: Buffer;
  mimetype: string;
  originalname: string;
  size: number;
};

export type StoredImage = {
  imageUrl: string;
};

export interface ImageStorage {
  save(file: UploadedImage): Promise<StoredImage>;
  deleteByUrl(imageUrl: string | null): Promise<void>;
}

export class LocalImageStorage implements ImageStorage {
  constructor(private readonly uploadDir = env.UPLOAD_DIR) {}

  async save(file: UploadedImage): Promise<StoredImage> {
    if (file.size > env.MAX_IMAGE_SIZE_BYTES) {
      throw new AppError("Image exceeds the maximum allowed size", 413, "UPLOAD_TOO_LARGE");
    }

    const detectedType = await fileTypeFromBuffer(file.buffer);

    if (!detectedType || !ALLOWED_IMAGE_MIME_TYPES.has(detectedType.mime)) {
      throw new AppError(
        "Only JPG, PNG, and WebP images are allowed",
        415,
        "INVALID_IMAGE",
      );
    }

    const extension = detectedType.ext === "jpeg" ? "jpg" : detectedType.ext;
    const filename = `${randomUUID()}.${extension}`;
    const directory = resolve(this.uploadDir);
    const filePath = join(directory, filename);

    await mkdir(directory, { recursive: true });
    await writeFile(filePath, file.buffer, { flag: "wx" });

    return { imageUrl: `/uploads/${filename}` };
  }

  async deleteByUrl(imageUrl: string | null): Promise<void> {
    const filePath = this.resolveOwnedFilePath(imageUrl);

    if (!filePath) {
      return;
    }

    try {
      await unlink(filePath);
    } catch (error) {
      if (isFileNotFoundError(error)) {
        return;
      }

      throw error;
    }
  }

  private resolveOwnedFilePath(imageUrl: string | null): string | null {
    if (!imageUrl?.startsWith("/uploads/")) {
      return null;
    }

    const filename = imageUrl.slice("/uploads/".length);

    if (
      filename !== basename(filename) ||
      !/^[a-f0-9-]+\.(jpg|png|webp)$/i.test(filename)
    ) {
      return null;
    }

    const directory = resolve(this.uploadDir);
    const filePath = resolve(directory, filename);

    if (!filePath.startsWith(`${directory}${sep}`)) {
      return null;
    }

    return filePath;
  }
}

const isFileNotFoundError = (error: unknown): error is NodeJS.ErrnoException =>
  error instanceof Error && "code" in error && error.code === "ENOENT";

export const imageStorage = new LocalImageStorage();
