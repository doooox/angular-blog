export interface Post {
  _id: string;
  author: author | null;
  title: string;
  content: string;
  imagePath: string;
  comments: Comment[];
}

export interface Comment {
  _id: string;
  title: string;
  text: string;
  user: {
    _id: string;
    email: string;
    username: string;
  };
  post: {
    _id: string;
    username: string;
    email: string;
  };
}

export interface PostResponse {
  posts: Post[];
  totalCount: number;
}
export interface PostRequest {
  title: string;
  content: string;
  imagePath: File | string;
}

export interface UpdateRequest {
  _id: string;
  author: author | null;
  title: string;
  content: string;
  imagePath: File | string;
}
export interface author {
  _id: string;
  username: string;
  email: string;
}
