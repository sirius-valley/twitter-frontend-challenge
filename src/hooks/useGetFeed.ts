import { useEffect, useState } from "react";
import { setLength, updateFeed } from "../redux/user";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useGetPosts } from "../service/query";

export const useGetFeed = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [enabled, setEnabled] = useState<boolean>(false);

  const posts = useAppSelector((state) => state.user.feed);
  const query = useAppSelector((state) => state.user.query);

  const dispatch = useAppDispatch();

  const {
    data: Posts,
    refetch: refetchPosts,
    isLoading
  } = useGetPosts(query, enabled);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setEnabled(true);
    refetchPosts();
    if (Posts && !isLoading) {
      const updatedPosts = Array.from(new Set([...posts, ...Posts]));
      dispatch(updateFeed(updatedPosts));
      dispatch(setLength(updatedPosts.length));
      setLoading(false);
    }
  }, [Posts, query]);

  return { posts, loading, error };
};
