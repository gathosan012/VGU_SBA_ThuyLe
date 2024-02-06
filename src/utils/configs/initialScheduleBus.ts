import type { ScheduleBus } from "../../models/scheduleBus";

export const initScheduleBus: ScheduleBus = {
  id: 0,
  schedule: {
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
  },
  bus: {
    id: 0,
    busNumber: "",
    plateNumber: "",
    capacity: 0,
    busType: {
      id: 0,
      typeName: "",
    },
    busStatus: {
      id: 0,
      statusName: "",
    },
    description: "",
  },
  driver: {
    id: 0,
    fullname: "",
    username: "",
    email: "",
    role: {
      id: 0,
      roleName: "",
      permissions: [],
      authorities: [{ authority: "" }],
    },
    status: {
      id: 0,
      statusName: "",
    },
  },
  leftSeats: 0,
};
