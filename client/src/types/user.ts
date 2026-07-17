export interface UserRequest {
  studentId: string;
  name: string;
  phoneNumber: string;
  avatar: string;
}

export interface User {
  id: number;
  username: string;
  studentId: string;
  name: string;
  email: string;
  phoneNumber: string;
  avatar: string;
  role: string;
}