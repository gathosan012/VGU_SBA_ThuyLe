import type { Route } from "./route";


export interface Schedule {
    id: number | null;
    route: Route | null;
    departureTime: String;
    arrivalTime: String; 
    createdBy: String;
    createdTime: String;
    updateBy: String;
    updateTime: String;
    date: String | null;
    price: number;
}
  