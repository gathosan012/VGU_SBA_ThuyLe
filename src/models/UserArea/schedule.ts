import type { Route } from "./route";
import type { Time } from "./time";


export interface Schedule {
    id: number | null;
    route: Route | null;
    departureTime: Time;
    arrivalTime: Time; 
    date: string | null;
}
  