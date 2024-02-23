import type { Route } from "../route/route";

export interface Schedule {
  id: number | null;
  route: Route | null;
  departureTime: string | null;
  arrivalTime: string | null;
  date: string | null;
}
[];
