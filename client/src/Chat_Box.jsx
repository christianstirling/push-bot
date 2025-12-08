import "./Chat_Box.css";
import React, { useState } from "react";
import Message_Container from "./Message_Container";
import Message_Form from "./Message_Form";

export default function Chat_Box() {
  const [messages, setMessages] = useState([]);

  const handleSend = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
  };
  return (
    <div className="Chat_Box">
      <Message_Container messages={messages} />
      <Message_Form onSend={handleSend} />
    </div>
  );
}
