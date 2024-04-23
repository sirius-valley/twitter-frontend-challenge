import { useEffect, useState } from "react";
import { Author } from "../service";
import { useGetRecommendedUsers } from "../service/query";

interface UseGetRecommendationsProps {
  page: number;
}

export const useGetRecommendations = ({ page }: UseGetRecommendationsProps) => {
  const [users, setUsers] = useState<Author[]>([]);
  const [hasMore, setHasMore] = useState(true); // Nuevo estado para verificar si hay más elementos
  const [enabled, setEnabled] = useState<boolean>(false);

  const {
    data: recommendedUsers,
    refetch: refetchRecommendedUsers,
    error,
    isLoading,
  } = useGetRecommendedUsers(10, page, enabled);
  
  useEffect(() => {
    if (page !== undefined && hasMore) {
      setEnabled(true);
      refetchRecommendedUsers();
    }
  }, [page, hasMore]);

  useEffect(() => {
    if (recommendedUsers && !isLoading) {
      if (recommendedUsers.length === 0) {
        setHasMore(false);
      } else {
        setUsers((prev) => {
          const uniqueIds = new Set(prev.map((user) => user.id));
          const filteredUsers = recommendedUsers.filter(
            (user: Author) => !uniqueIds.has(user.id)
          );
          return [...prev, ...filteredUsers];
        });
      }
    }
  }, [recommendedUsers]);


  return { users, isLoading, error };
};
