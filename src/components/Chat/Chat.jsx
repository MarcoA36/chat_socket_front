import React, { useEffect, useState } from "react";
import { useChat } from "../../context/ChatContext";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import Messages from "./Messages/Messages";
import { messagesRequest } from "../../api/chat";

const Chat = () => {
  const [message, setMessage] = useState("");
  const { setMessages, messages, socket, updateConversations } = useChat();
  const { user } = useAuth();
  const { id: receiverId } = useParams(); 
  console.log(receiverId);

  useEffect(() => {
    const fetchMessages = async () => {
      if (receiverId) {
        try {
          const response = await messagesRequest(receiverId);
          setMessages(response.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };
    fetchMessages();
  }, [receiverId, setMessages]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = {
      content: message,
      sender_id: user.id,
      sender_username: user.username,
      receiver_id: receiverId,
    };
    
    socket.emit('client:message', msg, (ack) => {
      if (ack.success) {
        console.log('Message delivered and saved:', ack.message);
        setMessages((prevMessages) => [...prevMessages, ack.message]);
        updateConversations(ack.message)
      } else {
        console.error('Message delivery failed:', ack.error);
      }
    });
    
    setMessage("");
  };

  return (
    <>
      <div className="chat_content">
        <Messages messages={messages} />
      </div>

      <form onSubmit={handleSubmit} className="chat_form p-2">
        <input
          type="text"
          name="message"
          value={message}
          onChange={handleChange}
          placeholder="Escriba un mensaje"
          autoComplete="off"
          className="form-control"
        />
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
    </>
  );
};

export default Chat;
