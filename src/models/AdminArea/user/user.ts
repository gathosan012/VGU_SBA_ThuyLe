import type { Role } from "../role/role";
import type { Status } from "../status/status";
export interface Staff {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  status: Status;
  updatedUser: UserLogin;
  updatedDate: Date;
  createdUser: UserLogin;
  createdDate: Date;
}

export interface UserLogin {
  id: number;
  username: string;
  role: number;
  password: string;
  // refreshToken: string;
}

export interface User {
  id: number | null;
  fullname: string | null;
  username: string | null;
  email: string | null;
  role: Role | null;
  status: Status | null;
}
[];
