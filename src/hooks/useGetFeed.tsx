import { useInfiniteQuery } from "@tanstack/react-query";
import { useHttpRequestService } from "../service/HttpRequestService";
import { useAppSelector } from "../redux/hooks";
import { CursorPagination, Post } from "../service";

export const useGetFeed = (initialOptions?: CursorPagination) => {
  const query = useAppSelector((state) => state.user.query);
  const service = useHttpRequestService();
  console.log(query);

  const fetchPosts = async ({ queryKey, pageParam }: { queryKey: string[]; pageParam: CursorPagination }) => {
    console.log('Fetching posts with params:', pageParam);
    const posts = await service.getPaginatedPosts(query, pageParam);
    console.log('Fetched posts:', posts);

    const nextCursor = posts.length > 0 ? posts[posts.length - 1].id : undefined;
    return { data: posts, nextCursor };
  };

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["feed", query],
    queryFn: fetchPosts,
    initialPageParam: { limit: initialOptions?.limit, after: undefined },
    getNextPageParam: (lastPage) => {
      if (lastPage?.data.length === 0) {
        return undefined;
      }
      return lastPage?.nextCursor
        ? { limit: initialOptions?.limit, after: lastPage.nextCursor } as CursorPagination
        : undefined;
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const posts: Post[] = data?.pages.flatMap((page) => page.data) ?? [];

  return { posts, isLoading, isError, fetchNextPage, hasNextPage, error };
};