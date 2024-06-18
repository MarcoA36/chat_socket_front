import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import io from "socket.io-client";
import { useAuth } from "./AuthContext";
import { inboxRequest } from "../api/chat";

const ChatContext = createContext();

export const useChat = () => {
  return useContext(ChatContext);
};

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const { user } = useAuth();
  const socket = io("http://localhost:3001");

  useEffect(() => {
    if (user && user.id) {
      socket.emit("user_connected", user.id);
      console.log(`Usuario ${user.id} conectado`);
    }

    
    const handleMessageFromServer = (msg) => {
      console.log("Received message from server:", msg);
      updateMessages(msg);
      updateConversations(msg);
    };

    socket.on("server:message", handleMessageFromServer);

    return () => {
      socket.off("server:message", handleMessageFromServer);
    };
  }, [user, socket]);

  const fetchConversations = useCallback(async () => {
    console.log('fetch')
    try {
      const response = await inboxRequest();
      setConversations(response.data);
    } catch (error) {
      console.error("Error fetching inbox:", error);
    }
  }, []);

  useEffect(() => {
    if (user && user.id) {
      fetchConversations();
    }
  }, [user, fetchConversations]);


  const updateMessages = (msg) => {
    setMessages((prevMessages) => [...prevMessages, msg]);
  };

  // const updateConversations = (msg) => {
  //   setConversations((prevConversations) => {
  //     const index = prevConversations.findIndex(
  //       (conversation) =>
  //         conversation.participant._id === msg.sender_id ||
  //         conversation.participant._id === msg.receiver_id
  //     );

  //     if (index !== -1) {
  //       const updatedConversation = {
  //         ...prevConversations[index],
  //         lastMessage: msg,
  //         unreadCount:
  //           prevConversations[index].participant._id === msg.sender_id
  //             ? prevConversations[index].unreadCount + 1
  //             : prevConversations[index].unreadCount,
  //       };

  //       const newConversations = [...prevConversations];
  //       newConversations.splice(index, 1);
  //       newConversations.unshift(updatedConversation);

  //       // Ordenar las conversaciones por la fecha del último mensaje (más reciente primero)
  //       newConversations.sort((a, b) => {
  //         const dateA = a.lastMessage
  //           ? new Date(a.lastMessage.sent_at)
  //           : new Date(0);
  //         const dateB = b.lastMessage
  //           ? new Date(b.lastMessage.sent_at)
  //           : new Date(0);
  //         return dateB - dateA;
  //       });

  //       return newConversations;
  //     } else {
  //       const newConversations = [
  //         {
  //           participant: {
  //             _id: msg.sender_id,
  //             username: msg.sender_username,
  //           },
  //           lastMessage: msg,
  //           unreadCount: msg.sender_id === user.id ? 0 : 1,
  //         },
  //         ...prevConversations,
  //       ];

  //       newConversations.sort((a, b) => {
  //         const dateA = a.lastMessage
  //           ? new Date(a.lastMessage.sent_at)
  //           : new Date(0);
  //         const dateB = b.lastMessage
  //           ? new Date(b.lastMessage.sent_at)
  //           : new Date(0);
  //         return dateB - dateA;
  //       });

  //       return newConversations;
  //     }
  //   });
  // };



  // const updateConversations = (msg) => {
  //   setConversations((prevConversations) => {
  //     const index = prevConversations.findIndex(
  //       (conversation) =>
  //         conversation.participant._id === msg.sender_id ||
  //         conversation.participant._id === msg.receiver_id
  //     );
  
  //     // Evitar añadir una conversación con el propio usuario
  //     const participantId =
  //       msg.sender_id === user.id ? msg.receiver_id : msg.sender_id;
  
  //     if (index !== -1) {
  //       const updatedConversation = {
  //         ...prevConversations[index],
  //         lastMessage: msg,
  //         unreadCount:
  //           prevConversations[index].participant._id === msg.sender_id
  //             ? prevConversations[index].unreadCount + 1
  //             : prevConversations[index].unreadCount,
  //       };
  
  //       const newConversations = [...prevConversations];
  //       newConversations.splice(index, 1);
  //       newConversations.unshift(updatedConversation);
  
  //       // Ordenar las conversaciones por la fecha del último mensaje (más reciente primero)
  //       newConversations.sort((a, b) => {
  //         const dateA = a.lastMessage
  //           ? new Date(a.lastMessage.sent_at)
  //           : new Date(0);
  //         const dateB = b.lastMessage
  //           ? new Date(b.lastMessage.sent_at)
  //           : new Date(0);
  //         return dateB - dateA;
  //       });
  
  //       return newConversations;
  //     } else {
  //       // Añadir nueva conversación solo si el participante no es el propio usuario
  //       if (participantId !== user.id) {
  //         const newConversations = [
  //           {
  //             participant: {
  //               _id: participantId,
  //               username: msg.sender_id === user.id ? msg.receiver_username : msg.sender_username,
  //               profilePicture: msg.sender_id === user.id ? msg.receiver_profilePicture : msg.sender_profilePicture,
  //             },
  //             lastMessage: msg,
  //             unreadCount: msg.sender_id === user.id ? 0 : 1,
  //           },
  //           ...prevConversations,
  //         ];
  
  //         newConversations.sort((a, b) => {
  //           const dateA = a.lastMessage
  //             ? new Date(a.lastMessage.sent_at)
  //             : new Date(0);
  //           const dateB = b.lastMessage
  //             ? new Date(b.lastMessage.sent_at)
  //             : new Date(0);
  //           return dateB - dateA;
  //         });
  
  //         return newConversations;
  //       }
  
  //       return prevConversations;
  //     }
  //   });
  // };
  



  const updateConversations = (msg) => {
    setConversations((prevConversations) => {
      const participantId =
        msg.sender_id === user.id ? msg.receiver_id : msg.sender_id;
  
      const index = prevConversations.findIndex(
        (conversation) =>
          conversation.participant._id === participantId
      );
  
      if (index !== -1) {
        const updatedConversation = {
          ...prevConversations[index],
          lastMessage: msg,
          unreadCount:
            prevConversations[index].participant._id === msg.sender_id
              ? prevConversations[index].unreadCount + 1
              : prevConversations[index].unreadCount,
        };
  
        const newConversations = [...prevConversations];
        newConversations.splice(index, 1);
        newConversations.unshift(updatedConversation);
  
        // Ordenar las conversaciones por la fecha del último mensaje (más reciente primero)
        newConversations.sort((a, b) => {
          const dateA = a.lastMessage
            ? new Date(a.lastMessage.sent_at)
            : new Date(0);
          const dateB = b.lastMessage
            ? new Date(b.lastMessage.sent_at)
            : new Date(0);
          return dateB - dateA;
        });
  
        return newConversations;
      } else {
        const newConversations = [
          {
            participant: {
              _id: participantId,
              username: msg.sender_id === user.id ? msg.receiver_username : msg.sender_username,
              profilePicture: msg.sender_id === user.id ? msg.receiver_profilePicture : msg.sender_profilePicture,
            },
            lastMessage: msg,
            unreadCount: msg.sender_id === user.id ? 0 : 1,
          },
          ...prevConversations,
        ];
  
        newConversations.sort((a, b) => {
          const dateA = a.lastMessage
            ? new Date(a.lastMessage.sent_at)
            : new Date(0);
          const dateB = b.lastMessage
            ? new Date(b.lastMessage.sent_at)
            : new Date(0);
          return dateB - dateA;
        });
  
        return newConversations;
      }
    });
  };
  

  return (
    <ChatContext.Provider
      value={{
        messages,
        conversations,
        setMessages,
        setConversations,
        socket,
        updateConversations
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
