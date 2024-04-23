import React, { useEffect, useState } from "react";
import Button from "../button/Button";
import { useHttpRequestService } from "../../service/HttpRequestService";
import UserDataBox from "../user-data-box/UserDataBox";
import { useTranslation } from "react-i18next";
import { ButtonType } from "../button/StyledButton";
import { useAppSelector } from "../../redux/hooks";
import { useFollowUser, useUnfollowUser } from "../../service/query";
import "./FollowUserBox.css";

interface FollowUserBoxProps {
  profilePicture?: string;
  name?: string;
  username?: string;
  id: string;
}

const FollowUserBox = ({
  profilePicture,
  name,
  username,
  id,
}: FollowUserBoxProps) => {
  const { 
    mutate: followUser,
    isSuccess: isSuccesFollow,
    error: errorFollow,
    reset: resetFollow 
  } = useFollowUser();

  const {
    mutate: unfollowUser,
    isSuccess: isSuccessUnfollow,
    error: errorUnfollow,
    reset: resetUnfollow
  } = useUnfollowUser();

  const user = useAppSelector((state) => state.user.user);
  const { t } = useTranslation();

  const [isFollowing, setIsFollowing] = useState(
    user.following.some((f) => f.id === id)
  );

  const handleFollow = async () => {
    if (isFollowing) {
      unfollowUser(id);
    } else {
      followUser(id);
    }
    setIsFollowing(!isFollowing);
  };

  useEffect(() => {
    if (isSuccesFollow) resetFollow();
    if (errorFollow) console.log(errorFollow);
    if (isSuccessUnfollow) resetUnfollow();
    if (errorUnfollow) console.log(errorUnfollow);
    
  }, [isSuccesFollow, errorFollow, isSuccessUnfollow, errorUnfollow]);

  return (
    <div className="box-container">
      <UserDataBox
        id={id}
        name={name!}
        profilePicture={profilePicture!}
        username={username!}
      />
      <Button
        text={isFollowing ? t("buttons.unfollow") : t("buttons.follow")}
        buttonType={isFollowing ? ButtonType.DELETE : ButtonType.FOLLOW}
        size={"SMALL"}
        onClick={handleFollow}
      />
    </div>
  );
};

export default FollowUserBox;
