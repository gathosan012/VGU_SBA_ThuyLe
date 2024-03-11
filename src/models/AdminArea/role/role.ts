import type { Authorities } from "../authorities/authorities";
import type { Permissions } from "../permissions/permissions";

export interface Role {
  id: number | null;
  roleName: string | null;
  permissions: Permissions | null;
  authorities: Authorities | null;
}
[];
