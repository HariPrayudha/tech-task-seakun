import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { LocalImageStorage } from "../src/services/imageStorage.js";

const pngBuffer = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
  "base64",
);

describe("LocalImageStorage", () => {
  it("stores a validated image and deletes it by owned URL", async () => {
    const directory = await mkdtemp(join(tmpdir(), "seakun-image-test-"));
    const storage = new LocalImageStorage(directory);

    try {
      const stored = await storage.save({
        buffer: pngBuffer,
        mimetype: "image/png",
        originalname: "product.png",
        size: pngBuffer.length,
      });
      const filename = stored.imageUrl.replace("/uploads/", "");

      await expect(readFile(join(directory, filename))).resolves.toEqual(pngBuffer);
      await storage.deleteByUrl(stored.imageUrl);
      await expect(readFile(join(directory, filename))).rejects.toMatchObject({ code: "ENOENT" });
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it("rejects content that is not a supported image", async () => {
    const directory = await mkdtemp(join(tmpdir(), "seakun-image-test-"));
    const storage = new LocalImageStorage(directory);

    try {
      await expect(
        storage.save({
          buffer: Buffer.from("not an image"),
          mimetype: "image/png",
          originalname: "fake.png",
          size: 12,
        }),
      ).rejects.toMatchObject({ code: "INVALID_IMAGE", statusCode: 415 });
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });
});
