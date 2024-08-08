import { useMutation } from "@tanstack/react-query";
import { followUser_param_endpoint, unfollowUser_param_endpoint } from "../../endpoints";
import { postData } from "../../service/HttpRequestService";

//Use Mutators
export const useFollowUser = () =>{
  return useMutation<Object,Error,string>({
    mutationKey: ["useFollowUser"],
    mutationFn: (userId:string): Promise<Object>=>postData<string,Object>(followUser_param_endpoint(userId)),
    onError: (error) => {
      console.error('Error al crear un follow:', error);
    },
  })
}

export const useUnfollowUser = () =>{
  return useMutation<Object,Error,string>({
    mutationKey: ["useUnfollowUser"],
    mutationFn: async (userId:string): Promise<Object>=>postData<string,Object>(unfollowUser_param_endpoint(userId)),
    onError: (error) => {
      console.error('Error al crear un unfollow:', error);
    },
  })
}