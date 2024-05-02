import React, {useEffect, useState} from "react";
import TabBar from "./tab-bar/TabBar";
import logo from "../../../../assets/logo.png";
import icon from "../../../../assets/icon.jpg";
import { useTranslation } from "react-i18next";
import { StyledHeaderContainer } from "./HeaderContainer";
import {User} from "../../../../service";
import {useHttpRequestService} from "../../../../service/HttpRequestService";

const Header = () => {
  const { t } = useTranslation();
  const service = useHttpRequestService()
  const [user, setUser] = useState<User>()


  useEffect(() => {
    handleGetUser().then(r => setUser(r))
  }, []);

  const handleGetUser = async () => {
    return await service.me()
  }

  return (
    <>
      <StyledHeaderContainer>
        <div className="title-container">
          <img src={user?.profilePicture ?? icon} className="icon" alt="Icon" />
          <img src={logo} className="logo" alt="Logo" />
          <h5>{t("header.home")}</h5>
        </div>
        <TabBar />
      </StyledHeaderContainer>
    </>
  );
};

export default Header;
