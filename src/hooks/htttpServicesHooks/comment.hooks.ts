import { PostData, PostDTO } from "../../service";
import { deleteData, fetchData, postData } from "../../service/oldSerivces";
import { S3Service } from "../../service/S3Service";

const me_endpoint: string = "/comments/me"

const getPostById_param_endpoint = (commentId: string) => `/comment/${commentId}`
const deletePostById_param_endpoint = (commentId: string) => `/comment/${commentId}`
const getCommentsFromUser_param_endpoint = (userId: string) => `/comment/by_user/${userId}`
const getCommentsByCommentId_param_endpoint = (commentId: string) => `/comment/by_post/${commentId}`
//usePostComments
export const usePostComment = (data: PostData) =>{
  const callback = async () =>{
    const res = await postData<PostData, PostDTO>(getPosts_endpoint, data);

      const { upload } = S3Service;
      
      res.images?.forEach((image, index) =>{
        upload(data.images![index], image)
      })
  }
  return [callback] as const;
}
export const useGetMyComments = () =>{
  return fetchData(me_endpoint);
}
export const useGetCommentById = (commentId: string) =>{
  return fetchData(getPostById_param_endpoint(commentId));
}
export const useGetCommentsFromUser = (userId: string) =>{
  return fetchData(getCommentsFromUser_param_endpoint(userId));
}
export const useGetCommentsByCommentId = (commentId: string) =>{
  return fetchData(getCommentsByCommentId_param_endpoint(commentId));
}
export const useDeleteCommentById = (commentId: string) =>{
  return deleteData(deletePostById_param_endpoint(commentId));
}
