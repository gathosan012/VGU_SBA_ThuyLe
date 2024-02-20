import type { Bus } from "../../models/AdminArea/bus/bus";
import type { Driver } from "../../models/AdminArea/driver/driver";
import type { Route } from "../../models/AdminArea/route/route";
import type { Schedule } from "../../models/AdminArea/schedule/schedule";
import type { ScheduleBus } from "../../models/AdminArea/schedule/scheduleBus";

export const initScheduleBus: ScheduleBus = {
  id: 0,
  schedule: {
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
  } as Schedule,
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
  } as Bus,
  driver: {
    id: 0,
    fullname: "",
    username: "",
    email: "",
    role: {
      id: 0,
      roleName: "",
      permissions: {
        id: 0,
        canCreate: true,
        canRead: true,
        canUpdate: true,
        canDelete: true,
      },
      authorities: {
        authority: "",
      },
    },
    status: {
      id: 0,
      statusName: "",
    },
  } as Driver,
  leftSeats: 0,
};
