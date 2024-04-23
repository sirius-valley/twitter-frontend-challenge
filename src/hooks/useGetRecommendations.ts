import { useEffect, useState } from "react";
import { Author } from "../service";
import { useGetRecommendedUsers } from "../service/query";

interface UseGetRecommendationsProps {
  page: number;
}

export const useGetRecommendations = ({ page }: UseGetRecommendationsProps) => {
  const [users, setUsers] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Nuevo estado para verificar si hay más elementos
  const [enabled, setEnabled] = useState<boolean>(false);

  const {
    data: recommendedUsers,
    refetch: refetchRecommendedUsers,
    isLoading,
  } = useGetRecommendedUsers(10, page, enabled);

  useEffect(() => {
    if (page !== undefined && hasMore) {
      setLoading(true);
      setError(false);
      setEnabled(true);
      refetchRecommendedUsers();
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
          setLoading(false);
        }
      }
    }
  }, [page, hasMore]);

  return { users, loading, error };
};
