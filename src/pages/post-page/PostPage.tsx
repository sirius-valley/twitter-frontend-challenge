import React, { useCallback, useEffect, useState } from "react";
import { StyledContainer } from "../../components/common/Container";
import { StyledH5 } from "../../components/common/text";
import { StyledFeedContainer } from "../home-page/components/contentContainer/FeedContainer";
import Tweet from "../../components/tweet/Tweet";
import CommentFeed from "../../components/feed/CommentFeed";
import TweetBox from "../../components/tweet-box/TweetBox";
import Loader from "../../components/loader/Loader";
import { PostDTO } from "../../service";
import { useHttpRequestService } from "../../service/oldService";

const PostPage = () => {
  //Use State
  const [postId, SetPostId] = useState<string>(
    window.location.href.split("/")[4]
  );
  const [post, SetPost] = useState<PostDTO | null>(null);

  //Proper Hooks
  const httpService = useHttpRequestService();

  //UseCallback
  const fetchPost = useCallback(async () => {
    try {
      const postData: PostDTO = await httpService.getPostById(postId);
      if (postData != null) SetPost(postData);
      else throw new Error("Not found post");
    } catch (e) {
      console.error(e);
    }
  }, [postId]);
  //UseEffect
  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return (
    <StyledContainer borderRight={"1px solid #ebeef0"}>
      <StyledContainer
        padding={"16px"}
        borderBottom={"1px solid #ebeef0"}
        maxHeight={"53px"}
      >
        <StyledH5>Tweet</StyledH5>
      </StyledContainer>
      <StyledFeedContainer>
        {post ? (
          <>
            <Tweet post={post} />
            <StyledContainer
              borderBottom={"1px solid #ebeef0"}
              padding={"16px"}
            >
              <TweetBox parentId={postId} />
            </StyledContainer>

            <StyledContainer minHeight={"53.5vh"}>
              <CommentFeed postId={postId} />
            </StyledContainer>
          </>
        ) : (
          <StyledContainer justifyContent={"center"} alignItems={"center"}>
            <Loader />
          </StyledContainer>
        )}
      </StyledFeedContainer>
    </StyledContainer>
  );
};

export default PostPage;
