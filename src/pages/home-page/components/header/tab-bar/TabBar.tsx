import React, { useState } from "react";
import Tab from "./tab/Tab";
import { setQuery, updateFeed } from "../../../../../redux/user";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../../../redux/hooks";
import { StyledTabBarContainer } from "./TabBarContainer";
import { useGetPosts } from "../../../../../hooks/htttpServicesHooks/post.hooks";

const TabBar = () => {
  const [activeFirstPage, setActiveFirstPage] = useState(true);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const {data, isLoading} = useGetPosts();

  const handleClick = async (value: boolean, query: string) => {
    setActiveFirstPage(value);
    dispatch(setQuery(query));
    dispatch(updateFeed(data));
  };

  return (
    <>
      <StyledTabBarContainer>
        <Tab
          active={activeFirstPage && !isLoading}
          text={t("header.for-you")}
          onClick={() => handleClick(true, "")}
        />
        <Tab
          active={!activeFirstPage && !isLoading}
          text={t("header.following")}
          onClick={() => handleClick(false, "following")}
        />
      </StyledTabBarContainer>
    </>
  );
};

export default TabBar;
