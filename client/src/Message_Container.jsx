import "./Message_Container.css";
import Message_Bubble from "./Message_Bubble.jsx";

export default function Message_Container({ messages }) {
  return (
    <div className="Message_Container">
      {/* {messages.length === 0 && (
        <div className="placeholder">Ask Ergo a question!</div>
      )} */}

      {messages.map((msg) => (
        <Message_Bubble key={msg.id} role={msg.role} content={msg.content} />
      ))}
    </div>
  );
}
