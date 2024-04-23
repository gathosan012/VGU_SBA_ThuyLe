import authHeader from "../utils/authHeader";
import httpRequest from "../utils/httpRequest";

export const getSchedules = async () => { 
  try {
    const res = await httpRequest.get("schedules/" + 3, {
      headers: authHeader(),
    });
    return res;
  }
  catch (error) {
    const errorMessage = (error as Error).message
    throw new Error("Failed to fetch " + errorMessage)
  }
}
