import { useState } from "react";
import Tab from "./tab/Tab";
import { useTranslation } from "react-i18next";
import { StyledTabBarContainer } from "./TabBarContainer";
import { useGetPosts } from "../../../../../hooks/htttpServicesHooks/post.hooks";
import { useDispatch } from "react-redux";
import { updatePage } from "../../../../../redux/post";

const TabBar = () => {
  //How should i use this, this is the header where you can select within recommend and follow post
  //These are diferent use of hooks for the contentFeed
  const [activeFirstPage, setActiveFirstPage] = useState(true);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleClick = async (value: boolean, query: string) => {
    setActiveFirstPage(value);
    dispatch(updatePage(value))
  };

  return (
    <>
      <StyledTabBarContainer>
        <Tab
          active={activeFirstPage}
          text={t("header.for-you")}
          onClick={() => handleClick(true, "")}
        />
        <Tab
          active={!activeFirstPage}
          text={t("header.following")}
          onClick={() => handleClick(false, "following")}
        />
      </StyledTabBarContainer>
    </>
  );
};

export default TabBar;
