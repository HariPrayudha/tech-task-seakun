import cors from "cors";
import express from "express";

import { env } from "./config/env.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";

export const app = express();

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

app.use(notFoundHandler);
app.use(errorHandler);
