import type { Schedule } from "./schedule";
import type { Station } from "./station";
import type { ticketStatus } from "./ticketStatus";
import type { ticketType } from "./ticketType";

export interface Ticket {
    id: number;
    schedule: Schedule;
    startStation: Station;
    endStation: Station;
    address: String;
    ticketType: ticketType;
    ticketStatus: ticketStatus;
    bookingDate: String | null;
    totalPrice: number | null;
  }
  