import { useNavigate } from "react-router-dom";
import axios from "axios";

const useHttp = () => {
  const navigate = useNavigate();

  const axiosInstance = axios.create();

  axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        console.log("Unauthorized");
        navigate("/sign-in");
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export { useHttp };
