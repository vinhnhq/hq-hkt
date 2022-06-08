export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface IPost {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface IComment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}
