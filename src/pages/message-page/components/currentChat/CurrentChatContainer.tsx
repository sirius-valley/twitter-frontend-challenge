import React, {useEffect, useState} from "react";
import {useHttpRequestService} from "../../../../service/HttpRequestService";
import {useToast} from "../../../../components/toast/ToastContext";
import {ToastType} from "../../../../components/toast/Toast";
import {ChatDTO, MessageDTO} from "../../../../service";
import {io, Socket} from "socket.io-client";
import {
  ChatHeader,
  InputGroup,
  MessageBubble,
  MessageInput,
  MessagesContainer,
  StyledCurrentChatContainer,
  WritingIndicator
} from "./StyledCurrentChatContainer";
import Button from "../../../../components/button/Button";
import {ButtonType} from "../../../../components/button/StyledButton";
import {useMe} from "../../../../hooks/useMe";

interface CurrentChatContainerProps {
  chat: ChatDTO | null;
}

interface Message {
  chatId: string;
  senderId: string;
  content: string;
}

interface IsWriting {
  chatId: string;
  username: string;
}

const CurrentChatContainer: React.FC<CurrentChatContainerProps> = ({ chat }) => {
  const service = useHttpRequestService();
  const me = useMe();
  const { showToast } = useToast();
  const [messageHistory, setMessageHistory] = useState<MessageDTO[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{senderId: string, content: string}[]>([]);
  const [isWriting, setIsWriting] = useState<boolean>(false);
  const [writingMessage, setWritingMessage] = useState<string>("");
  const SOCKET_SERVER_URL = "http://localhost:8080";

  const fetchChatHistory = async (id: string) => {
    try {
      const response = await service.getMessageHistory(id);
      setMessageHistory(response);
    } catch (e) {
      console.log(e);
      showToast("Could not get chat history", ToastType.ALERT);
    }
  };

  useEffect(() => {
    if (chat) fetchChatHistory(chat.id);
  }, [chat]);

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL, {
      extraHeaders: {
        authorization: `${localStorage.getItem('token')}`,
      }
    });
    setSocket(newSocket);
    if (chat) newSocket.emit("joinRoom", chat.id);

    newSocket.on("reply", (message: Message) => {
      if (message.chatId !== chat?.id) {
        showToast(`New message from ${message.senderId}`, ToastType.ALERT);
      }
      console.log(message);
      setMessages((prev: { senderId: string, content: string }[]) => [...prev, message])
    });

    newSocket.on("writing", (data: IsWriting) => {
      if (data.chatId !== chat?.id) return;
      setIsWriting(true);
      setWritingMessage(`${data.username} is writing...`);
      setTimeout(() => setIsWriting(false), 2000);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [chat]);

  const sendMessage = () => {
    if (socket && chat?.id && message) {
      socket.emit("message", chat.id, message);
      setMessage("");
    }
  };

  const setWriting = () => {
    if (socket && chat?.id) socket.emit("writing", chat.id);
  };

  return (
    <StyledCurrentChatContainer>
      <ChatHeader>
        <h1 style={{marginBottom: '0'}}>{chat?.name || "Select a Chat"}</h1>
        {isWriting && <WritingIndicator>{writingMessage}</WritingIndicator>}
      </ChatHeader>
      <MessagesContainer>
        {messageHistory.map((msg, index) => (
          <MessageBubble key={index} sender={msg.senderId === me.user.id}>{msg.content}</MessageBubble>
        ))}
        {messages.map((msg, index) => (
          <MessageBubble key={index} sender={msg.senderId === me.user.id}>{msg.content}</MessageBubble>
        ))}
      </MessagesContainer>
      <InputGroup>
        <MessageInput
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setWriting();
          }}
          placeholder="Type a message"
        />
        <Button
          onClick={sendMessage}
          buttonType={ButtonType.DEFAULT}
          size={"MEDIUM"}
          text={"Send"}
        />
      </InputGroup>
    </StyledCurrentChatContainer>
  );
};

export default CurrentChatContainer;