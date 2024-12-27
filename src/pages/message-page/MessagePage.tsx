import {StyledMessagesContainer} from "./StyledMessagesContainer";
import ChatsContainer from "./components/chats/ChatsContainer";
import CurrentChatContainer from "./components/currentChat/CurrentChatContainer";
import {useState} from "react";
import {ChatDTO} from "../../service";

const MessagePage = () => {
  const [currentChat, setCurrentChat] = useState<ChatDTO | null>(null);
  
  return (
    <StyledMessagesContainer>
      <ChatsContainer setCurrentChat={setCurrentChat} currentChat={currentChat!}/>
      {currentChat && (<CurrentChatContainer chat={currentChat}/>)}
    </StyledMessagesContainer>
  );
}

export default MessagePage;