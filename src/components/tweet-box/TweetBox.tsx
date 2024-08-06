import React, { ChangeEvent, useEffect, useState } from "react";
import Button from "../button/Button";
import TweetInput from "../tweet-input/TweetInput";
import { useHttpRequestService } from "../../service/oldService";
import { setLength, updateFeed } from "../../redux/user";
import ImageContainer from "../tweet/tweet-image/ImageContainer";
import { BackArrowIcon } from "../icon/Icon";
import ImageInput from "../common/ImageInput";
import { useTranslation } from "react-i18next";
import { ButtonType } from "../button/StyledButton";
import { StyledTweetBoxContainer } from "./TweetBoxContainer";
import { StyledContainer } from "../common/Container";
import { StyledButtonContainer } from "./ButtonContainer";
import { useDispatch, useSelector } from "react-redux";
import { UserDTO } from "../../service";
import { RootState } from "../../redux/store";
import { useGetPosts } from "../../hooks/htttpServicesHooks/post.hooks";
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
  const service = useHttpRequestService();
  const [user, setUser] = useState<UserDTO>();
  const { data: postData, isLoading} = useGetPosts();


  useEffect(() => {
    handleGetUser().then((r) => setUser(r));
  }, []);

  const handleGetUser = async () => {
    try {
      const user = await service.me();
      return user;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const handleSubmit = async () => {
    try {
      setContent("");
      setImages([]);
      setImagesPreview([]);
      dispatch(setLength(length + 1));
      if(postData){
        dispatch(updateFeed(postData));
      }
      
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
