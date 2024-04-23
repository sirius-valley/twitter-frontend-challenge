import React, { useEffect } from "react";
import SuggestionBox from "./components/suggestionBox/SuggestionBox";
import ContentContainer from "./components/contentContainer/ContentContainer";
import { setUser, updateFeed } from "../../redux/user";
import { SearchBar } from "../../components/search-bar/SearchBar";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { StyledUserSuggestionContainer } from "./UserSeuggestionContainer";
import { useGetMe, useGetPosts } from "../../service/query";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const query = useAppSelector((state) => state.user.query);
  
  const { data: user, error: meError, isLoading: isMeLoading } = useGetMe(true);
  const { data: posts, isLoading: isPostsLoading, error: postsError } = useGetPosts(query, true);

  useEffect(() => {
    if (!isMeLoading) {
      if (user) {
        dispatch(setUser(user));
      }
      if (meError) {
        navigate("/sign-in");
      }
    }
  }, [user, isMeLoading]);

  useEffect(() => {
    if (!isPostsLoading) {
      if (posts) {
        dispatch(updateFeed(posts));
      }
      if (postsError) {
        console.log(postsError);
      }
    }
  }, [posts, isPostsLoading]);

  return (
    <>
      <ContentContainer />
      <StyledUserSuggestionContainer>
        <SearchBar />
        <SuggestionBox />
      </StyledUserSuggestionContainer>
    </>
  );
};

export default HomePage;
