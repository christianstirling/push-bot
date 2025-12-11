// server/routes/chatRouter.js
import express from "express";
import { chat } from "../functions/chat.js";
export const openai_router = express.Router();

import dotenv from "dotenv";
dotenv.config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

import OpenAI from "openai";

openai_router.post("/", async (req, res, next) => {
  try {
    const message = req.body.message;
    console.log(message);
    const history = req.body.history;
    const client = new OpenAI({
      apiKey: OPENAI_API_KEY,
    });
    const response = await chat({ message, history, client });
    console.log(response);
    res.json(response);
  } catch (err) {
    next(err);
  }
});
