import type {Post, PostData, SingInData, SingUpData} from "./index";
import axios from "axios";
import { S3Service } from "./S3Service";
import {useHttp} from "./axiosInstance";



const useHttpRequestService = () => {
  const axiosInstance = useHttp()

  return {
    signUp: async (data: Partial<SingUpData>) => {
      const userExists = await axiosInstance.post(`/auth/login`, {
        username: data.username,
        password: data.password,
      })
        .then(r => r.status === 200)
      if (userExists) {
        throw new Error("User already exists")
      }
      const res = await axiosInstance.post(`/auth/signup`, data);
      if (res.status === 201) {
        localStorage.setItem("token", `Bearer ${res.data.token}`);
        return true;
      }
      throw new Error("Error creating user")
    },
    signIn: async (data: SingInData) => {
      const res = await axiosInstance.post(`/auth/login`, data);
      if (res.status === 200) {
        localStorage.setItem("token", `Bearer ${res.data.token}`);
        return true;
      }
      throw new Error("Error signing in")
    },
    createPost: async (data: PostData) => {
      const res = await axiosInstance.post(`/post`, data);
      if (res.status === 201) {
        const {upload} = S3Service;
        for (const imageUrl of res.data.images) {
          const index: number = res.data.images.indexOf(imageUrl);
          await upload(data.images![index], imageUrl);
        }
        return res.data;
      }
    },
    getPaginatedPosts: async (limit: number, after: string, query: string) => {
      const res = await axiosInstance.get(`/post/${query}`, {
        params: {
          limit,
          after,
        },
      });
      if (res.status === 200) {
        return res.data;
      }
    },
    getPosts: async (query: string): Promise<Post[]> => {
      const res = await axiosInstance.get(`/post/${query}`);
      if (res.status === 200) {
        return res.data as Post[];
      }
      throw new Error("Error fetching posts. Error code: " + res.status);
    },
    getRecommendedUsers: async (limit: number, skip: number) => {
      const res = await axiosInstance.get(`/user`, {
        params: {
          limit,
          skip,
        },
      });
      if (res.status === 200) {
        return res.data;
      }
    },
    me: async () => {
      const res = await axiosInstance.get(`/user/me`);
      if (res.status === 200) {
        return res.data;
      }
    },
    getPostById: async (id: string) => {
      const res = await axiosInstance.get(`/post/${id}`);
      if (res.status === 200) {
        return res.data;
      }
    },
    createReaction: async (postId: string, reaction: string) => {
      const res = await axiosInstance.post(
        `/reaction/${postId}`,
        {reactionType: reaction}
      );
      if (res.status === 201) {
        return res.data;
      }
    },
    deleteReaction: async (reactionId: string) => {
      const res = await axiosInstance.delete(`/reaction/${reactionId}`);
      if (res.status === 200) {
        return res.data;
      }
    },
    hasReacted: async (postId: string, reaction: string) => {
      const res = await axiosInstance.get(`/reaction/${postId}/${reaction}`);
      return res.status === 200;
    },
    getUserReactionsByPost: async (postId: string) => {
      const res = await axiosInstance.get(`/reaction/by_post/${postId}`);
      if (res.status === 200) {
        return res.data;
      }
    },
    followUser: async (userId: string) => {
      const res = await axiosInstance.post(
        `/follower/${userId}`,
        {}
      );
      if (res.status === 201) {
        return res.data;
      }
    },
    unfollowUser: async (userId: string) => {
      const res = await axiosInstance.delete(`/follower/${userId}`);
      if (res.status === 200) {
        return res.data;
      }
    },
    searchUsers: async (username: string, limit: number, skip: number) => {
      try {
        const cancelToken = axios.CancelToken.source();

        const response = await axiosInstance.get(`/user/by_username/${username}`, {
          params: {
            limit,
            skip,
          },
          cancelToken: cancelToken.token,
        });

        if (response.status === 200) {
          return response.data;
        }
      } catch (error) {
        if (!axios.isCancel(error)) console.log(error);
      }
    },

    getProfile: async (id: string) => {
      const res = await axiosInstance.get(`/user/${id}`);
      if (res.status === 200) {
        return res.data;
      }
    },
    getPaginatedPostsFromProfile: async (
      limit: number,
      after: string,
      id: string
    ) => {
      const res = await axiosInstance.get(`/post/by_user/${id}`, {
        params: {
          limit,
          after,
        },
      });

      if (res.status === 200) {
        return res.data;
      }
    },
    getPostsFromProfile: async (id: string) => {
      const res = await axiosInstance.get(`/post/by_user/${id}`);

      if (res.status === 200) {
        return res.data;
      }
    },

    isLogged: async () => {
      const res = await axiosInstance.get(`/user/me`);
      return res.status === 200;
    },

    getProfileView: async (id: string) => {
      const res = await axiosInstance.get(`/user/${id}`);

      if (res.status === 200) {
        return res.data;
      }
    },

    deleteProfile: async () => {
      const res = await axiosInstance.delete(`/user/me`);

      if (res.status === 204) {
        localStorage.removeItem("token");
      }
    },

    getChats: async () => {
      const res = await axiosInstance.get(`/chat`);

      if (res.status === 200) {
        return res.data;
      }
    },

    getMutualFollows: async () => {
      const res = await axiosInstance.get(`/follow/mutual`);

      if (res.status === 200) {
        return res.data;
      }
    },

    createChat: async (id: string) => {
      const res = await axiosInstance.post(
        `/chat`,
        {
          users: [id],
        },
      );

      if (res.status === 201) {
        return res.data;
      }
    },

    getChat: async (id: string) => {
      const res = await axiosInstance.get(`/chat/${id}`);

      if (res.status === 200) {
        return res.data;
      }
    },

    deletePost: async (id: string) => {
      await axiosInstance.delete(`/post/${id}`);
    },

    getPaginatedCommentsByPostId: async (
      id: string,
      limit: number,
      after: string
    ) => {
      const res = await axiosInstance.get(`/post/comment/by_post/${id}`, {
        params: {
          limit,
          after,
        },
      });
      if (res.status === 200) {
        return res.data;
      }
    },
    getCommentsByPostId: async (id: string) => {
      const res = await axiosInstance.get(`/comment/${id}`);
      if (res.status === 200) {
        return res.data;
      }
    },
  }
};


export { useHttpRequestService };
