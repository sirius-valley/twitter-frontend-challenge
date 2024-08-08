import React from "react";
import Feed from "./Feed";
import { useGetCommentById } from "../../hooks/htttpServicesHooks/comment.hooks";

interface CommentFeedProps {
  postId: string;
}
const CommentFeed = ({ postId }: CommentFeedProps) => {
  const { data: posts, isLoading } = useGetCommentById(postId);
  return (
    <>
      <Feed posts={posts} loading={isLoading} />
    </>
  );
};
export default CommentFeed;
