import { useQuery } from "@tanstack/react-query";
import {useHttpRequestService} from "../service/HttpRequestService";

export const useMe = () => {
  const { me: fetchMe } = useHttpRequestService();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["me"],
    queryFn: () => fetchMe(),
  });

  return {
    user: data,
    isLoading,
    isError,
    error,
  };
};
