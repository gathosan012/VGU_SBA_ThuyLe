import type { Route } from "./route";


export interface Schedule {
    id: number | null;
    route: Route | null;
    departureTime: String;
    arrivalTime: String; 
    date: string | null;
}
  