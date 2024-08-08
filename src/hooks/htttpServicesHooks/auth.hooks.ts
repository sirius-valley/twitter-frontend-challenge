import { SingInData, SingUpData } from "../../service";
import { postData } from "../../service/HttpRequestService";
import { login_endpoint, signup_endpoint } from "../../endpoints";

//use Mutators
export const useSignup = ( data: Partial<SingUpData>) =>{  
  return postData<Partial<SingUpData>, any>(signup_endpoint,data);
}
export const useLogin = ( data: SingInData) =>{
  return postData<SingInData, any>(login_endpoint,data);
}

