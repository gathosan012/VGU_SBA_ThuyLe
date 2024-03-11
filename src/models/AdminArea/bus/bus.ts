import type { BusStatus } from "./busStatus";
import type { BusType } from "./busType";

export interface Bus {
  id: number | null;
  busNumber: string | null;
  plateNumber: string | null;
  capacity: number | null;
  busType: BusType | null;
  busStatus: BusStatus | null;
  description: string | null;
}
[];
