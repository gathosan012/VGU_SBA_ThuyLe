import type { Bus } from "../bus/bus";
import type { EndStation } from "../station/endStation";
import type { Schedule } from "../schedule/schedule";
import type { StartStation } from "../station/startStation";
import type { User } from "../user/user";
import type { TicketStatus } from "./ticketStatus";
import type { TicketType } from "./ticketType";

export interface TicketAPI {
  id: number | null;
  schedule: Schedule | null;
  startStation: StartStation | null;
  endStation: EndStation | null;
  ticketType: TicketType | null;
  ticketStatus: TicketStatus | null;
  bookingDate: string | null;
  totalPrice: number | null;
  bus: Bus | null;
  user: User | null;
}
[];
