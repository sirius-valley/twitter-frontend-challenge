import { useEffect, useState } from "react";
import { setLength, updateFeed } from "../redux/user";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useGetCommentsByPostId } from "../service/query";

interface UseGetCommentsProps {
  postId: string;
}

export const useGetComments = ({ postId }: UseGetCommentsProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const posts = useAppSelector((state) => state.user.feed);
  const [enabled, setEnabled] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const {
    data: CommentsByPostId,
    refetch: refetchCommentsByPostId,
    isLoading
  } = useGetCommentsByPostId(postId, enabled);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setEnabled(true);
    refetchCommentsByPostId();
    if (CommentsByPostId && !isLoading) {
      const updatedPosts = Array.from(new Set([...posts, ...CommentsByPostId])).filter(
        (post) => post.parentId === postId
      );
      dispatch(updateFeed(updatedPosts));
      dispatch(setLength(updatedPosts.length));
      setLoading(false);
    }
  }, [CommentsByPostId, postId]);

  return { posts, loading, error };
};
