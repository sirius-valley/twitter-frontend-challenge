import React, { createContext, useContext, useState, ReactNode } from "react";
import {ChatDTO} from "../../service";

interface ChatContextType {
  chats: ChatDTO[];
  setChats: React.Dispatch<React.SetStateAction<ChatDTO[]>>;
  updateLastMessage: (chatId: string, message: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [chats, setChats] = useState<ChatDTO[]>([]);

  const updateLastMessage = (chatId: string, message: string) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId ? { ...chat, lastMessage: message } : chat
      )
    );
  };

  return (
    <ChatContext.Provider value={{ chats, setChats, updateLastMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};
