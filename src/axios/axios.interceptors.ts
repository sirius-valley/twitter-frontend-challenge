import axios, { InternalAxiosRequestConfig } from "axios"

export const AxiosInterceptor = () =>{
  const UpdateToken = (request: InternalAxiosRequestConfig<any>)=>{
    const token = localStorage.getItem("token");
    if(token){
      request.headers.Authorization = token;
    }
    return request;
  }; 

  axios.interceptors.request.use((request)=>{
    console.log("Request");
    return UpdateToken(request);
  });

  axios.interceptors.response.use(
    (response)=>{
      console.log("Response");
      return response
    },
    (error)=>{
      if(error.response.status >= 400){
        localStorage.removeItem("token");
      }
      return Promise.reject(error);
    });
}