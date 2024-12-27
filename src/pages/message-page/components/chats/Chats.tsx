import { ChatDTO } from "../../../../service";
import React from "react";
import Loader from "../../../../components/loader/Loader";
import { ChatList, ChatItem, ChatName, ChatDate, EmptyState } from "./StyledChatContainer";

interface ChatProps {
  chats?: ChatDTO[];
  isLoading: boolean;
  onChatClick: (chat: ChatDTO) => void;
  selectedChat?: ChatDTO;
}

const Chats: React.FC<ChatProps> = ({ chats, isLoading, onChatClick, selectedChat }) => {
  if (isLoading) {
    return <Loader />;
  }

  if (!chats || chats.length === 0) {
    return <EmptyState>No hay chats disponibles.</EmptyState>;
  }

  return (
    <ChatList>
      {chats.map((chat) => (
        <ChatItem
          key={chat.id}
          onClick={() => onChatClick(chat)}
          isSelected={selectedChat?.id === chat.id}
        >
          <ChatName>{chat.name}</ChatName>
        </ChatItem>
      ))}
    </ChatList>
  );
};

export default Chats;
