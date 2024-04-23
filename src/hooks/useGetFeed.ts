import { useEffect } from "react";
import { setLength, updateFeed } from "../redux/user";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useGetPosts } from "../service/query";

export const useGetFeed = () => {
  const posts = useAppSelector((state) => state.user.feed);
  const query = useAppSelector((state) => state.user.query);

  const dispatch = useAppDispatch();

  const {
    data: Posts,
    refetch: refetchPosts,
    error,
    isLoading
  } = useGetPosts(query, true);

  useEffect(() => {
    refetchPosts();
    if (Posts && !isLoading) {
      const updatedPosts = Array.from(new Set([...posts, ...Posts]));
      dispatch(updateFeed(updatedPosts));
      dispatch(setLength(updatedPosts.length));
    }
  }, [Posts, query]);

  return { posts, isLoading, error };
};
