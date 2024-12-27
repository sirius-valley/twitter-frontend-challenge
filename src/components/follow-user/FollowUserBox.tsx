import React, {useEffect, useState} from "react";
import Button from "../button/Button";
import {useHttpRequestService} from "../../service/HttpRequestService";
import UserDataBox from "../user-data-box/UserDataBox";
import {useTranslation} from "react-i18next";
import {ButtonType} from "../button/StyledButton";
import "./FollowUserBox.css";
import {Author, User} from "../../service";
import {useMe} from "../../hooks/useMe";
import {StyledFollowUserBoxContainer} from "./FollowUserBoxContainer";

interface FollowUserBoxProps {
  profilePicture: string | null;
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
  const {t} = useTranslation();
  const service = useHttpRequestService()
  const [user, setUser] = useState<User>()
  const me = useMe()


  useEffect(() => {
    handleGetUser().then(r => {
      setUser(r)
      setIsFollowing(r?.following.some((f: Author) => f.id === id))
    })
  }, []);

  const handleGetUser = async () => {
    // return await service.me().catch(e => {
    //   console.log(e)
    //   return null
    // })
    return me.user
  }

  const [isFollowing, setIsFollowing] = useState(false);

    const handleFollow = async () => {
      try {
        if (isFollowing) {
          await service.unfollowUser(id);
        } else {
          await service.followUser(id);
        }
        setIsFollowing(!isFollowing); // Solo se ejecuta si no hay errores
      } catch (e) {
        console.log(e);
      }
    };


    return (
      <StyledFollowUserBoxContainer>
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
      </StyledFollowUserBoxContainer>
  );
};

export default FollowUserBox;
