import { SingInData, SingUpData } from "../../service";
import { postData } from "../../service/HttpRequestService";
import { login_endpoint, signup_endpoint } from "../../endpoints";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

type TokenProps= {
  token: string;
}
export const useSignup = () =>{  
  const navigate = useNavigate()

  return useMutation<TokenProps,Error,Partial<SingUpData>>({
    mutationKey: ["useSignup"],
    mutationFn: (data: Partial<SingUpData>): Promise<TokenProps> =>postData<Partial<SingUpData>, TokenProps>(signup_endpoint,data),
    onSuccess: (response) =>{
      localStorage.setItem("token", `Bearer ${response.token}`)
      navigate("/")
    },
    onError: (error) => {
      console.error('Signup error:', error);
    },
  })
}
export const useLogin = () =>{
  const navigate = useNavigate()
  return useMutation<TokenProps,Error,SingInData>({
    mutationKey: ["useLogin"],
    mutationFn: (data: SingInData): Promise<TokenProps> =>postData<SingInData, TokenProps>(login_endpoint,data),
    onSuccess: (response) =>{
      console.log("successful")
      localStorage.setItem("token", `Bearer ${response.token}`);
      navigate("/");
    },
    onError: (error) => {
      console.error('Signup error:', error);
    },
  })
}

