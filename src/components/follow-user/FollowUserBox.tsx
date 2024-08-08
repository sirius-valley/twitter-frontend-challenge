import { useState } from "react";
import Button from "../button/Button";
import UserDataBox from "../user-data-box/UserDataBox";
import { useTranslation } from "react-i18next";
import { ButtonType } from "../button/StyledButton";
import "./FollowUserBox.css";
import { AuthorDTO } from "../../service";
import { useGetMyUser } from "../../hooks/htttpServicesHooks/user.hooks";
import {
  useFollowUser,
  useUnfollowUser,
} from "../../hooks/htttpServicesHooks/follow.hooks";

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
  const { data: user, isLoading } = useGetMyUser();
  const { mutate: unfollowUser } = useFollowUser();
  const { mutate: followUser } = useUnfollowUser();

  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = async () => {
    if (isFollowing) {
      await unfollowUser(id);
    } else {
      await followUser(id);
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
          !isLoading && user
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
