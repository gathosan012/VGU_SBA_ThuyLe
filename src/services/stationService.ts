import authHeader from "../utils/authHeader";
import httpRequest from "../utils/httpRequest";

export const getStation = async () => {
    const res = await httpRequest.get("stations", {
      headers: authHeader(),
    });
    return res;
  };