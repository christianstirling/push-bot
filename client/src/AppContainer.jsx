import "./AppContainer.css";
import ChatBox from "./ChatBox";
import TaskInput from "./input/TaskInput.jsx";
import { useState } from "react";

export default function AppContainer() {
  const [messages, setMessages] = useState([]);
  console.log("Messages", messages);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (text) => {
    const trimmed = text.trim();
    console.log("trimmed", trimmed);
    if (!trimmed) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: trimmed,
    };
    console.log("user message", userMessage);

    setMessages((prev) => [...prev, userMessage]);
    console.log("messages (after setMessages)", messages);

    const history = [...messages, userMessage].map((m) => ({
      role: m.role,
      content: m.content,
    }));
    console.log("history", history);

    try {
      setIsLoading(true);

      console.log("loading status:", isLoading);

      console.log("fetch POST from :3000/api/chat");
      console.log(
        "sending: ",
        JSON.stringify({
          message: trimmed,
          history,
        })
      );

      const res = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmed,
          history,
        }),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();
      console.log("response", data);
      const assistantText = data;
      const assistantMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: assistantText,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      console.log("messages (after setMessage)", messages);
    } catch (err) {
      console.error(err);

      const errorMessage = {
        id: Date.now() + 2,
        role: "system",
        content: "Sorry, there was an error reaching the server.",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      console.log("loading status", isLoading);
    }
  };

  return (
    <div className="AppContainer">
      <TaskInput />
      <ChatBox
        messages={messages}
        isLoading={isLoading}
        handleSend={handleSend}
      />
    </div>
  );
}
