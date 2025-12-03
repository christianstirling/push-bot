// server/services/openai.js

import { get_env } from "../config/env.js";
import OpenAI from "openai";

export const MODEL = "gpt-4.1-mini";

let openai_instance = null;

export function get_openai() {
  if (!openai_instance) {
    const { OPENAI_API_KEY } = get_env();

    if (!OPENAI_API_KEY) {
      throw new Error("openai api key required to use the openai client");
    }

    openai_instance = new OpenAI({
      apiKey: OPENAI_API_KEY,
    });
  }

  return openai_instance;
}
