export interface User {
  firstname: string;
  lastname: string;
  password: string;
}

export interface UserWithToken {
  id: number;
  firstname: string;
  lastname: string;
  password: string;
  token: string;
}

export interface ReturnedUser {
  id: number;
  firstname: string;
  lastname: string;
  password: string;
}