import type { Bus } from "../bus/bus";
import type { Driver } from "../driver/driver";
import type { Schedule } from "./schedule";

export interface ScheduleBus {
  id: number | null;
  schedule: Schedule | null;
  bus: Bus | null;
  driver: Driver | null;
  leftSeats: number | null;
}
[];
