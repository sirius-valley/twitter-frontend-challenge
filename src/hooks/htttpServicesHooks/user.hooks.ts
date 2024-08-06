import { deleteData, fetchData } from "../../service/oldSerivces"
import { OffsetPagination } from "../../util/Pagination";

const me_endpoint: string = "/user/me"
const delete_endpoint: string = "/user/"
const recommendedUsers_endpoint: string = "/user/"

const getUser_param_endpoint = (id: string) => `/user/${id}`
const searchedUsers_param_endpoint = (username: string) => `/user/by_username/${username}`

export const useGetMyUser = () =>{
  return fetchData(me_endpoint);
}
export const useGetRecommendedUsers = (limit: number, skip: number) =>{
  return fetchData<OffsetPagination>(recommendedUsers_endpoint, {limit:limit,skip:skip});
}
export const useGetSearchUsers = (username: string, limit: number, skip: number) =>{
  return fetchData<OffsetPagination>(searchedUsers_param_endpoint(username), {limit:limit,skip:skip});
}
export const useGetUser = (id: string) =>{
  return fetchData(getUser_param_endpoint(id));
}
export const useDeleteUser = ()=>{
  return deleteData(delete_endpoint);
}