import type { Ticket } from "../models/UserArea/tickets";
import authHeader from "../utils/authHeader";
import httpRequest from "../utils/httpRequest";

interface ApiResponse<T> {
  data: T;
  status: number;
}

export const getTickets = async () => {
    const res = await httpRequest.get("tickets", {
      headers: authHeader(),
    });
    return res;
};

export const postTickets = async () => {
  const res = await httpRequest.post("tickets", {
    Headers: authHeader(),
  });
  return res
}

export const searchTicketPagination = async (
  startStationId: number | null,
  endStationId: number | null,
  date: string | null ) : Promise<ApiResponse<Ticket[]>> => {
    try {
      const res = await httpRequest.get("/schedules/search", { 
        params : {
          startStationId, endStationId, date
        },
        headers: authHeader()});
        
        return res.data
      } catch (error) {
        const errorMessage = (error as Error).message
        throw new Error("Failed to fetch search" + errorMessage)
      }
  }