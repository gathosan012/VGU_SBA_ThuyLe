import authHeader from "../utils/authHeader";
import httpRequest from "../utils/httpRequest";

export const getUser = async (id: number) => { 

  try {
    const res = await httpRequest.get("users/" + id,{
      headers: authHeader()});
       
    return res.data;

  } catch (error) {
    const errorMessage = (error as Error).message
    throw new Error("Failed to fetch " + errorMessage)
  }
}