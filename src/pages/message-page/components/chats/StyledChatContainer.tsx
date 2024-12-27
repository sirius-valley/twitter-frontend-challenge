import styled from "styled-components";

export const StyledChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    align-self: flex-start;
    //width: 30%;
    flex: 1;
    height: 100%;
    padding: 8px;
    gap: 8px;
    border-right: 1px solid var(--grayscale-container-line, #f0f3f4);

`;

export const ChatList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ChatItem = styled.div<{ isSelected: boolean }>`
    padding: 0.75rem 1rem;
     background-color: ${({ isSelected }) => (isSelected ? "#d6eaf8" : "#ffffff")};
    border-radius: 8px;
    // border-right: ${({ isSelected }) => (isSelected ? "2px solid #1890ff" : "none")};
    // border-bottom-right-radius: ${({ isSelected }) => (isSelected ? "0" : "8px")};
    // border-top-right-radius: ${({ isSelected }) => (isSelected ? "0" : "8px")};op
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    cursor: pointer;
    // border: ${({ isSelected }) => (isSelected ? "2px solid #1890ff" : "none")};
    // box-shadow: ${({ isSelected }) => (isSelected ? "0 4px 8px rgba(0, 0, 0, 0.1)" : "none")};
    transition: background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        background-color: ${({ isSelected }) => (isSelected ? "#d6eaf8" : "#f0f3f4")};
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
`;

export const ChatName = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: #333333;
  margin: 0;
`;

export const ChatDate = styled.small`
  font-size: 0.9rem;
  color: #777777;
`;

export const EmptyState = styled.p`
  font-size: 1rem;
  color: #999999;
  text-align: center;
  margin-top: 1rem;
`;
