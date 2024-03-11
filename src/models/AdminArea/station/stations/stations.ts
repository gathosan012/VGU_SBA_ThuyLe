import type { Station } from "../station";

export interface Stations {
  id: number | null;
  station: Station | null;
  stopOrder: number | null;
  arrivalTime: string | null;
}
[];
