// import { formatDate } from "../utils/date-helper";
import axios from "axios";

// Set up Axios withCredentials globally
// axios.defaults.withCredentials = true;

export const fetchGetAllScheduleBuses = async (
  apiScheduleBusUrl: string,
  token: string
) => {
  try {
    const response = await axios.get(apiScheduleBusUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Fetched successfully ...");

    const data = response.data.map((element: any) => {
      console.log("Element:", element); // Log the element to inspect its structure
      console.log("leftSeats:", element.leftSeats); // Log the element to inspect its structure
      return {
        ...element,
        busNumber: element.bus?.busNumber || "N/A",
        plateNumber: element.bus?.plateNumber || "N/A",
        capacity: element.bus?.capacity || "N/A",
        busTypeName: element.bus?.busType?.typeName || "N/A",
        busStatusName: element.bus?.busStatus?.statusName || "N/A",
        description: element.bus?.description || "N/A",
        driver: element?.driver || "N/A",
        leftSeats: element?.leftSeats || "N/A",
      };
    });

    console.log("data:", data);

    return data;
  } catch (err: any) {
    console.log("An error occurred when fetching: " + err.message);
    return [];
  }
};

export const fetchDeleteSchedule = async (
  apiScheduleBusUrl: string,
  id: number,
  token: string
) => {
  try {
    const data = { busID: id };
    const res = await axios.delete(apiScheduleBusUrl, {
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      console.log(`Bus with ${id} deleted successfully...`);
      return true;
    } else {
      return false;
    }
  } catch (err: any) {
    console.log("An error occurred when fetching: " + err.message);
    return false;
  }
};

export const fetchCreateSchedule = async (
  apiScheduleBusUrl: string,
  inputs: any,
  token: string
) => {
  try {
    const res = await axios.post(apiScheduleBusUrl, inputs, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 201) {
      console.log(`Bus created successfully...`);
      return true;
    } else {
      return false;
    }
  } catch (err: any) {
    console.log("An error occurred when fetching: " + err.message);
    return false;
  }
};

export const fetchUpdateScheduleBus = async (
  apiScheduleBusUrl: string,
  inputs: any,
  token: string
) => {
  try {
    const response = await axios.put(apiScheduleBusUrl, inputs, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      console.log(`Bus with ${inputs.busID} updated successfully...`);
      return true;
    } else {
      return false;
    }
  } catch (err: any) {
    console.log("An error occurred when fetching: " + err.message);
    return false;
  }
};
