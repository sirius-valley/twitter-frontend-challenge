import { useQuery } from "@tanstack/react-query";
import { SingInData, SingUpData, UserDTO } from "../../service";
import { fetchData, postData } from "../../service/oldSerivces";
import { login_endpoint, signup_endpoint } from "../../endpoints";



export const useSignup = ( data: Partial<SingUpData>) =>{  

  return postData<Partial<SingUpData>, any>(signup_endpoint,data);
}
export const useLogin = ( data: SingInData) =>{
  return postData<SingInData, any>(login_endpoint,data);
}