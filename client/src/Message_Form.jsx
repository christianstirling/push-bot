import "./Message_Form.css";
import { useState } from "react";

export default function Message_Form({ onSend }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend(value);
    setValue("");
  };

  return (
    <form action="" className="Message_Form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="message_input"
        placeholder="write a message.."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="message_submit">
        send
      </button>
    </form>
  );
}
