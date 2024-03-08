import authHeader from "../utils/authHeader";
import httpRequest from "../utils/httpRequest";

export const getSchedules = async () => {
    const res = await httpRequest.get("schedules", {
      headers: authHeader(),
    });
    return res;
  };