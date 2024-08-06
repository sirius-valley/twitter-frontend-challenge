import { followUser_param_endpoint, unfollowUser_param_endpoint } from "../../endpoints";
import { postData } from "../../service/HttpRequestService";

//Use Mutators
export const useFollowUser = (userId:string) =>{
  return postData(followUser_param_endpoint(userId));
}

export const useUnollowUser = (userId:string) =>{
  return postData(unfollowUser_param_endpoint(userId));
}