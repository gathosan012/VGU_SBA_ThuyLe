import type { Stations } from "../station/stations/stations";

export interface Route {
  id: number | null;
  routeName: string | null;
  stations: Stations[] | null;
}
[];
