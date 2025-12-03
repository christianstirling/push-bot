import express from "express";
import cors from "cors";

import { get_env } from "./config/env.js";
import { chat_router } from "./routes/chat_router.js";

const app = express();

const { NODE_ENV } = get_env();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/chat", chat_router);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", env: NODE_ENV });
});

export default app;
