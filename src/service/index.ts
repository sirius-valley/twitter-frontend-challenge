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

export interface PostDTO {
  id: string;
  content: string;
  parentId?: string;
  images?: string[];
  createdAt: Date;
  authorId: string;
  author: AuthorDTO;
  reactions: ReactionDTO[];
  comments: PostDTO[];
}

export interface ReactionDTO {
  id: string;
  type: string;
  createdAt: Date;
  userId: string;
  postId: string;
  updatedAt: Date;
  deletedAt?: Date;
}
export interface AuthorDTO {
  id: string;
  name?: string;
  username: string;
  profilePicture?: string;
  private: boolean;
  createdAt: Date;
}

export interface UserDTO {
  id: string;
  name?: string;
  username: string;
  profilePicture?: string;
  private: boolean;
  createdAt: Date;
  followers: AuthorDTO[];
  following: AuthorDTO[];
  posts: PostDTO[];
}

export interface MessageDTO {
  id: string;
  content: string;
  createdAt: Date;
  chatId: string;
  senderId: string;
  sender: AuthorDTO;
}

export interface ChatDTO {
  id: string;
  users: AuthorDTO[];
  messages: MessageDTO[];
}
