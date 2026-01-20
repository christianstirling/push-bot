import "./AppContainer.css";
import ChatBox from "./chat/ChatBox";
import TaskInput from "./input/TaskInput.jsx";
import ImpactGraph from "./display/ImpactGraph.jsx";
import { use, useState } from "react";

export default function AppContainer() {
  const [messages, setMessages] = useState([]);
  // console.log("Messages", messages);
  const [isLoading, setIsLoading] = useState(false);
  const [displayMode, setDisplayMode] = useState("input");
  const [latestResult, setLatestResult] = useState({});

  const handleSendMessage = async (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);

    const history = [...messages, userMessage].map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      setIsLoading(true);

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
      const assistantText = data.assistantContent;

      const assistantMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: assistantText,
      };

      setMessages((prev) => [...prev, assistantMessage]);
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
    }
  };

  const handleSendInput = async (form) => {
    const messageHeader = `Below is a list of inputs that define a task. Please determine the the most impactful input variable by calculating the metric contribution percentage.\n---`;

    const { action, force, vertical, distance_horizontal, frequency } = form;

    const trimmed = `${messageHeader}\nAction: ${action}\nForce: ${force}\nVertical: ${vertical}\nDistance horizontal: ${distance_horizontal}\nFrequency: ${frequency}`;
    if (!trimmed) {
      return;
    }

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);

    const history = [...messages, userMessage].map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      setIsLoading(true);

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

      // console.log("response", data);
      const assistantText = data.assistantContent;
      const assistantMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: assistantText,
      };

      setDisplayMode("result");
      setLatestResult({
        name: data.toolResult.name,
        value: data.toolResult.value,
      });

      setMessages((prev) => [...prev, assistantMessage]);
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
    }
  };

  return (
    <div className="AppContainer">
      <ChatBox
        messages={messages}
        isLoading={isLoading}
        onSend={handleSendMessage}
      />

      {displayMode === "input" && <TaskInput onSend={handleSendInput} />}
      {displayMode === "result" && (
        <ImpactGraph name={latestResult.name} value={latestResult.value} />
      )}
    </div>
  );
}
