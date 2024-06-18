import React, { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { inboxRequest } from "../../api/chat";
import { useChat } from "../../context/ChatContext"; 

// const Inbox = () => {
//   const { conversations, setConversations } = useChat();
//   const navigate = useNavigate();

//   const handleClickConversation = (id) => {
//     navigate(`/chat/${id}`);
//     setConversations((prevConversations) => {
//       const updatedConversations = prevConversations.map((conversation) =>
//         conversation.participant._id === id
//           ? { ...conversation, unreadCount: 0 }
//           : conversation
//       );

//       return updatedConversations;
//     });
//   };

//   const getInitial = (username) => {
//     return username ? username.charAt(0).toUpperCase() : "";
//   };

//   return (
//     <div className="chat_content">
//       <ul className="conversations_list">
//         {conversations.map((conversation) => (
//           <li
//             key={conversation.participant._id}
//             className="conversation-item"
//             onClick={() =>
//               handleClickConversation(conversation.participant._id)
//             }
//           >
//             {conversation.participant.profilePicture ? (
//               <img
//                 src={conversation.participant.profilePicture}
//                 alt={`${conversation.participant.username}'s profile`}
//                 className="profile-picture"
//               />
//             ) : (
//               <div className="profile-initial">
//                 {getInitial(conversation.participant.username)}
//               </div>
//             )}
//             <div className="conversation-details">
//               <div className="conversation-username">
//                 {conversation.participant.username}
//               </div>
//               {conversation.lastMessage && (
//                 <div className="conversation-message">
//                   {conversation.lastMessage.content}
//                 </div>
//               )}
//             </div>
//             {conversation.unreadCount > 0 && (
//               <div className="unread-count">{conversation.unreadCount}</div>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Inbox;

const Inbox = () => {
  const { conversations, setConversations } = useChat();
  const navigate = useNavigate();

  const handleClickConversation = (id) => {
    navigate(`/chat/${id}`);
    setConversations((prevConversations) => {
      const updatedConversations = prevConversations.map((conversation) =>
        conversation.participant._id === id
          ? { ...conversation, unreadCount: 0 }
          : conversation
      );

      return updatedConversations;
    });
  };

  const getInitial = (username) => {
    return username ? username.charAt(0).toUpperCase() : "";
  };

  return (
    <div className="chat_content">
      <ul className="conversations_list">
        {conversations.map((conversation) => {
          const { participant, lastMessage, unreadCount } = conversation;
          
          // Asegurarse de que participant no es undefined y tiene profilePicture
          if (!participant) {
            return null; // O alguna lógica para manejar casos sin participant
          }

          return (
            <li
              key={participant._id}
              className="conversation-item"
              onClick={() => handleClickConversation(participant._id)}
            >
              {participant.profilePicture ? (
                <img
                  src={participant.profilePicture}
                  alt={`${participant.username}'s profile`}
                  className="profile-picture"
                />
              ) : (
                <div className="profile-initial">
                  {getInitial(participant.username)}
                </div>
              )}
              <div className="conversation-details">
                <div className="conversation-username">
                  {participant.username}
                </div>
                {lastMessage && (
                  <div className="conversation-message">
                    {lastMessage.content}
                  </div>
                )}
              </div>
              {unreadCount > 0 && (
                <div className="unread-count">{unreadCount}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Inbox;

