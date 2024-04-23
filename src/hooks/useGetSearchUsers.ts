import { useEffect, useState } from "react";
import { Author } from "../service";
import { LIMIT } from "../util/Constants";
import { useSearchUsers } from "../service/query";

interface UseGetRecommendationsProps {
  query: string;
  skip: number;
}
export const useGetSearchUsers = ({
  query,
  skip,
}: UseGetRecommendationsProps) => {
  const [users, setUsers] = useState<Author[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setUsers([]);
  }, [query]);

  const { data: recommendedUsers, error, isLoading } = useSearchUsers(query, LIMIT, skip, true);

  useEffect(() => {
    if (error) console.log(error);
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
  }, [recommendedUsers, isLoading]);

  return { users, error, hasMore, isLoading };
};
