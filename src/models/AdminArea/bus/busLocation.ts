import type { Bus } from "./bus";

export interface BusLocation {
  id: number | null;
  bus: Bus | null;
  latitude: number | null;
  longitude: number | null;
  createdAt: string | null;
  updatedAt: string | null;
  speed: number | null;
}
[];
