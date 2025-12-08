import "./Message_Bubble.css";

export default function Message_Bubble({ role, content }) {
  const isUser = role === "user";
  const messageColor = isUser ? "darkblue" : "darkgreen";

  return (
    <div className={`message-row ${isUser ? "user" : "assistant"}`}>
      <div className="Message_Bubble" style={{ backgroundColor: messageColor }}>
        {content}
      </div>
    </div>
  );
}
