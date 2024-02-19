/* // import { formatDate } from "../utils/date-helper";
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
}; */

/* import axios from "axios";
import * as fetcherRouteStation from "./routeStationService";
import * as fetcherStation from "./stationService";

const apiStationUrl = "http://localhost:8080/api/stations";
const apiRouteStationUrl = "http://localhost:8080/api/routes-stations";

interface ScheduleData {
  id: number;
  stopOrder: number;
  arrivalTime?: string;
  route?: {
    routeName?: string;
    routeStations?: {
      id: number;
      stopOrder: number;
      arrivalTime: string;
    }[];
  };
  departureTime?: string;
  date?: string;
}

interface StationData {
  id: number;
  stationName: string;
}

interface RouteStation {
  id: number;
  stationId: number;
}

const calculateStartEndPoints = (
  scheduleData: ScheduleData[],
  routeStations: RouteStation[],
  stationData: StationData[]
) => {
  const sortedScheduleData = [...scheduleData].sort(
    (a, b) => a.stopOrder - b.stopOrder
  );

  const startPointIdSchedule = sortedScheduleData[0]?.id || null;
  const endPointIdSchedule =
    sortedScheduleData[sortedScheduleData.length - 1]?.id || null;

  const startPointArrivalTime = sortedScheduleData[0]?.arrivalTime || "N/A";
  const endPointArrivalTime =
    sortedScheduleData[sortedScheduleData.length - 1]?.arrivalTime || "N/A";

  const startPointId = startPointIdSchedule
    ? routeStations.find(
        (routeStation) => routeStation.id === startPointIdSchedule
      )?.stationId || null
    : "N/A";
  const endPointId = endPointIdSchedule
    ? routeStations.find(
        (routeStation) => routeStation.id === endPointIdSchedule
      )?.stationId || null
    : "N/A";

  const startPointName = startPointId
    ? stationData.find((station) => station.id === startPointId)?.stationName ||
      null
    : "N/A";
  const endPointName = endPointId
    ? stationData.find((station) => station.id === endPointId)?.stationName ||
      null
    : "N/A";

  return {
    startPointName,
    startPointArrivalTime,
    endPointName,
    endPointArrivalTime,
  };
};

export const fetchGetAllSchedules = async (
  apiScheduleUrl: string,
  token: string
) => {
  try {
    const response = await axios.get<ScheduleData[]>(apiScheduleUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const sortedScheduleData = response.data.sort(
      (a, b) => a.stopOrder - b.stopOrder
    );

    const stationData = await fetcherStation.fetchGetAllStations(
      apiStationUrl,
      token
    );

    const data = await Promise.all(
      sortedScheduleData.map(async (element) => {
        const routeStations =
          await fetcherRouteStation.fetchGetAllRouteStations(
            apiRouteStationUrl,
            token
          );

        const {
          startPointName,
          startPointArrivalTime,
          endPointName,
          endPointArrivalTime,
        } = calculateStartEndPoints(
          (element.route?.routeStations as ScheduleData[]) || [], // Fix for problem 2: Add type assertion
          routeStations,
          stationData
        );

        return {
          ...element,
          routeName: element.route?.routeName || "N/A",
          startPointName,
          startPointArrivalTime,
          endPointName,
          endPointArrivalTime,
          departureTime: element.departureTime || "N/A",
          arrivalTime: element.arrivalTime || "N/A",
          date: element.date || "N/A",
        };
      })
    );

    return data;
  } catch (err: any) {
    console.log("An error occurred when fetching schedules: " + err.message);
    return [];
  }
};

export const fetchDeleteSchedule = async (
  apiScheduleUrl: string,
  id: number,
  token: string
) => {
  try {
    const data = { scheduleID: id };
    const res = await axios.delete(apiScheduleUrl, {
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      console.log(`Schedule with ${id} deleted successfully...`);
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
  apiScheduleUrl: string,
  inputs: any,
  token: string
) => {
  try {
    const res = await axios.post(apiScheduleUrl, inputs, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 201) {
      console.log(`Schedule created successfully...`);
      return true;
    } else {
      return false;
    }
  } catch (err: any) {
    console.log("An error occurred when fetching: " + err.message);
    return false;
  }
};

export const fetchUpdateSchedule = async (
  apiScheduleUrl: string,
  inputs: any,
  token: string
) => {
  try {
    const response = await axios.put(apiScheduleUrl, inputs, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      console.log(`Schedule with ${inputs.scheduleID} updated successfully...`);
      return true;
    } else {
      return false;
    }
  } catch (err: any) {
    console.log("An error occurred when fetching: " + err.message);
    return false;
  }
}; */

import type { ScheduleBus } from "../../models/AdminArea/schedule/scheduleBus";
import * as httpRequest from "../../utils/httpRequest";
import authHeader from "../../utils/authHeader";
// import type { ScheduleAPI } from "../../models/httpResponse";
// import { toStringDate } from "../../utils/utilityFunctions";
// import type { UserLogin } from "../models/AdminArea/user/user";
// import { STORAGE } from "../utils/configs/storage";

interface ApiResponse<T> {
  data: T;
  status: number;
}

export const getScheduleBusById = async (
  id: number
): Promise<ApiResponse<ScheduleBus>> => {
  const res = await httpRequest.get(`schedules-buses/${id}`);
  return { data: res.data, status: res.status };
};

export const getAllScheduleBus = async (): Promise<
  ApiResponse<ScheduleBus>
> => {
  const res = await httpRequest.get("schedules-buses");
  return { data: res.data, status: res.status };
};

export const updateScheduleBus = async (
  scheduleBus: ScheduleBus
): Promise<ApiResponse<ScheduleBus>> => {
  const id = scheduleBus.id ?? null;
  const scheduleId = scheduleBus.schedule?.id ?? null;
  const busId = scheduleBus.bus?.id ?? null;
  const driverId = scheduleBus.driver?.id ?? null;

  const updateScheduleBus = {
    scheduleId,
    busId,
    driverId,
  };

  const res = await httpRequest.put(
    `schedules-buses/${id}`,
    updateScheduleBus,
    {
      headers: authHeader(),
    }
  );
  return { data: res.data, status: res.status };
};

export const deleteScheduleBus = async (
  id: number
): Promise<ApiResponse<ScheduleBus>> => {
  const res = await httpRequest.del(`schedules-buses/${id}`);
  return { data: res.data, status: res.status };
};

export const createScheduleBus = async (
  scheduleBus: ScheduleBus
): Promise<ApiResponse<ScheduleBus>> => {
  const formData: FormData = new FormData();

  formData.append("scheduleId", scheduleBus.schedule?.id?.toString() ?? "");
  formData.append("busId", scheduleBus.bus?.id?.toString() ?? "");
  formData.append("driverId", scheduleBus.driver?.id?.toString() ?? "");

  const res = await httpRequest.post("schedules-buses", formData, {
    headers: authHeader(),
  });

  return { data: res.data, status: res.status };
};
