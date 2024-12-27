import {StyledChatContainer} from "./StyledChatContainer";
import {StyledContainer} from "../../../../components/common/Container";
import Button from "../../../../components/button/Button";
import {ButtonType} from "../../../../components/button/StyledButton";
import Chats from "./Chats";
import React, {useEffect, useState} from "react";
import {useChat} from "../../../../hooks/useChat";
import {useToast} from "../../../../components/toast/ToastContext";
import {ToastType} from "../../../../components/toast/Toast";
import {IconType} from "../../../../components/icon/Icon";
import Modal from "../../../../components/modal/Modal";
import {PostModal} from "../../../../components/post-modal/PostModal";
import {SearchBar} from "../../../../components/search-bar/SearchBar";
import {SearchBarProvider} from "../../../../components/search-bar/SearchBarContext";
import {Author, ChatData, ChatDTO} from "../../../../service";

interface ChatsContainerProps {
  setCurrentChat: (chat: ChatDTO) => void;
  currentChat?: ChatDTO;
}

const ChatsContainer: React.FC<ChatsContainerProps> = ({setCurrentChat, currentChat}) => {
  const { chats, isLoading, isError, createChat } = useChat();
  const { showToast } = useToast();

  const handleCreateChat = (author: Author) => {
    const chatData: ChatData = { name: author.username }
    createChat({ chatData, authorId: author.id });
  };

  useEffect(() => {
    if (isError) {
      showToast("Error creating chat", ToastType.ALERT);
    }
  }, [isError]);

  return (
    <StyledChatContainer>
      <StyledContainer height={'fit-content'} fontWeight={"bold"} fontFamily={"Manrope"} fontSize={'20px'} marginBottom={'5px'}>
        Messages
      </StyledContainer>
      <SearchBarProvider onResultClick={handleCreateChat}>
        <SearchBar />
        <Chats isLoading={isLoading} chats={chats} onChatClick={setCurrentChat} selectedChat={currentChat}/>

      </SearchBarProvider>

    </StyledChatContainer>
  )
}

export default ChatsContainer