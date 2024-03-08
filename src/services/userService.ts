import authHeader from "../utils/authHeader";
import httpRequest from "../utils/httpRequest";

export const getUser = async () => {
    const res = await httpRequest.get("users", {
      headers: authHeader(),
    });
    return res;
  };