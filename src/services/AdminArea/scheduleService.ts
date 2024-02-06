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
};
 */

import type { Schedule } from "../../models/schedule";
import * as httpRequest from "../../utils/httpRequest";
import authHeader from "../utils/authHeader";
import type { HttpResponse } from "../../models/httpResponse";
import { toStringDate } from "../utils/utilityFunctions";
import type { UserLogin } from "../models/user";
import { STORAGE } from "../utils/configs/storage";

export const getSchedulesById = async (id: number) => {
  const res: HttpResponse = await httpRequest.get(`schedules/${id}`);
  return res;
};
