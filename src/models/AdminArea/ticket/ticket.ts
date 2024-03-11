import type { Bus } from "../bus/bus";
import type { Schedule } from "../schedule/schedule";
import type { User } from "../user/user";
import type { TicketStatus } from "./ticketStatus";
import type { TicketType } from "./ticketType";
import type { Station } from "../station/station";

export interface TicketAPI {
  id: number | null;
  schedule: Schedule | null;
  startStation: Station | null;
  endStation: Station | null;
  ticketType: TicketType | null;
  ticketStatus: TicketStatus | null;
  bookingDate: string | null;
  totalPrice: number | null;
  bus: Bus | null;
  user: User | null;
}
[];
