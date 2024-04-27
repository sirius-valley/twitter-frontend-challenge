import React, { useEffect, useState } from "react";
import Button from "../button/Button";
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
    mutate: followUser
  } = useFollowUser();

  const {
    mutate: unfollowUser
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
