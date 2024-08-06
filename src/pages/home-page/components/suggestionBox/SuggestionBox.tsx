import React, { useEffect, useState } from "react";
import FollowUserBox from "../../../../components/follow-user/FollowUserBox";
import { useHttpRequestService } from "../../../../service/oldService";
import { useTranslation } from "react-i18next";
import { UserDTO } from "../../../../service";
import { StyledSuggestionBoxContainer } from "./SuggestionBoxContainer";

const SuggestionBox = () => {
  const [users, setUsers] = useState<UserDTO[]>([]);
  const httpService = useHttpRequestService();
  const { t } = useTranslation();

  useEffect(() => {
    try {
      httpService.getRecommendedUsers(6, 0).then((res) => {
        setUsers(res);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <StyledSuggestionBoxContainer>
      <h6>{t("suggestion.who-to-follow")}</h6>
      {users.length > 0 ? (
        users
          .filter((value, index, array) => {
            return array.indexOf(value) === index;
          })
          .slice(0, 5)
          .map((user) => (
            <FollowUserBox
              key={user.id}
              id={user.id}
              name={user.name}
              username={user.username}
              profilePicture={user.image}
            />
          ))
      ) : (
        <p>{t("suggestion.no-recommendations")}</p>
      )}
      {users.length > 5 && (
        <a href="/recommendations">{t("suggestion.show-more")}</a>
      )}
    </StyledSuggestionBoxContainer>
  );
};

export default SuggestionBox;
