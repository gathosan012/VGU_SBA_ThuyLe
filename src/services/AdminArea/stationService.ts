import * as httpRequest from "../../utils/httpRequest";
import type { Station } from "../../models/AdminArea/station/station";

interface ApiResponse<T> {
  data: T;
  status: number;
}

/* export const getAllStation = async (): Promise<ApiResponse<Stations[]>> => {
  try {
    // Make the API request to fetch stations
    const res = await httpRequest.get("stations");

    // Log the response for debugging
    console.log("Response from station API:", res);

    // Check if the response status is successful
    if (res.status !== 200) {
      throw new Error(`Failed to fetch stations. Status: ${res.status}`);
    }

    // Assuming the response data is an array of stations
    const stationData: Station[] = res;

    // Transform stationData into the desired format (Stations[])
    const transformedStations: Stations[] = stationData.map((station) => ({
      id: station.id,
      station: {
        id: station.id,
        stationName: station.stationName,
        address: null, // You can adjust this based on your data
      },
      stopOrder: null,
      arrivalTime: null,
    }));

    console.log("Transformed stations:", transformedStations);

    // Return the transformed data along with the response status
    return { data: transformedStations, status: res.status };
  } catch (error: any) {
    // Handle errors
    console.error("Error fetching stations:", error.message);
    throw new Error(`Failed to fetch station data: ${error.message}`);
  }
};
 */

export const getAllStation = async (): Promise<ApiResponse<Station>> => {
  const res = await httpRequest.get("stations");
  return { data: res, status: 200 };
};
