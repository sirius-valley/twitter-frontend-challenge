import { StyledContainer } from "../../components/common/Container";
import { StyledH5 } from "../../components/common/text";
import { StyledFeedContainer } from "../home-page/components/contentContainer/FeedContainer";
import Tweet from "../../components/tweet/Tweet";
import CommentFeed from "../../components/feed/CommentFeed";
import TweetBox from "../../components/tweet-box/TweetBox";
import Loader from "../../components/loader/Loader";
import { useGetPostById } from "../../hooks/htttpServicesHooks/post.hooks";
import { useParams } from "react-router-dom";

const PostPage = () => {
  //Use State
  const { id: postId } = useParams();
  //Proper Hooks
  const { data, isLoading } = useGetPostById(postId!);
  return (
    <>
      <StyledContainer borderRight={"1px solid #ebeef0"} flex={"2 1 0%"}>
        <StyledContainer
          padding={"16px"}
          borderBottom={"1px solid #ebeef0"}
          maxHeight={"53px"}
        >
          <StyledH5>Tweet</StyledH5>
        </StyledContainer>
        <StyledFeedContainer>
          {data && !isLoading ? (
            <>
              <Tweet postDto={data} />
              <StyledContainer
                borderBottom={"1px solid #ebeef0"}
                padding={"16px"}
              >
                <TweetBox parentId={postId} />
              </StyledContainer>
            </>
          ) : (
            <StyledContainer justifyContent={"center"} alignItems={"center"}>
              <Loader />
            </StyledContainer>
          )}
        </StyledFeedContainer>
      </StyledContainer>
      <StyledContainer height={"100%"} flex={"1 1 0%"}>
        <CommentFeed postId={postId!} />
      </StyledContainer>
    </>
  );
};

export default PostPage;
