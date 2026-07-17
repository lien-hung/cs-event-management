import type { User } from "./user";

export interface RegisterRequest {
  email: string;
  password: string;
  username: string;
  name: string;
  studentId: string;
  phoneNumber: string;
  avatar: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  email: string;
  roles: string[];
  token: string;
  expiresAt: Date;
}