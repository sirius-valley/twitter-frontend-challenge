import { createReaction_param_endpoint, deleteReaction_param_endpoint } from "../../endpoints";
import { ReactionData, ReactionDTO } from "../../service";
import { deleteData, postData } from "../../service/HttpRequestService"


//User Mutators
export const usePostReaction = (postId: string,data: ReactionData) =>{
  return postData<ReactionData, ReactionDTO>(createReaction_param_endpoint(postId), data);
}
export const useDeleteReaction = (reactionId: string)=>{
  return deleteData(deleteReaction_param_endpoint(reactionId));
}