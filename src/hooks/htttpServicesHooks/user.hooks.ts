import { useQuery } from "@tanstack/react-query";
import { delete_endpoint, getUser_param_endpoint, recommendedUsers_endpoint, searchedUsers_param_endpoint, userMe_endpoint } from "../../endpoints";
import { deleteData, fetchData } from "../../service/HttpRequestService"
import { OffsetPagination } from "../../util/Pagination";


//Use Query
export const useGetMyUser = () =>{
  return useQuery({
    queryKey: [`getMyComments`],
    queryFn: () =>fetchData(userMe_endpoint)
  })
}
export const useGetRecommendedUsers = (limit: number, skip: number) =>{
  return useQuery({
    queryKey: [`getMyComments`],
    queryFn: () =>fetchData<OffsetPagination>(recommendedUsers_endpoint, {limit:limit,skip:skip})
  })
}
export const useGetSearchUsers = (username: string, limit: number, skip: number) =>{
  return useQuery({
    queryKey: [`getMyComments`],
    queryFn: () =>fetchData<OffsetPagination>(searchedUsers_param_endpoint(username), {limit:limit,skip:skip})
  })
}
export const useGetUser = (id: string) =>{
  return useQuery({
    queryKey: [`getMyComments`],
    queryFn: () =>fetchData(getUser_param_endpoint(id))
  })
}

//Use Mutators
export const useDeleteUser = ()=>{
  return deleteData(delete_endpoint);
}