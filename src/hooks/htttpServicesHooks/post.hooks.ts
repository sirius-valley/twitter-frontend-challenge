import { useQuery } from "@tanstack/react-query";
import { deletePostById_param_endpoint, getPostById_param_endpoint, getPosts_endpoint, getPostsFromUser_param_endpoint, postPost_endpoint } from "../../endpoints";
import { PostData, PostDTO } from "../../service";
import { deleteData, fetchData, postData } from "../../service/HttpRequestService";
import { S3Service } from "../../service/S3Service";

//Use Query
export const useGetPosts = () =>{
  return useQuery({
    queryKey: [`getAllPosts`],
    queryFn: () =>fetchData(getPosts_endpoint)
  })
}
export const useGetPostById = (postId: string) =>{
  return useQuery({
    queryKey: [`getPostById`],
    queryFn: () =>fetchData(getPostById_param_endpoint(postId))
  })
}
export const useGetPostsFromUser = (userId: string) =>{
  return useQuery({
    queryKey: [`getPostByUser`],
    queryFn: () =>fetchData(getPostsFromUser_param_endpoint(userId))
  })
}

//Use Mutators
export const usePostPost = (data: PostData) =>{
  const callback = async () =>{
    const res = await postData<PostData, PostDTO>(postPost_endpoint, data);

      const { upload } = S3Service;
      
      res.images?.forEach((image, index) =>{
        upload(data.images![index], image)
      })
  }
  return [callback] as const;
}
export const useDeletePostById = (postId: string) =>{//mutators
  return deleteData(deletePostById_param_endpoint(postId));
  
}
