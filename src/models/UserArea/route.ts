import { Stations } from "./stations";

export interface Route {
  id: number | null;
  routeName: string | null;
  stations: Stations | null;
}
