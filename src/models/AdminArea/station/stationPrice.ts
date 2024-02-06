import type { EndStation } from "./endStation";
import type { StartStation } from "./startStation";

export interface StationPrice {
  id: number | null;
  startStation: StartStation | null;
  endStation: EndStation | null;
  price: number | null;
}
[];
