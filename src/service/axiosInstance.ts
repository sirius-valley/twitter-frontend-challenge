import { useNavigate } from "react-router-dom";
import axios from "axios";

const useHttp = () => {
  const navigate = useNavigate();
  const url =
    process.env.REACT_APP_API_URL || "https://twitter-ieea.onrender.com/api";

  const axiosInstance = axios.create({
    baseURL: url,
  });

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
        // window.location.href = "/sign-in";
        localStorage.removeItem("token");
        localStorage.clear()
        navigate("/sign-in");

        console.log("Unauthorized");
      }
      return error
    }
  );

  return axiosInstance;
};

export { useHttp };
