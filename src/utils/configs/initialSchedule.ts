import type { Schedule } from "../../models/AdminArea/schedule/schedule";
import type { Route } from "../../models/AdminArea/route/route";

export const initSchedule: Schedule = {
  id: 0,
  route: {
    id: 0,
    routeName: "",
    // Change 'stations' to an array of 'Stations'
    stations: [
      {
        id: 0,
        station: {
          id: 0,
          stationName: "", // Change 'name' to 'stationName'
          address: "",
        },
        stopOrder: 0,
        arrivalTime: "",
      },
    ],
  } as Route,
  departureTime: "",
  arrivalTime: "",
  date: "",
};
