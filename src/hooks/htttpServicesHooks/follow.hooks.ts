import { postData } from "../../service/oldSerivces";


const followUser_param_endpoint = (userId: string)=> `/follower/follow/${userId}`
const unfollowUser_param_endpoint = (userId: string)=> `/follower/unfollow/${userId}`

export const useFollowUser = (userId:string) =>{
  return postData(followUser_param_endpoint(userId));
}

export const useUnollowUser = (userId:string) =>{
  return postData(unfollowUser_param_endpoint(userId));
}