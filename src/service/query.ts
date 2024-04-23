import { useMutation, useQuery } from '@tanstack/react-query'
import { HttpService } from "./HttpRequestService";
import { PostData, SingInData, SingUpData } from '.';

const service = new HttpService().service;

export const useGetMe = (enabled?: boolean) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['me'],
    queryFn: async () => await service.me(),
    enabled
  })
  return { data, error, isLoading, refetch }
}

export const useGetPaginatedPosts = (limit: number, after: string, query: string, enabled?: boolean) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['getPaginatedPosts', limit, after, query],
    queryFn: async () => await service.getPaginatedPosts(limit, after, query),
    enabled
  })
  return { data, error, isLoading, refetch }
}

export const useGetPosts = (query: string, enabled?: boolean) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['getPosts', query],
    queryFn: async () => await service.getPosts(query),
    enabled
  })
  return { data, error, isLoading, refetch }
}

export const useGetRecommendedUsers = (limit: number, skip: number, enabled?: boolean) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['getRecommendedUsers', limit, skip],
    queryFn: async () => await service.getRecommendedUsers(limit, skip),
    enabled
  })
  return { data, error, isLoading, refetch }
}

export const useGetPostById = (id: string, enabled?: boolean) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['getPostById', id],
    queryFn: async () => await service.getPostById(id),
    enabled
  })
  return { data, error, isLoading, refetch }
}

export const useSearchUsers = (username: string, limit: number, skip: number, enabled?: boolean) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['searchUsers', username, limit, skip],
    queryFn: async () => await service.searchUsers(username, limit, skip),
    enabled
  })
  return { data, error, isLoading, refetch }
}

export const useGetProfile = (id: string, enabled?: boolean) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['getProfile', id],
    queryFn: async () => await service.getProfile(id),
    enabled
  })
  return { data, error, isLoading, refetch }
}

export const useGetPaginatedPostsFromProfile = (
    limit: number,
    after: string,
    id: string,
    enabled?: boolean
  ) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['getPaginatedPostsFromProfile', limit, after, id],
    queryFn: async () => await service.getPaginatedPostsFromProfile(limit, after, id),
    enabled
  })
  return { data, error, isLoading, refetch }
}

export const useGetPostsFromProfile = (id: string, enabled?: boolean) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['getPostsFromProfile', id],
    queryFn: async () => await service.getPostsFromProfile(id),
    enabled
  })
  return { data, error, isLoading, refetch }
}

export const useIsLogged = (enabled?: boolean) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['isLogged'],
    queryFn: async () => await service.isLogged(),
    enabled
  })
  return { data, error, isLoading, refetch }
}

export const useGetProfileView = (id: string, enabled?: boolean) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['getProfileView', id],
    queryFn: async () => await service.getProfileView(id),
    enabled
  })
  return { data, error, isLoading, refetch }
}

export const useGetChats = (enabled?: boolean) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['getChats'],
    queryFn: async () => await service.getChats(),
    enabled
  })
  return { data, error, isLoading, refetch }
}

export const useGetMutualFollows = (enabled?: boolean) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['getMutualFollows'],
    queryFn: async () => await service.getMutualFollows(),
    enabled
  })
  return { data, error, isLoading, refetch }
}

export const useGetChat = (id: string, enabled?: boolean) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['getChat', id],
    queryFn: async () => await service.getChat(id),
    enabled
  })
  return { data, error, isLoading, refetch }
}

export const useGetPaginatedCommentsByPostId = (
    id: string,
    limit: number,
    after: string,
    enabled?: boolean
  ) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['getPaginatedCommentsByPostId', id, limit, after],
    queryFn: async () => await service.getPaginatedCommentsByPostId(id, limit, after),
    enabled
  })
  return { data, error, isLoading, refetch }
}

export const useGetCommentsByPostId = (id: string, enabled?: boolean) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['getCommentsByPostId', id],
    queryFn: async () => await service.getCommentsByPostId(id),
    enabled
  })
  return { data, error, isLoading, refetch }
}

export const useSignUp = () => {
  const { mutate, reset, error, isPending, isSuccess } = useMutation({
    mutationFn: async (
      data: Partial<SingUpData>
    ) => {
      return await service.signUp(data)
    }
  })
  return { mutate, reset, error, isPending, isSuccess }
}

export const useSignIn = () => {
  const { mutate, reset, error, isPending, isSuccess } = useMutation({
    mutationFn: async (
      data: SingInData
    ) => {
      return await service.signIn(data)
    }
  })
  return { mutate, reset, error, isPending, isSuccess }
}

export const useCreatePost = () => {
  const { mutate, reset, error, isPending, isSuccess } = useMutation({
    mutationFn: async (
      data: PostData
    ) => {
      return await service.createPost(data)
    }
  })
  return { mutate, reset, error, isPending, isSuccess }
}

export const useCreateReaction = () => {
  const { mutate, reset, error, isPending, isSuccess } = useMutation({
    mutationFn: async ({
      postId,
      reaction
    }: {
      postId: string
      reaction: string
    }) => {
      return await service.createReaction(postId, reaction)
    }
  })
  return { mutate, reset, error, isPending, isSuccess }
}

export const useDeleteReaction = () => {
  const { mutate, reset, error, isPending, isSuccess } = useMutation({
    mutationFn: async (reactionId: string) => {
      return await service.deleteReaction(reactionId)
    }
  })
  return { mutate, reset, error, isPending, isSuccess }
}

export const useFollowUser = () => {
  const { mutate, reset, error, isPending, isSuccess } = useMutation({
    mutationFn: async (userId: string) => {
      return await service.followUser(userId)
    }
  })
  return { mutate, reset, error, isPending, isSuccess }
}

export const useUnfollowUser = () => {
  const { mutate, reset, error, isPending, isSuccess } = useMutation({
    mutationFn: async (userId: string) => {
      return await service.unfollowUser(userId)
    }
  })
  return { mutate, reset, error, isPending, isSuccess }
}

export const useDeleteProfile = () => {
  const { mutate, reset, error, isPending, isSuccess } = useMutation({
    mutationFn: async () => {
      return await service.deleteProfile()
    }
  })
  return { mutate, reset, error, isPending, isSuccess }
}

export const useCreateChat = () => {
  const { mutate, reset, error, isPending, isSuccess } = useMutation({
    mutationFn: async (id: string) => {
      return await service.createChat(id)
    }
  })
  return { mutate, reset, error, isPending, isSuccess }
}

export const useDeletePost = () => {
  const { mutate, reset, error, isPending, isSuccess } = useMutation({
    mutationFn: async (id: string) => {
      return await service.deletePost(id)
    }
  })
  return { mutate, reset, error, isPending, isSuccess }
}