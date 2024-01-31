export interface Post {
  _id: string;
  author: string;
  title: string;
  content: string;
  imagePath: string;
  comments: string[];
}

export interface Comment {
  _id: string;
  title: string;
  test: string;
  user: {
    _id: string;
    email: string;
    username: string;
  };
  post: string;
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
  author: string | null;
  title: string;
  content: string;
  imagePath: File | string;
}
