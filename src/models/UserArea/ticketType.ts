import type { Deadline } from "./deadline";

export interface ticketType {
    id: number;
    name: string;
    deadline: Deadline | null;
}