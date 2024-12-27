import React, {useEffect, useState} from "react";
import Button from "../button/Button";
import TweetInput from "../tweet-input/TweetInput";
import {useHttpRequestService} from "../../service/HttpRequestService";
import {setLength, updateFeed} from "../../redux/user";
import ImageContainer from "../tweet/tweet-image/ImageContainer";
import {BackArrowIcon} from "../icon/Icon";
import ImageInput from "../common/ImageInput";
import {useTranslation} from "react-i18next";
import {ButtonType} from "../button/StyledButton";
import {StyledTweetBoxContainer} from "./TweetBoxContainer";
import {StyledContainer} from "../common/Container";
import {StyledButtonContainer} from "./ButtonContainer";
import {User} from "../../service";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {useMe} from "../../hooks/useMe";
import {useToast} from "../toast/ToastContext";
import {ToastType} from "../toast/Toast";

interface TweetBoxProps {
    parentId?: string;
    close?: () => void;
    mobile?: boolean;
}

const TweetBox = ({
  parentId,
  close,
  mobile
}: TweetBoxProps) => {
    const [content, setContent] = useState("");
    const [images, setImages] = useState<Blob[]>([]);
    const [imagesPreview, setImagesPreview] = useState<string[]>([]);

    const {length, query} = useAppSelector((state) => state.user);
    const httpService = useHttpRequestService();
    const dispatch = useAppDispatch();
    const {t} = useTranslation();
    const me = useMe()
    const [user, setUser] = useState<User | null>(null)

    const { showToast } = useToast();


    useEffect(() => {
        handleGetUser().then(r => setUser(r))
    }, []);

    const handleGetUser = async () => {
        // return await service.me().catch(e => {
        //     console.log(e)
        //     return null
        // })
        return me.user
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };
    const handleSubmit = async () => {
        try {
            const postData = {
                content: content,
                parentId: parentId,
                // images: images, // TODO : uncomment this line when the backend is ready
            }
            const newPost = await httpService.createPost(postData)
              .catch((e) => {
                  console.log(e);
                  console.log('showing toast')
                  showToast("Could not create post", ToastType.ALERT);
              });
            setContent("");
            setImages([]);
            setImagesPreview([]);
            dispatch(setLength(length + 1));
            const posts = await httpService.getPosts(query).catch((e) => {
                console.log(e);
                return [];
            });
            dispatch(updateFeed(posts));
            close && close();
        } catch (e) {
            console.log(e);
        }
    };

    const handleRemoveImage = (index: number) => {
        const newImages = images.filter((_, idx) => idx !== index)
        const newImagesPreview = newImages.map((i: Blob) => URL.createObjectURL(i));
        setImages(newImages);
        setImagesPreview(newImagesPreview);
    };

    const handleAddImage = (newImages: Blob[]) => {
        setImages(newImages);
        const newImagesPreview = newImages.map((i: Blob) => URL.createObjectURL(i));
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
                    <BackArrowIcon onClick={close}/>
                    <Button
                        text={"Tweet"}
                        buttonType={ButtonType.DEFAULT}
                        size={"SMALL"}
                        onClick={handleSubmit}
                        disabled={content.length === 0}
                    />
                </StyledContainer>
            )}
            <StyledContainer style={{width: "100%"}}>
                <TweetInput
                    onChange={handleChange}
                    maxLength={240}
                    placeholder={t("placeholder.tweet")}
                    value={content}
                    src={user ? user.profilePicture : null}
                />
                <StyledContainer padding={"0 0 0 10%"}>
                    <ImageContainer
                        editable
                        images={imagesPreview}
                        removeFunction={handleRemoveImage}
                    />
                </StyledContainer>
                <StyledButtonContainer>
                    <ImageInput setImages={handleAddImage} parentId={parentId}/>
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
