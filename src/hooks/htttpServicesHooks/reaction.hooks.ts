import { useMutation } from "@tanstack/react-query";
import { createReaction_param_endpoint, deleteReaction_param_endpoint } from "../../endpoints";
import { ReactionData, ReactionDTO } from "../../service";
import { deleteData, postData } from "../../service/HttpRequestService"
import { queryClient } from "../../components/layout/Layout";
import { useToast } from "../../components/toast/ToastProvider";
import { ToastType } from "../../components/toast/Toast";



type usePostReactionProps = {
  postId: string,
  data: ReactionData
}
export const usePostReaction = () =>{
  const{addToast} = useToast()
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
      addToast({message:"Reaction posted successfully", type:ToastType.SUCCESS})
    },
    onError: (error) => {
      addToast({message:"Error posting reaction", type:ToastType.ALERT})
      console.error('ReactionPost Error', error);
    },
    
  })
}
export const useDeleteReaction = ()=>{
  const{addToast} = useToast()
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
      addToast({message:"Reaction deleted successfully", type:ToastType.SUCCESS})
    },
    onError: (error) => {
      addToast({message:"Error deleting reaction", type:ToastType.ALERT})
      console.error('ReactionDelete Error', error);
    },
    
  })
}