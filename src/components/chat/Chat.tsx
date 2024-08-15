import { ChatDTO } from "../../service";
import { useGetMyUser } from "../../hooks/htttpServicesHooks/user.hooks";
import { StyledContainer } from "../common/Container";
import ChatBox from "./ChatBox";
import { StyledHeaderContainer } from "../../pages/home-page/components/header/HeaderContainer";
import FriendData from "./FriendData";

type ChatProps = {
  chat: ChatDTO;
};

const Chat = ({ chat }: ChatProps) => {
  const { data, isLoading } = useGetMyUser();

  const isOtherUser = () => {
    return chat.users.find((user) => data?.id !== user.id);
  };

  const friend = isOtherUser();
  return (
    <>
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
    </>
  );
};

export default Chat;
