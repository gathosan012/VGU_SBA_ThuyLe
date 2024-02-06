// import { STORAGE } from "./storage";
import type { Schedule } from "../../models/schedule";

export const initSchedule = {
  id: 0,
  route: {
    id: 0,
    routeName: "",
    stations: [
      {
        id: 0,
        station: {
          id: 0,
          stationName: "",
          address: "",
        },
        stopOrder: 0,
        arrivalTime: "",
      },
    ],
  },
  departureTime: "",
  arrivalTime: "",
  date: "",
} as Schedule;
