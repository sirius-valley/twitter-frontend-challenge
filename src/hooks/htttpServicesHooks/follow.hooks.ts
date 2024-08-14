import { useMutation } from "@tanstack/react-query";
import { followUser_param_endpoint, unfollowUser_param_endpoint } from "../../endpoints";
import { postData } from "../../service/HttpRequestService";
import { useToast } from "../../components/toast/ToastProvider";
import { ToastType } from "../../components/toast/Toast";

//Use Mutators
export const useFollowUser = () =>{
  const{addToast} = useToast()
  return useMutation<Object,Error,string>({
    mutationKey: ["useFollowUser"],
    mutationFn: (userId:string): Promise<Object>=>postData<string,Object>(followUser_param_endpoint(userId)),
    onSuccess: () =>{
      addToast({message:"Follow created Successfully", type:ToastType.SUCCESS})
    },
    onError: (error) => {
      addToast({message:"Error creating follow", type:ToastType.ALERT})
      console.error('Follow Error:', error);
    },
  })
}

export const useUnfollowUser = () =>{
  const{addToast} = useToast()
  return useMutation<Object,Error,string>({
    mutationKey: ["useUnfollowUser"],
    mutationFn: async (userId:string): Promise<Object>=>postData<string,Object>(unfollowUser_param_endpoint(userId)),
    onSuccess: () =>{
      addToast({message:"Unfollow created Successfully", type:ToastType.SUCCESS})
    },
    onError: (error) => {
      addToast({message:"Error creating unfollow", type:ToastType.ALERT})
      console.error('Unfollow Error:', error);
    },
  })
}