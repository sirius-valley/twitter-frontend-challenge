import styled from "styled-components";

export const StyledCurrentChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    max-width: 600px;
    margin: 0 auto;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    background-color: #f9f9f9;
    width: 70%;
`;

export const ChatHeader = styled.header`
  //background-color: #0078ff;
  //color: white;
  border-bottom: 1px solid #e0e0e0;
  padding: 1rem;
  text-align: center;
  font-size: 0.6rem;
  font-weight: bold;
  height: 60px;
`;

export const WritingIndicator = styled.div`
    font-size: 0.9rem;
    margin-top: 0.5rem;
    font-weight: lighter;
    color: #969696;
`;

export const MessagesContainer = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: #fff;
`;

export const MessageBubble = styled.div<{ sender?: boolean }>`
  align-self: ${({ sender }) => (sender ? "flex-end" : "flex-start")};
  background-color: ${({ sender, theme }) => (sender ? `${theme.colors.main}` : `${theme.colors.hover}`)};
  color: ${({ sender }) => (sender ? "white" : "black")};
  padding: 12px 16px;
  border-radius: 24px;
  max-width: 70%;
  font-size: 0.9rem;
  word-wrap: break-word;
`;

export const InputGroup = styled.div`
  display: flex;
  padding: 1rem;
  border-top: 1px solid #e0e0e0;
  background-color: white;
  align-items: center;
`;

export const MessageInput = styled.input`
  flex: 1;
  padding: 0.6rem;
  border: 1px solid #e0e0e0;
  border-radius: 24px;
  margin-right: 0.5rem;
  margin-bottom: 8px;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #0078ff;
  }
`;

export const SendButton = styled.button`
  padding: 0.8rem 1.2rem;
  background-color: #0078ff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #005fcc;
  }
`;
