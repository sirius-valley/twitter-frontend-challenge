import { PostData, PostDTO } from "../../service";
import { deleteData, fetchData, postData } from "../../service/oldSerivces";
import { S3Service } from "../../service/S3Service";

const getPosts_endpoint: string = "/post"

const getPostById_param_endpoint = (postId: string) => `/post/${postId}`
const deletePostById_param_endpoint = (postId: string) => `/post/${postId}`
const getPostsFromUser_param_endpoint = (userId: string) => `/post/by_user/${userId}`
//usePostPost
export const usePostPost = (data: PostData) =>{
  const callback = async () =>{
    const res = await postData<PostData, PostDTO>(getPosts_endpoint, data);

      const { upload } = S3Service;
      
      res.images?.forEach((image, index) =>{
        upload(data.images![index], image)
      })
  }
  return [callback] as const;
}

export const useGetPosts = () =>{
  return fetchData(getPosts_endpoint);
}
export const useGetPostById = (postId: string) =>{
  return fetchData(getPostById_param_endpoint(postId));
}
export const useGetPostsFromUser = (userId: string) =>{
  return fetchData(getPostsFromUser_param_endpoint(userId));
}
export const useDeletePostById = (postId: string) =>{
  return deleteData(deletePostById_param_endpoint(postId));
}
