import { useEffect } from "react";
import Feed from "./Feed";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useInView } from "react-intersection-observer";
import Loader from "../loader/Loader";
import { useGetPosts } from "../../hooks/htttpServicesHooks/post.hooks";

const ContentFeed = () => {
  const { activeFirstPage } = useSelector((state: RootState) => state.post);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetPosts();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);
  return (
    <>
      {activeFirstPage ? (
        <div style={{ overflowY: "scroll" }}>
          {data?.pages.map((d, index) => {
            return (
              <Feed
                key={index}
                posts={activeFirstPage ? d : []}
                loading={isLoading}
              />
            );
          })}
          <div ref={ref}>{isFetchingNextPage ? <Loader /> : <></>}</div>
        </div>
      ) : (
        <div>nothing</div>
      )}
    </>
  );
};

export default ContentFeed;
