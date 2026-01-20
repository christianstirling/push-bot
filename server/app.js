import express from "express";
import cors from "cors";

const NODE_ENV = "development";
const PORT = "3000";

import { openai_router } from "./routes/openai_router.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

// API routes
app.use("/api/chat", openai_router);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", env: NODE_ENV });
});

app.get("/", (req, res) => {
  console.log("App.get called");
  res.send("Res.send string");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export default app;
