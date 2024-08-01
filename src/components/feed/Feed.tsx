import React from "react";
import { PostDTO } from "../../service";
import { StyledContainer } from "../common/Container";
import Tweet from "../tweet/Tweet";
import Loader from "../loader/Loader";

interface FeedProps {
  posts: PostDTO[];
  loading: boolean;
}

const Feed = ({ posts, loading }: FeedProps) => {
  return (
    <StyledContainer width={"100%"} alignItems={"center"}>
      {posts
        .filter((post, index, self) => {
          return self.findIndex((p) => p.id === post.id) === index;
        })
        .map((post: PostDTO) => (
          <Tweet key={post.id} post={post} />
        ))}
      {loading && <Loader />}
    </StyledContainer>
  );
};

export default Feed;
