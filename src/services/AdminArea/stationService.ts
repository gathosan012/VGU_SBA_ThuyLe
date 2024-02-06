// import { formatDate } from "../utils/date-helper";
import axios from "axios";

// Set up Axios withCredentials globally
// axios.defaults.withCredentials = true;

export const fetchGetAllStations = async (
  apiStationUrl: string,
  token: string
) => {
  try {
    const response = await axios.get(apiStationUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Fetched successfully ...");

    const data = response.data.map((element: any) => ({
      ...element,
      stationName: element.stationName || "N/A",
      address: element.address || "N/A",
    }));

    return data;
  } catch (err: any) {
    console.log("An error occurred when fetching: " + err.message);
    return [];
  }
};

export const fetchDeleteStation = async (
  apiStationUrl: string,
  id: number,
  token: string
) => {
  try {
    const data = { stationID: id };
    const response = await axios.delete(apiStationUrl, {
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

export const fetchCreateStation = async (
  apiStationUrl: string,
  inputs: any,
  token: string
) => {
  try {
    const response = await axios.post(apiStationUrl, inputs, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201) {
      console.log("Station created successfully...");
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
  apiStationUrl: string,
  inputs: any,
  token: string
) => {
  try {
    const response = await axios.put(apiStationUrl, inputs, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      console.log(`Station with ${inputs.stationID} updated successfully...`);
      return true;
    } else {
      return false;
    }
  } catch (err: any) {
    console.log("An error occurred when fetching: " + err.message);
    return false;
  }
};
