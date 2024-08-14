import React, { useEffect, useState } from "react";
import { BackArrowIcon } from "../../components/icon/Icon";
import Button from "../../components/button/Button";
import AuthorData from "../../components/tweet/user-post-data/AuthorData";
import ImageContainer from "../../components/tweet/tweet-image/ImageContainer";
import { useLocation } from "react-router-dom";
import TweetInput from "../../components/tweet-input/TweetInput";
import ImageInput from "../../components/common/ImageInput";
import { setLength, updateFeed } from "../../redux/user";
import { useTranslation } from "react-i18next";
import { ButtonType } from "../../components/button/StyledButton";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { StyledContainer } from "../../components/common/Container";
import { StyledLine } from "../../components/common/Line";
import { StyledP } from "../../components/common/text";
import {
  useGetCommentById,
  useGetCommentsByPostId,
} from "../../hooks/htttpServicesHooks/comment.hooks";
import { useGetMyUser } from "../../hooks/htttpServicesHooks/user.hooks";

const CommentPage = () => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const commentId = window.location.href.split("/")[4];
  const { data: comment, isLoading: loadingComment } =
    useGetCommentById(commentId);
  const { data: user } = useGetMyUser();
  const { t } = useTranslation();
  const exit = () => {
    window.history.back();
  };

  const handleSubmit = async () => {
    setContent("");
    setImages([]);

    exit();
  };
  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((i, idx) => idx !== index);
    setImages(newImages);
  };
  useEffect(() => {
    window.innerWidth > 600 && exit();
  }, []);

  return (
    <StyledContainer padding={"16px"}>
      <StyledContainer
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <BackArrowIcon onClick={exit} />
        <Button
          text={"Tweet"}
          buttonType={ButtonType.DEFAULT}
          size={"SMALL"}
          onClick={handleSubmit}
          disabled={content.length === 0 || loadingComment}
        />
      </StyledContainer>
      {comment && !loadingComment && (
        <StyledContainer gap={"16px"}>
          <AuthorData
            id={comment.authorId}
            name={comment.author?.name ?? "Name"}
            username={comment.author?.username}
            createdAt={comment.createdAt}
            profilePicture={comment.author?.image}
          />
          <StyledContainer flexDirection={"row"}>
            <StyledLine />
            <StyledContainer gap={"8px"}>
              <StyledP primary>{comment.content}</StyledP>
              {comment.images && <ImageContainer images={comment.images} />}
            </StyledContainer>
          </StyledContainer>
          <StyledContainer gap={"4px"}>
            <TweetInput
              maxLength={240}
              placeholder={t("placeholder.comment")}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              src={user?.image}
            />
            {images.length > 0 && (
              <ImageContainer
                editable
                images={images.map((i) => URL.createObjectURL(i))}
                removeFunction={handleRemoveImage}
              />
            )}
            <StyledContainer padding={"0 0 0 10%"}>
              <ImageInput
                setImages={setImages}
                parentId={`comment-page-${commentId}`}
              />
            </StyledContainer>
          </StyledContainer>
        </StyledContainer>
      )}
    </StyledContainer>
  );
};
export default CommentPage;
