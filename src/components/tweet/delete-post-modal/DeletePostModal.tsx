import { useState } from "react";
import { DeleteIcon } from "../../icon/Icon";
import Modal from "../../modal/Modal";
import Button from "../../button/Button";
import { useTranslation } from "react-i18next";
import { ButtonType } from "../../button/StyledButton";
import { StyledDeletePostModalContainer } from "./DeletePostModalContainer";
import { useDeletePostById } from "../../../hooks/htttpServicesHooks/post.hooks";
import { useDeleteCommentById } from "../../../hooks/htttpServicesHooks/comment.hooks";

interface DeletePostModalProps {
  show: boolean;
  onClose: () => void;
  id: string;
  parentId: string | undefined;
}

export const DeletePostModal = ({
  show,
  id,
  onClose,
  parentId,
}: DeletePostModalProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { t } = useTranslation();
  const { mutate: deletePost } = useDeletePostById();
  const { mutate: deleteComment } = useDeleteCommentById();
  const handleDelete = () => {
    try {
      if (parentId !== undefined) {
        deleteComment({ id, parentId });
      } else {
        deletePost(id);
      }
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    onClose();
  };

  return (
    <>
      {show && (
        <>
          <StyledDeletePostModalContainer onClick={() => setShowModal(true)}>
            <DeleteIcon />
            <p>{t("buttons.delete")}</p>
          </StyledDeletePostModalContainer>
          <Modal
            title={t("modal-title.delete-post") + "?"}
            text={t("modal-content.delete-post")}
            show={showModal}
            onClose={handleClose}
            acceptButton={
              <Button
                text={t("buttons.delete")}
                buttonType={ButtonType.DELETE}
                size={"MEDIUM"}
                onClick={handleDelete}
              />
            }
          />
        </>
      )}
    </>
  );
};

export default DeletePostModal;
