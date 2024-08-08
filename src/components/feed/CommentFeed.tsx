import React from "react";
import Feed from "./Feed";
import { useGetCommentsByPostId } from "../../hooks/htttpServicesHooks/comment.hooks";

interface CommentFeedProps {
  postId: string;
}
const CommentFeed = ({ postId }: CommentFeedProps) => {
  const { data, isLoading } = useGetCommentsByPostId(postId);
  return (
    <>
      <Feed posts={data ? data : []} loading={isLoading} />
    </>
  );
};
export default CommentFeed;
