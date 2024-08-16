import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { StyledContentContainer } from "../home-page/components/contentContainer/StyledContentContainer";
import { useToken } from "../../hooks/useToken";
import { AuthorDTO, ChatDTO } from "../../service";
import FriendBox from "../../components/chat/FriendBox";
import { StyledContainer } from "../../components/common/Container";
import { StyledHeaderContainer } from "../home-page/components/header/HeaderContainer";
import { StyledUserSuggestionContainer } from "../home-page/UserSeuggestionContainer";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import Chat from "../../components/chat/Chat";
import chat from "../../redux/chat";

// Define la URL del servidor aquí
const URL: string =
  process.env.NODE_ENV === "production"
    ? "https://your-production-url.com"
    : "http://localhost:8080";

const ChatPage = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { token } = useToken();
  const [friends, SetFriends] = useState<AuthorDTO[]>([]);
  const [actualChat, setActualChat] = useState<ChatDTO | null>(null);
  const { otherUserId } = useSelector((state: RootState) => state.chat);

  useEffect(() => {
    const socketIo = io(URL, {
      extraHeaders: {
        Authorization: token!,
      },
    });

    socketIo.on("connect", () => {
      console.log("Connected to socket server");
      setSocket(socketIo);
      socketIo.emit("joinLobby", {});
    });

    socketIo.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    socketIo.on("joinLobby", (object: AuthorDTO[]) => {
      SetFriends(object);
    });

    socketIo.on("createRoom", (object: ChatDTO) => {
      setActualChat(object);
      console.log(actualChat);
    });

    return () => {
      if (socketIo) {
        socketIo.disconnect();
        console.log("Socket disconnected");
      }
    };
  }, []);

  useEffect(() => {
    if (otherUserId !== "" && socket) {
      socket.emit("createRoom", { otherUserId: otherUserId });
    }
  }, [otherUserId]);

  const createMessage = (chatId: string, content: string) => {
    if (chatId !== "" && content !== "" && socket) {
      socket.emit("createMessage", { chatId: chatId, content: content });
    }
  };
  return (
    <>
      <StyledContentContainer>
        <StyledHeaderContainer
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <p>Friends</p>
        </StyledHeaderContainer>
        <StyledContainer>
          {friends &&
            friends.map((friend, index) => (
              <FriendBox key={index} friend={friend}></FriendBox>
            ))}
        </StyledContainer>
      </StyledContentContainer>
      {actualChat && (
        <>
          <Chat chat={actualChat} onClick={createMessage} />
        </>
      )}
    </>
  );
};

export default ChatPage;
