import { useEffect } from "react";
import SuggestionBox from "./components/suggestionBox/SuggestionBox";
import ContentContainer from "./components/contentContainer/ContentContainer";
import { updateFeed } from "../../redux/user";
import { SearchBar } from "../../components/search-bar/SearchBar";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { StyledUserSuggestionContainer } from "./UserSeuggestionContainer";
import { useGetPosts } from "../../hooks/htttpServicesHooks/post.hooks";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const query = useAppSelector((state) => state.user.query);

  const {isLoading,data, isError, error} = useGetPosts();
  useEffect(() => {
    if (isLoading) return;

    if (isError) {
      console.error("Error fetching posts:", error);
      navigate("/sign-in");
      return;
    }
    if (data)dispatch(updateFeed(data));
  }, [data, isLoading, isError, error, dispatch, navigate]);

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
