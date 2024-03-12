import type { Station } from "./station";

export interface Stations {
    id: number;
    station: Station;
    stopOrder: number;
    arrivalTime: Time | null;
}