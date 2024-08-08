import React, { useEffect, useState } from "react";
import Button from "../button/Button";
import { useHttpRequestService } from "../../service/oldService";
import UserDataBox from "../user-data-box/UserDataBox";
import { useTranslation } from "react-i18next";
import { ButtonType } from "../button/StyledButton";
import "./FollowUserBox.css";
import { AuthorDTO, UserDTO } from "../../service";
import { useGetMyUser } from "../../hooks/htttpServicesHooks/user.hooks";

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
  const { t } = useTranslation();
  const service = useHttpRequestService();
  const { data: user, isLoading } = useGetMyUser();

  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = async () => {
    if (isFollowing) {
      await service.unfollowUser(id);
    } else {
      await service.followUser(id);
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
        text={
          !isLoading
            ? user.following.some((f: AuthorDTO) => f.id === id)
              ? t("buttons.unfollow")
              : t("buttons.follow")
            : t("buttons.follow")
        }
        buttonType={isFollowing ? ButtonType.DELETE : ButtonType.FOLLOW}
        size={"SMALL"}
        onClick={handleFollow}
      />
    </div>
  );
};

export default FollowUserBox;
