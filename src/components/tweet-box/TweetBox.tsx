import { ChangeEvent, useState } from "react";
import Button from "../button/Button";
import TweetInput from "../tweet-input/TweetInput";
import ImageContainer from "../tweet/tweet-image/ImageContainer";
import { BackArrowIcon } from "../icon/Icon";
import ImageInput from "../common/ImageInput";
import { useTranslation } from "react-i18next";
import { ButtonType } from "../button/StyledButton";
import { StyledTweetBoxContainer } from "./TweetBoxContainer";
import { StyledContainer } from "../common/Container";
import { StyledButtonContainer } from "./ButtonContainer";
import { useDispatch, useSelector } from "react-redux";
import { PostData, UserDTO } from "../../service";
import { RootState } from "../../redux/store";
import {
  useGetPosts,
  usePostPost,
} from "../../hooks/htttpServicesHooks/post.hooks";
import { useGetMyUser } from "../../hooks/htttpServicesHooks/user.hooks";
type TweetBoxProps = {
  parentId?: string;
  close?: () => void;
  borderless?: true; //???
  mobile?: true; //???
};
const TweetBox = ({ parentId, close, borderless, mobile }: TweetBoxProps) => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);

  const { length, query } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { data: postData, isLoading } = useGetPosts();
  const { mutate, isError, isSuccess, error } = usePostPost();
  const { data: user } = useGetMyUser();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const handleSubmit = async () => {
    try {
      // setContent("");
      // setImages([]);
      // setImagesPreview([]);
      //dispatch(setLength(length + 1));
      // if(postData){

      //   //dispatch(updateFeed(postData));
      // }
      const postData: PostData = {
        content: content,
        images: images,
        parentId: undefined,
      };
      await mutate(postData);

      

      setContent("");
      setImages([]);
      setImagesPreview([]);

      close && close();
    } catch (e) {
      console.error("Error submitting:", e);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((i, idx) => idx !== index);
    const newImagesPreview = newImages.map((i) => URL.createObjectURL(i));
    setImages(newImages);
    setImagesPreview(newImagesPreview);
  };

  const handleAddImage = (newImages: File[]) => {
    setImages(newImages);
    const newImagesPreview = newImages.map((i) => URL.createObjectURL(i));
    setImagesPreview(newImagesPreview);
  };
  return (
    <StyledTweetBoxContainer>
      {mobile && (
        <StyledContainer
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <BackArrowIcon onClick={close} />
          <Button
            text={"Tweet"}
            buttonType={ButtonType.DEFAULT}
            size={"SMALL"}
            onClick={handleSubmit}
            disabled={content.length === 0 || isLoading}
          />
        </StyledContainer>
      )}
      <StyledContainer style={{ width: "100%" }}>
        <TweetInput
          onChange={handleChange}
          maxLength={240}
          placeholder={t("placeholder.tweet")}
          value={content}
          src={user?.image}
        />
        <StyledContainer padding={"0 0 0 10%"}>
          <ImageContainer
            editable
            images={imagesPreview}
            removeFunction={handleRemoveImage}
          />
        </StyledContainer>
        <StyledButtonContainer>
          <ImageInput setImages={handleAddImage} parentId={parentId} />
          {!mobile && (
            <Button
              text={"Tweet"}
              buttonType={ButtonType.DEFAULT}
              size={"SMALL"}
              onClick={handleSubmit}
              disabled={
                content.length <= 0 ||
                content.length > 240 ||
                images.length > 4 ||
                images.length < 0
              }
            />
          )}
        </StyledButtonContainer>
      </StyledContainer>
    </StyledTweetBoxContainer>
  );
};

export default TweetBox;
