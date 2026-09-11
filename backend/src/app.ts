import cors from "cors";
import express, { type Router } from "express";

import { env } from "./config/env.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { productRouter } from "./routes/productRoutes.js";

export const createApp = (productRoutes: Router = productRouter) => {
  const app = express();

  app.use(
    cors({
      origin: env.CORS_ORIGIN,
    }),
  );
  app.use(express.json());

  app.get("/health", (_request, response) => {
    response.json({
      success: true,
      data: {
        service: "backend",
        status: "ok",
        environment: env.NODE_ENV,
      },
    });
  });

  app.use("/products", productRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};

export const app = createApp();
