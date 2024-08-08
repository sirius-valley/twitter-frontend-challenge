import { useMutation, useQuery } from "@tanstack/react-query";
import { deletePostById_param_endpoint, getPostById_param_endpoint, getPosts_endpoint, getPostsFromUser_param_endpoint, postPost_endpoint } from "../../endpoints";
import { PostData, PostDTO } from "../../service";
import { deleteData, fetchData, postData } from "../../service/HttpRequestService";
import { S3Service } from "../../service/S3Service";
import { queryClient } from "../../components/layout/Layout";

//Use Query
export const useGetPosts = () =>{
  return useQuery<PostDTO[]>({
    queryKey: [`getAllPosts`],
    queryFn: () =>fetchData(getPosts_endpoint),
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    staleTime: 50000
  })
}
export const useGetPostById = (postId: string) =>{
  return useQuery<PostDTO>({
    queryKey: [`getPostById`, postId],
    queryFn: () =>fetchData(getPostById_param_endpoint(postId)),
    staleTime: 50000,
    enabled: postId !== null,
    
  })
}
export const useGetPostsFromUser = (userId: string) =>{
  return useQuery<PostDTO[]>({
    queryKey: [`getPostByUser`, userId],
    queryFn: () =>fetchData(getPostsFromUser_param_endpoint(userId)),
    staleTime: 50000
  })
}
type usePostPostProps ={
  content: string;
  parentId?: string;
  images?: string[];
}
//Use Mutators
export const usePostPost = () =>{
  return useMutation<PostDTO, Error, PostData>({
    mutationKey: ["usePostPost"],
    mutationFn: (data: PostData): Promise<PostDTO> => {

      const dto: usePostPostProps = {
        content: data.content,
        images: data.images?.map(image => image.name),
        parentId: data.parentId, 
      }

      return postData<usePostPostProps, PostDTO>(postPost_endpoint, dto)
    },
    onSuccess: async (data, variables) => {
      const { upload } = S3Service;
      if(data.images && data.images.length > 0){
        for (const imageUrl of data.images) {
          const index: number = data.images.indexOf(imageUrl);
          await upload(variables.images![index], imageUrl);
        }
      }
      queryClient.invalidateQueries({ queryKey: ['getAllPosts'] })
    },
    onError: (error) => {
      console.error('Error al crear el post:', error);
    },
  });
}
export const useDeletePostById = () =>{//mutators
  return useMutation<void,Error,string>({
    mutationKey: ["useDeletePostById"],
    mutationFn: (postId: string): Promise<void> => deleteData(deletePostById_param_endpoint(postId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllPosts'] })
    },
    onError: (error) => {
      console.error('Error al crear el post:', error);
    },
    
  })
  
}