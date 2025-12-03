// server/routes/chatRouter.js
import express from "express";
import { chat } from "../functions/chat.js";
import { get_openai } from "../services/openai.js";
export const chat_router = express.Router();

chat_router.post("/", async (req, res, next) => {
  try {
    const { message, history } = req.body;
    const response = await chat({ message, history, client: get_openai() });
    res.json(response);
  } catch (err) {
    next(err);
  }
});
