import "./ChatBox.css";
import React, { useState } from "react";
import MessageContainer from "./MessageContainer";
import MessageForm from "./MessageForm";

export default function ChatBox({ messages, isLoading, onSend }) {
  return (
    <div className="ChatBox">
      <MessageContainer messages={messages} />
      <MessageForm onSend={onSend} />
    </div>
  );
}
