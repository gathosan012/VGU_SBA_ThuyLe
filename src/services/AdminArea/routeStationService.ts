// import { formatDate } from "../utils/date-helper";
import axios from "axios";

// Set up Axios withCredentials globally
// axios.defaults.withCredentials = true;

export const fetchGetAllRouteStations = async (
  apiRouteStationUrl: string,
  token: string
) => {
  try {
    const response = await axios.get(apiRouteStationUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Fetched successfully ...");

    const data = response.data.map((element: any) => ({
      ...element,
      routeId: element.routeId || "N/A",
      stationId: element.stationId || "N/A",
      stopOrder: element.stopOrder || "N/A",
      arrivalTime: element.arrivalTime || "N/A",
    }));

    return data;
  } catch (err: any) {
    console.log("An error occurred when fetching: " + err.message);
    return [];
  }
};

export const fetchDeleteRouteStations = async (
  apiRouteStationUrl: string,
  id: number,
  token: string
) => {
  try {
    const data = { routeStationsID: id };
    const response = await axios.delete(apiRouteStationUrl, {
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      console.log(`Station with ${id} deleted successfully...`);
      return true;
    } else {
      return false;
    }
  } catch (err: any) {
    console.log("An error occurred when fetching: " + err.message);
    return false;
  }
};

export const fetchCreateRouteStations = async (
  apiRouteStationUrl: string,
  inputs: any,
  token: string
) => {
  try {
    const response = await axios.post(apiRouteStationUrl, inputs, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201) {
      console.log("Route-Stations created successfully...");
      return true;
    } else {
      return false;
    }
  } catch (err: any) {
    console.log("An error occurred when fetching: " + err.message);
    return false;
  }
};

export const fetchUpdateStation = async (
  apiRouteStationUrl: string,
  inputs: any,
  token: string
) => {
  try {
    const response = await axios.put(apiRouteStationUrl, inputs, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      console.log(
        `Route-Stations with ${inputs.routeStationsID} updated successfully...`
      );
      return true;
    } else {
      return false;
    }
  } catch (err: any) {
    console.log("An error occurred when fetching: " + err.message);
    return false;
  }
};
