import type { Station } from "./station";

export interface Route {
  id: number | null;
  routeName: string | null;
  stations: Station | null;
}
