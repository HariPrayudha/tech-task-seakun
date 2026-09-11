import { Router } from "express";

import { ProductController } from "../controllers/productController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { uploadProductImage } from "../middleware/uploadProductImage.js";
import {
  validateBody,
  validateParams,
  validateQuery,
} from "../middleware/validateRequest.js";
import {
  createProductBodySchema,
  listProductsQuerySchema,
  productIdParamsSchema,
  updateProductBodySchema,
} from "../schemas/productSchemas.js";

export const createProductRouter = (controller = new ProductController()): Router => {
  const router = Router();

  router.get(
    "/",
    validateQuery(listProductsQuerySchema),
    asyncHandler(controller.list.bind(controller)),
  );
  router.post(
    "/:id/image",
    validateParams(productIdParamsSchema),
    uploadProductImage,
    asyncHandler(controller.uploadImage.bind(controller)),
  );
  router.get(
    "/:id",
    validateParams(productIdParamsSchema),
    asyncHandler(controller.getById.bind(controller)),
  );
  router.post(
    "/",
    validateBody(createProductBodySchema),
    asyncHandler(controller.create.bind(controller)),
  );
  router.patch(
    "/:id",
    validateParams(productIdParamsSchema),
    validateBody(updateProductBodySchema),
    asyncHandler(controller.update.bind(controller)),
  );
  router.put(
    "/:id",
    validateParams(productIdParamsSchema),
    validateBody(updateProductBodySchema),
    asyncHandler(controller.update.bind(controller)),
  );
  router.delete(
    "/:id",
    validateParams(productIdParamsSchema),
    asyncHandler(controller.delete.bind(controller)),
  );

  return router;
};

export const productRouter = createProductRouter();
