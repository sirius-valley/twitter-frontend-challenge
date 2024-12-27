export interface SingUpData {
  name: string;
  password: string;
  email: string;
  username: string;
}

export interface SingInData {
  username?: string;
  email?: string;
  password: string;
}

export interface PostData {
  content: string;
  parentId?: string;
  images?: File[];
}

export interface Post {
  id: string;
  content: string;
  parentId?: string;
  images?: string[];
  createdAt: Date;
  authorId: string;
  author: Author;
  reactionsQty: ReactionCounter[];
  comments: Post[];
}

export interface Reaction {
  id: string;
  type: string;
  createdAt: Date;
  userId: string;
  postId: string;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface ReactionTypeDTO {
  id: string;
  name: string;
}

export interface ReactionCounter {
  type: string;
  count: number;
}

export enum ReactionType {
  LIKE = 'like',
  RETWEET = 'retweet',
  COMMENT = 'comment'

}

export interface Author {
  id: string;
  name?: string;
  username: string;
  profilePicture: string | null;
  private: boolean;
  createdAt: Date;
}

export interface User {
  id: string;
  name?: string;
  username: string;
  profilePicture: string | null;
  private: boolean;
  createdAt: Date;
  followers: Author[];
  following: Author[];
  posts: Post[];
}

export interface CursorPagination {
  limit?: number
  before?: string
  after?: string
}

export interface ChatData {
  name: string;
}

export interface ChatDTO {
  id: string;
  name: string;
  ownerId: string;
  lastMessage?: string;
}

export interface MessageDTO {
  id: string;
  content: string;
  roomId: string;
  senderId: string;
  createdAt: Date;
}