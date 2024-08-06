import { ReactionData } from "../../service";
import { deleteData, postData } from "../../service/oldSerivces"

const createReaction_param_endpoint = (postId: string)=> `/reaction/${postId}`
const deleteReaction_param_endpoint = (reactionId: string)=> `/reaction/${reactionId}`


export const usePostReaction = (postId: string,data: ReactionData) =>{
  return postData<ReactionData>(createReaction_param_endpoint(postId), data);
}
export const useDeleteReaction = (reactionId: string)=>{
  return deleteData(deleteReaction_param_endpoint(reactionId));
}