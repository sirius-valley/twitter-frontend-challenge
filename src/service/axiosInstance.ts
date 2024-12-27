import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useToast} from "../components/toast/ToastContext";
import {ToastType} from "../components/toast/Toast";

const useHttp = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

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
          navigate("/sign-in")
          showToast("Your session has expired, please sign in again", ToastType.ALERT);
        setTimeout(() => {
          console.log("Unauthorized");
        }, 5000)

      }
      return error
    }
  );

  return axiosInstance;
};

export { useHttp };
