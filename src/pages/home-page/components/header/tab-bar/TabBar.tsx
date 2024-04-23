import React, { useEffect, useState } from "react";
import Tab from "./tab/Tab";
import { setQuery, updateFeed } from "../../../../../redux/user";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../../../redux/hooks";
import { StyledTabBarContainer } from "./TabBarContainer";
import { useGetPosts } from "../../../../../service/query";

const TabBar = () => {
  const [activeFirstPage, setActiveFirstPage] = useState(true);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [queryL, setQueryL] = useState("");

  const { data, isLoading, error, refetch } = useGetPosts(queryL, true);

  useEffect(() => {
    if (!isLoading) {
      if (error) console.log(error);
      if (data) dispatch(updateFeed(data));
    }
  }, [data, isLoading, queryL]);

  const handleClick = async (value: boolean, query: string) => {
    setActiveFirstPage(value);
    dispatch(setQuery(query));
    setQueryL(query);
    refetch();
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
