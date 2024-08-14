import React, { useEffect, useRef } from 'react';
import Feed from "./Feed";
import { useGetPosts } from "../../hooks/htttpServicesHooks/post.hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { LIMIT } from "../../util/Constants";
import { PostDTO } from "../../service";

const ContentFeed = () => {
  const { activeFirstPage } = useSelector((state: RootState) => state.post);
  const [posts, setPosts] = React.useState<PostDTO[]>([]);
  const [hasMore, setHasMore] = React.useState(true);
  const [after, setAfter] = React.useState<string | undefined>(undefined);

  const { data, isLoading } = useGetPosts({
    limit: LIMIT,
    after,
    before: undefined
  });

  useEffect(() => {
    if (data) {
      setPosts((prevPosts) => [...prevPosts, ...data]);
      setHasMore(data.length === LIMIT); 
      setAfter(data[data.length - 1]?.id); 
    }
  }, [data]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (scrollHeight - scrollTop === clientHeight && !isLoading && hasMore) {
          fetchNextPage();
        }
      }
    };

    const container = containerRef.current;
    container?.addEventListener("scroll", handleScroll);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore, isLoading, fetchNextPage]);

  return (
    <div ref={containerRef} style={{ overflowY: 'auto', height: '100vh' }}>
      <Feed posts={activeFirstPage ? posts : []} loading={isLoading} />
    </div>
  );
};

export default ContentFeed;
