import React, { useRef, useEffect } from "react";
import "../Chat.css";
import { useAuth } from "../../../context/AuthContext";

const Messages = ({ messages }) => {
  const messagesEndRef = useRef(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <ul id="messages">
      {messages.map((message, i) => (
        <li key={i} className={message.sender_id === user.id ? "sent" : "received"}>
          {message.content}
        </li>
      ))}
      <div ref={messagesEndRef}></div>
    </ul>
  );
};

export default Messages;
