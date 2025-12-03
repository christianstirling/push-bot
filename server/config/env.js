import dotenv from "dotenv";
dotenv.config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

import OpenAI from "openai";
const MODEL = "gpt-4.1-mini";
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export function get_env() {
  const {
    OPENAI_API_KEY,
    NODE_ENV = "development",
    PORT = "5000",
  } = process.env;

  if (!OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is required");
  }

  return { OPENAI_API_KEY, NODE_ENV, PORT: Number(PORT) };
}
