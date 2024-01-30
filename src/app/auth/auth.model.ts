export interface User {
  _id: string;
  email: string;
  username: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface authResponse {
  _id: string;
  token: string;
}

export interface RegisterRequest extends LoginRequest {
  username: string;
}
