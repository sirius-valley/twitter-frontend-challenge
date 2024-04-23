import { useEffect } from "react";
import { setLength, updateFeed } from "../redux/user";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useGetCommentsByPostId } from "../service/query";

interface UseGetCommentsProps {
  postId: string;
}

export const useGetComments = ({ postId }: UseGetCommentsProps) => {
  const posts = useAppSelector((state) => state.user.feed);

  const dispatch = useAppDispatch();

  const {
    data: CommentsByPostId,
    refetch: refetchCommentsByPostId,
    error,
    isLoading
  } = useGetCommentsByPostId(postId, true);

  useEffect(() => {
    refetchCommentsByPostId();
    if (CommentsByPostId && !isLoading) {
      const updatedPosts = Array.from(new Set([...posts, ...CommentsByPostId])).filter(
        (post) => post.parentId === postId
      );
      dispatch(updateFeed(updatedPosts));
      dispatch(setLength(updatedPosts.length));
    }
  }, [CommentsByPostId, postId]);

  return { posts, isLoading, error };
};
