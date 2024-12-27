import React, { useEffect } from "react";
import SuggestionBox from "./components/suggestionBox/SuggestionBox";
import ContentContainer from "./components/contentContainer/ContentContainer";
import { updateFeed } from "../../redux/user";
import { useHttpRequestService } from "../../service/HttpRequestService";
import { SearchBar } from "../../components/search-bar/SearchBar";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { StyledUserSuggestionContainer } from "./UserSeuggestionContainer";
import {SearchBarProvider} from "../../components/search-bar/SearchBarContext";
import {Author} from "../../service";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const query = useAppSelector((state) => state.user.query);
  const service = useHttpRequestService();

  const handleSetUser = async () => {
    try {
      const data = await service.getPosts(query).catch((e) => {
        console.log(e);
        return [];
      });
      dispatch(updateFeed(data));
    } catch (e) {
      navigate("/sign-in");
    }
  };

  const handleNavigateToProfile = (author: Author) => {
    navigate(`/profile/${author.id}`);
  }

  useEffect(() => {
    handleSetUser().then();
  }, []);

  return (
    <>
      <ContentContainer />
      <StyledUserSuggestionContainer>
        <SearchBarProvider onResultClick={handleNavigateToProfile}>
          <SearchBar />
        </SearchBarProvider>
        <SuggestionBox />
      </StyledUserSuggestionContainer>
    </>
  );
};

export default HomePage;
