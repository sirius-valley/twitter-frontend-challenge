import React, {ReactNode, useRef} from "react";
import { StyledBlurredBackground } from "../common/BlurredBackground";
import { ModalCloseButton } from "../common/ModalCloseButton";
import { StyledTweetModalContainer } from "../tweet-modal/TweetModalContainer";

interface PostModalProps {
  onClose: () => void;
  show: boolean;
  children: ReactNode;
}

export const PostModal = ({ onClose, show, children }: PostModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick = (event: React.MouseEvent) => {
    console.log('click')
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  }
  return (
    <>
      {show && (
        <StyledBlurredBackground onClick={handleOutsideClick}>
          <StyledTweetModalContainer ref={modalRef}>
            <ModalCloseButton onClick={onClose} />
            {children}
          </StyledTweetModalContainer>
        </StyledBlurredBackground>
      )}
    </>
  );
};
