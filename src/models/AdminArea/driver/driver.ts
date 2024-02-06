import type { Role } from "../role/role";
import type { Status } from "../status/status";

export interface Driver {
  id: number | null;
  fullname: string | null;
  username: string | null;
  email: string | null;
  role: Role | null;
  status: Status | null;
}
