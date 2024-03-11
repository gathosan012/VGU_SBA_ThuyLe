import type { Station } from "./station";

export interface StationPrice {
  id: number | null;
  startStation: Station | null;
  endStation: Station | null;
  price: number | null;
}
[];
