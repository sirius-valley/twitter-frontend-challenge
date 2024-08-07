import Feed from "./Feed";
import { useGetPostsFromUser } from "../../hooks/htttpServicesHooks/post.hooks";
import { Navigate, useParams } from "react-router-dom";

const ProfileFeed = () => {
  const id = useParams().id;
  const { data: posts, isLoading } = useGetPostsFromUser(id || '');
  if(id){
    return (
      <>
        <Feed posts={posts} loading={isLoading} />
      </>
    );
  }
  return (<Navigate to="/" replace />);
};
export default ProfileFeed;
