/**
 * PART 0 - SET UP
 *
 * Importing packages
 */

import express, { response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { z } from "zod";

import { openai_router } from "./routes/openai_router.js";

import { ChatOpenAI } from "@langchain/openai";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { HumanMessage, AIMessage } from "@langchain/core/messages";

// Set up ---

const NODE_ENV = "development";
const PORT = "3000";

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

// Message schema

const BodySchema = z.object({
  message: z.string().min(1),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      }),
    )
    .default([]),
});

// Build LLM model

const model = new ChatOpenAI({
  model: "gpt-4.1-mini",
  apiKey: OPENAI_API_KEY,
  temperature: 0,
});

// Build prompt

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a helpful assistant named ergo. Respond in a way that acknowledges what the user asks, but do not provide any assistance until given specific instructions on how to help.",
  ],
  new MessagesPlaceholder("history"),
  ["human", "{input}"],
]);

// Chat function

async function runChat({ input, history }) {
  const historyMessages = (history ?? [])
    .filter(
      (m) =>
        m &&
        typeof m === "object" &&
        typeof m.role === "string" &&
        typeof m.content === "string",
    )
    .map((m) => {
      return m.role === "user"
        ? new HumanMessage(m.content)
        : new AIMessage(m.content);
    });

  const chain = prompt.pipe(model);

  const responseMessage = await chain.invoke({
    input,
    history: historyMessages,
  });

  const assistantText =
    typeof responseMessage.content === "string"
      ? responseMessage.content
      : JSON.stringify(responseMessage.content);

  return assistantText;
}

// Build a router that we can plug into the '/api/chat' path

const newRouter = express.Router();

newRouter.post("/", async (req, res, next) => {
  try {
    const parsed = BodySchema.parse(req.body);

    const response = await runChat({
      input: parsed.message,
      history: parsed.history,
    });

    console.log(response);

    const updatedHistory = [
      ...parsed.history,
      { role: "user", content: parsed.message },
      { role: "assistant", content: response },
    ];

    res.json({ response, history: updatedHistory });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      eror: err?.message ?? "Error",
    });
  }
});

// API routes - this is where we plug in the router built above
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
