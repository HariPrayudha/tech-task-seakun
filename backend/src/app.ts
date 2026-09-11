import cors from "cors";
import express from "express";

export const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
  }),
);
app.use(express.json());

app.get("/health", (_request, response) => {
  response.json({
    success: true,
    data: {
      service: "backend",
      status: "ok",
    },
  });
});
