import { useQuery } from "@tanstack/react-query";
import {  deleteCommentById_param_endpoint, getCommentById_param_endpoint, getCommentsByCommentId_param_endpoint as getCommentsByPostId_param_endpoint, getCommentsFromUser_param_endpoint, commentMe_endpoint, postComment_endpoint } from "../../endpoints";
import { PostData, PostDTO } from "../../service";
import { deleteData, fetchData, postData } from "../../service/HttpRequestService";
import { S3Service } from "../../service/S3Service";

//use Query
export const useGetMyComments = () =>{
  return useQuery({
    queryKey: [`getMyComments`],
    queryFn: () =>fetchData(commentMe_endpoint)
  })
}
export const useGetCommentById = (commentId: string) =>{
  return useQuery({
    queryKey: [`getCommentsById`],
    queryFn: () =>fetchData(getCommentById_param_endpoint(commentId))
  })
}
export const useGetCommentsFromUser = (userId: string) =>{
  return useQuery({
    queryKey: [`getCommentsByUser`],
    queryFn: () =>fetchData(getCommentsFromUser_param_endpoint(userId))
  })
}
export const useGetCommentsByCommentId = (commentId: string) =>{
  return useQuery({
    queryKey: [`getCommentsByPostId`],
    queryFn: () =>fetchData(getCommentsByPostId_param_endpoint(commentId))
  })
}

//Use Mutators
export const usePostComment = (data: PostData) =>{
  const callback = async () =>{
    const res = await postData<PostData, PostDTO>(postComment_endpoint, data);

      const { upload } = S3Service;
      
      res.images?.forEach((image, index) =>{
        upload(data.images![index], image)
      })
  }
  return [callback] as const;
}
export const useDeleteCommentById = (commentId: string) =>{
  return deleteData(deleteCommentById_param_endpoint(commentId));
}
