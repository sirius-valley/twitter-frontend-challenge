import { ChatDTO } from "../../service";
import { useGetMyUser } from "../../hooks/htttpServicesHooks/user.hooks";
import { StyledContainer } from "../common/Container";
import ChatBox from "./ChatBox";
import FriendData from "./FriendData";
import { relative } from "path";
import { Icon, IconType } from "../icon/Icon";
import { StyledIconContainer } from "./StyledIconContainer";
import { ChangeEvent, useState } from "react";

type ChatProps = {
  chat: ChatDTO;
  onClick: (chatId: string, content: string) => void;
};

const Chat = ({ chat, onClick }: ChatProps) => {
  const [query, setQuery] = useState<string>("");
  const { data, isLoading } = useGetMyUser();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const isOtherUser = () => {
    return chat.users.find((user) => data?.id !== user.id);
  };

  const handleReaction = () => {};
  const friend = isOtherUser();
  return (
    <div
      style={{
        display: "flex",
        flex: "1",
        flexDirection: "column",
        width: "100%",
        height: "auto",
        justifyContent: "space-between",
        marginBottom: "2rem",
      }}
    >
      <div style={{ display: "flex", width: "100%" }}>
        <FriendData
          name={friend?.name ?? "Name"}
          profilePicture={friend?.image}
        />
      </div>
      <StyledContainer style={{ overflowY: "auto" }}>
        {!isLoading &&
          data &&
          chat.messages.map((message, index) => (
            <ChatBox
              key={index}
              message={message}
              isFriend={message.senderId !== data.id}
            ></ChatBox>
          ))}
      </StyledContainer>
      <div style={{ position: "relative", display: "flex", width: "100%" }}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Type your message and press Enter..."
          style={{
            padding: "10px",
            boxSizing: "content-box",
            borderRadius: "30px",
            display: "flex",
            width: "100%",
          }}
        />
        <StyledIconContainer>
          {
            Icon({
              width: "16px",
              height: "16px",
              onClick: () => onClick(chat.id, query),
              active: true,
            })[IconType.CHAT]
          }
        </StyledIconContainer>
      </div>
    </div>
  );
};

export default Chat;
