import { useMutation, useQuery } from "@tanstack/react-query";
import {  deleteCommentById_param_endpoint, getCommentById_param_endpoint, getCommentsByPostId_param_endpoint as getCommentsByPostId_param_endpoint, getCommentsFromUser_param_endpoint, commentMe_endpoint, postComment_endpoint } from "../../endpoints";
import { PostData, PostDTO } from "../../service";
import { deleteData, fetchData, postData } from "../../service/HttpRequestService";
import { S3Service } from "../../service/S3Service";
import { queryClient } from "../../components/layout/Layout";

//use Query
export const useGetMyComments = () =>{
  return useQuery<PostDTO[]>({
    queryKey: [`getMyComments`],
    queryFn: () =>fetchData(commentMe_endpoint),
    staleTime: 50000
  })
}
export const useGetCommentById = (commentId: string) =>{
  return useQuery<PostDTO>({
    queryKey: [`getCommentsById`, commentId],
    queryFn: () =>fetchData(getCommentById_param_endpoint(commentId)),
    staleTime: 50000
  })
}
export const useGetCommentsFromUser = (userId: string) =>{
  return useQuery<PostDTO[]>({
    queryKey: [`getCommentsByUser`, userId],
    queryFn: () =>fetchData(getCommentsFromUser_param_endpoint(userId)),
    staleTime: 50000
  })
}

export const useGetCommentsByPostId = (commentId: string) =>{
  return useQuery<PostDTO[]>({
    queryKey: [`getCommentsByPostId`, commentId],
    queryFn: () =>fetchData(getCommentsByPostId_param_endpoint(commentId)),
    staleTime: 50000
  })
}

type usePostCommentProps ={
  content: string;
  parentId?: string;
  images?: string[];
}
//Use Mutators
export const usePostComment = (data: PostData) =>{
  return useMutation<PostDTO, Error, PostData>({
    mutationKey: ["usePostPost"],
    mutationFn: (data: PostData): Promise<PostDTO> => {

      const dto: usePostCommentProps = {
        content: data.content,
        images: data.images?.map(image => image.name),
        parentId: data.parentId, 
      }

      return postData<usePostCommentProps, PostDTO>(postComment_endpoint, dto)
    },
    onSuccess: async (data, variables) => {
      const { upload } = S3Service;
      if(data.images && data.images.length > 0){
        for (const imageUrl of data.images) {
          const index: number = data.images.indexOf(imageUrl);
          await upload(variables.images![index], imageUrl);
        }
      }
    },
    onError: (error) => {
      console.error('Error al crear el post:', error);
    },
  });
}
export const useDeleteCommentById = () =>{
  return useMutation<void,Error,string>({
    mutationKey: ["useDeletePostById"],
    mutationFn: (commentId: string): Promise<void> => deleteData(deleteCommentById_param_endpoint(commentId)),
    onError: (error) => {
      console.error('Error al crear el post:', error);
    },
    
  })
}
