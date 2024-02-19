import type { Schedule } from "../../models/AdminArea/schedule/schedule";
import type { Route } from "../../models/AdminArea/route/route";

export const initSchedule: Schedule = {
  id: 0,
  route: {
    id: 0,
    routeName: "",
    stations: {
      id: 0,
      station: {
        id: 0,
        name: "",
        address: "",
      },
      stopOrder: 0,
      arrivalTime: "",
    },
  } as Route,
  departureTime: "",
  arrivalTime: "",
  date: "",
};
