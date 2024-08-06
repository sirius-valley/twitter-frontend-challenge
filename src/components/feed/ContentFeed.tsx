import Feed from "./Feed";
import { useGetPosts } from "../../hooks/htttpServicesHooks/post.hooks";

const ContentFeed = () => {
  const { data,isLoading } = useGetPosts()
  return <Feed posts={data} loading={isLoading} />;
};
export default ContentFeed;
