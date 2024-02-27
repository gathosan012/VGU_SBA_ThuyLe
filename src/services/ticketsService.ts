import authHeader from "../utils/authHeader";
import httpRequest from "../utils/httpRequest";

export const getTickets = async () => {
    const res = await httpRequest.get("tickets", {
      headers: authHeader(),
    });
    return res;
  };