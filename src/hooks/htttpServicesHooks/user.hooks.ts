import { useQuery } from "@tanstack/react-query";
import { delete_endpoint, getUser_param_endpoint, recommendedUsers_endpoint, searchedUsers_param_endpoint, userMe_endpoint } from "../../endpoints";
import { deleteData, fetchData } from "../../service/HttpRequestService"
import { OffsetPagination } from "../../util/Pagination";
import { AuthorDTO, UserDTO } from "../../service";
import user from "../../redux/user";


//Use Query
export const useGetMyUser = () =>{
  return useQuery({
    queryKey: [`GetMyUser`],
    queryFn: () =>fetchData(userMe_endpoint)
  })
}
export const useGetRecommendedUsers = (limit: number, skip: number) =>{
  return useQuery<UserDTO[], Error>({
    queryKey: [`GetRecommendedUsers`],
    queryFn: () =>fetchData<OffsetPagination>(recommendedUsers_endpoint, {limit:limit,skip:skip}),
    initialData: [] 
  })
}
export const useGetSearchUsers = (username: string, limit: number, skip: number) =>{
  return useQuery<AuthorDTO[], Error>({
    queryKey: [`GetSearchUsers`, username],
    queryFn: () =>fetchData<OffsetPagination>(searchedUsers_param_endpoint(username), {limit:limit,skip:skip}),
    enabled: username.trim() != ""    
  })
}
export const useGetUserById = (id: string) =>{
  return useQuery<UserDTO, Error>({
    queryKey: [`GetUserById`],
    queryFn: () =>fetchData(getUser_param_endpoint(id))
  })
}

//Use Mutators
export const useDeleteUser = ()=>{
  return deleteData(delete_endpoint);
}