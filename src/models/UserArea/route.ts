import type { Stations } from "./stations";

export interface Route {
  id: number | null;
  routeName: String | null;
  stations: Stations | null;
}
