export interface Post {
  _id: string;
  title: string;
  content: string;
  imagePath: string;
  author: string;
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
