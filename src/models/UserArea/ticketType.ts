import type { Deadline } from "./deadline";

export interface ticketType {
    id: number;
    name: String;
    deadline: Deadline | null;
}