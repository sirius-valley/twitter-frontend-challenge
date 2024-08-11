import { useMutation } from "@tanstack/react-query";
import { createReaction_param_endpoint, deleteReaction_param_endpoint } from "../../endpoints";
import { ReactionData, ReactionDTO } from "../../service";
import { deleteData, postData } from "../../service/HttpRequestService"
import { queryClient } from "../../components/layout/Layout";



type usePostReactionProps = {
  postId: string,
  data: ReactionData
}
export const usePostReaction = () =>{
  return useMutation<ReactionDTO,Error,usePostReactionProps>({
    mutationKey: ["useDeletePostById"],
    mutationFn: ({postId,data}: usePostReactionProps): Promise<ReactionDTO> => postData<ReactionData, ReactionDTO>(createReaction_param_endpoint(postId), data),
    onSuccess:()=>{
      queryClient.invalidateQueries({ queryKey: ['getAllPosts'] })
      queryClient.invalidateQueries({ queryKey: ['getPostById'] })
      queryClient.invalidateQueries({ queryKey: ['getPostByUser'] })
      queryClient.invalidateQueries({ queryKey: ['getMyComments'] })
      queryClient.invalidateQueries({ queryKey: ['getCommentsById'] })
      queryClient.invalidateQueries({ queryKey: ['getCommentsByUser'] })
      queryClient.invalidateQueries({ queryKey: ['getCommentsByPostId'] })
    },
    onError: (error) => {
      console.error('Error al crear el post:', error);
    },
    
  })
}
export const useDeleteReaction = ()=>{
  return useMutation<ReactionDTO,Error,string>({
    mutationKey: ["useDeletePostById"],
    mutationFn: (reactionId: string): Promise<ReactionDTO> => deleteData(deleteReaction_param_endpoint(reactionId)),
    onSuccess:() =>{
      queryClient.invalidateQueries({ queryKey: ['getAllPosts'] })
      queryClient.invalidateQueries({ queryKey: ['getPostById'] })
      queryClient.invalidateQueries({ queryKey: ['getPostByUser'] })
      queryClient.invalidateQueries({ queryKey: ['getMyComments'] })
      queryClient.invalidateQueries({ queryKey: ['getCommentsById'] })
      queryClient.invalidateQueries({ queryKey: ['getCommentsByUser'] })
      queryClient.invalidateQueries({ queryKey: ['getCommentsByPostId'] })
    },
    onError: (error) => {
      console.error('Error al borrar un post:', error);
    },
    
  })
}