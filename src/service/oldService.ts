import type { PostData, SingInData, SingUpData } from "./index";
import axios from "axios";
import { S3Service } from "./S3Service";

const url =
  process.env.REACT_APP_API_URL || "https://twitter-ieea.onrender.com/api";

const httpRequestService = {

  //Auth
  signUp: async (data: Partial<SingUpData>) => {
    const res = await axios.post(`${url}/auth/signup`, data);
    if (res.status === 201) {
      localStorage.setItem("token", `Bearer ${res.data.token}`);
      return true;
    }
  },
  signIn: async (data: SingInData) => {
    const res = await axios.post(`${url}/auth/login`, data);
    if (res.status === 200) {
      localStorage.setItem("token", `Bearer ${res.data.token}`);
      return true;
    }
  },//Post
  createPost: async (data: PostData) => { //NO SE USA
    const res = await axios.post(`${url}/post`, data);
    if (res.status === 201) {
      const { upload } = S3Service;
      for (const imageUrl of res.data.images) {
        const index: number = res.data.images.indexOf(imageUrl);
        await upload(data.images![index], imageUrl);
      }
      return res.data;
    }
  },
  getPaginatedPosts: async (limit: number, after: string, query: string) => { //NO SE USA
    const res = await axios.get(`${url}/post/${query}`, {
      params: {
        limit,
        after,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  },
  // getPosts: async (query: string) => {
  //   const res = await axios.get(`${url}/post/${query}`, {
  //   });
  //   if (res.status === 200) {
  //     return res.data;
  //   }
  // },
  // getPostById: async (id: string) => {
  //   const res = await axios.get(`${url}/post/${id}`, {
  //   });
  //   if (res.status === 200) {
  //     return res.data;
  //   }
  // },
  // getPostsFromProfile: async (id: string) => {
  //   const res = await axios.get(`${url}/post/by_user/${id}`, {
  //   });

  //   if (res.status === 200) {
  //     return res.data;
  //   }
  // },
  // getPaginatedPostsFromProfile: async ( //NO SE USA
  //   limit: number,
  //   after: string,
  //   id: string
  // ) => {
  //   const res = await axios.get(`${url}/post/by_user/${id}`, {
  //     params: {
  //       limit,
  //       after,
  //     },
  //   });

  //   if (res.status === 200) {
  //     return res.data;
  //   }
  // },
  deletePost: async (id: string) => {
    await axios.delete(`${url}/post/${id}`, {
    });
  },//User
  // getRecommendedUsers: async (limit: number, skip: number) => {
  //   const res = await axios.get(`${url}/user`, {
  //     params: {
  //       limit,
  //       skip,
  //     },
  //   });
  //   if (res.status === 200) {
  //     return res.data;
  //   }
  // },
  // me: async () => {
  //   const res = await axios.get(`${url}/user/me`, {
  //   });
  //   if (res.status === 200) {
  //     return res.data;
  //   }
  // },
  // searchUsers: async (username: string, limit: number, skip: number) => {
  //   try {
  //     const cancelToken = axios.CancelToken.source();

  //     const response = await axios.get(`${url}/user/by_username/${username}`, {
  //       params: {
  //         limit,
  //         skip,
  //       },
  //       cancelToken: cancelToken.token,
  //     });

  //     if (response.status === 200) {
  //       return response.data;
  //     }
  //   } catch (error) {
  //     if (!axios.isCancel(error)) console.log(error);
  //   }
  // },
  getProfile: async (id: string) => {
    const res = await axios.get(`${url}/user/profile/${id}`, {
    });
    if (res.status === 200) {
      return res.data;
    }
  },
  getProfileView: async (id: string) => {
    const res = await axios.get(`${url}/user/${id}`, {
    });

    if (res.status === 200) {
      return res.data;
    }
  },
  deleteProfile: async () => {
    const res = await axios.delete(`${url}/user/me`, {
    });

    if (res.status === 204) {
      localStorage.removeItem("token");
    }
  },//Reaction
  createReaction: async (postId: string, reaction: string) => {
    const res = await axios.post(
      `${url}/reaction/${postId}`,
      { type: reaction });

    if (res.status === 201) {
      return res.data;
    }
  },
  deleteReaction: async (reactionId: string) => {
    const res = await axios.delete(`${url}/reaction/${reactionId}`, {
    });

    if (res.status === 200) {
      return res.data;
    }
  },//Follow
  followUser: async (userId: string) => {
    const res = await axios.post(
      `${url}/follow/${userId}`);
    if (res.status === 201) {
      return res.data;
    }
  },
  unfollowUser: async (userId: string) => {
    const res = await axios.post(`${url}/unfollow/${userId}`);
    if (res.status === 200) {
      return res.data;
    }
  },
  getChats: async () => { //NO SE YSA
    const res = await axios.get(`${url}/chat`, {
    });

    if (res.status === 200) {
      return res.data;
    }
  },
  getMutualFollows: async () => { //NO SE USA
    const res = await axios.get(`${url}/follow/mutual`, {
    });

    if (res.status === 200) {
      return res.data;
    }
  },//Socket
  createChat: async (id: string) => { //NO SE USA
    const res = await axios.post(
      `${url}/chat`,
      {
        users: [id],
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    if (res.status === 201) {
      return res.data;
    }
  },
  getChat: async (id: string) => { //NO SE USA
    const res = await axios.get(`${url}/chat/${id}`, {
    });

    if (res.status === 200) {
      return res.data;
    }
  },//Comment
  getPaginatedCommentsByPostId: async ( //NO SE USA
    id: string,
    limit: number,
    after: string
  ) => {
    const res = await axios.get(`${url}/post/comment/by_post/${id}`, {
      params: {
        limit,
        after,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  },
  getCommentsByPostId: async (id: string) => { //NO SE USA
    const res = await axios.get(`${url}/post/comment/by_post/${id}`, {
    });
    if (res.status === 200) {
      return res.data;
    }
  },
};

const useHttpRequestService = () => httpRequestService;

// For class component (remove when unused)
class HttpService {
  service = httpRequestService;
}

export { useHttpRequestService, HttpService };
