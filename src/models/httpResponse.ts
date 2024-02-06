/* export interface HttpResponse {
  resCode: number;
  payload: any;
  resMsg: any;
} */

export interface User {
  id: number | null;
  fullname: string | null;
  username: string | null;
  email: string | null;
  role: {
    id: number | null;
    roleName: string | null;
    permission: {
      id: number | null;
      canCreate: boolean | null;
      canRead: boolean | null;
      canUpdate: boolean | null;
      canDelete: boolean | null;
    }[];
    authorities: {
      authority: string | null;
    }[];
  } | null;
  status: {
    id: number | null;
    statusName: string | null;
  } | null;
}
[];

export interface Ticket {
  id: number | null;
  schedule: {
    id: number | null;
    route: {
      id: number | null;
      routeName: string | null;
      stations: {
        id: number | null;
        station: {
          id: number | null;
          stationName: string | null;
          address: string | null;
        };
        stopOrder: number | null;
        arrivalTime: string | null;
      }[];
    } | null;
    departureTime: string | null;
    arrivalTime: string | null;
    date: string | null;
  } | null;
  startStation: {
    id: number | null;
    stationName: string | null;
    address: string | null;
  } | null;
  endStation: {
    id: number | null;
    stationName: string | null;
    address: string | null;
  } | null;
  ticketType: {
    id: number | null;
    name: string | null;
    deadline: {
      id: number | null;
      time: string | null;
    } | null;
  } | null;
  ticketStatus: {
    id: number | null;
    statusName: string | null;
  } | null;
  bookingDate: string | null;
  totalPrice: number | null;
  bus: {
    id: number | null;
    busNumber: string | null;
    plateNumber: string | null;
    capacity: number | null;
    busType: {
      id: number | null;
      typeName: string | null;
    } | null;
    busStatus: {
      id: number | null;
      statusName: string | null;
    } | null;
    description: string | null;
  } | null;
  user: {
    id: number | null;
    fullname: string | null;
  } | null;
}
[];

export interface TicketType {
  id: number | null;
  name: string | null;
  deadline: {
    id: number | null;
    time: string | null;
  } | null;
}
[];

export interface Station {
  id: number | null;
  stationName: string | null;
  address: string | null;
}
[];

export interface StationPrice {
  id: number | null;
  startStation: {
    id: number | null;
    stationName: string | null;
    address: string | null;
  } | null;
  endStation: {
    id: number | null;
    stationName: string | null;
    address: string | null;
  } | null;
  price: number | null;
}
[];

export interface StaffType {
  id: {
    userId: number | null;
  } | null;
  typeName: string | null;
}
[];

export interface Schedule {
  id: number | null;
  route: {
    id: number | null;
    routeName: string | null;
    stations: {
      id: number | null;
      station: {
        id: number | null;
        stationName: string | null;
        address: string | null;
      };
      stopOrder: number | null;
      arrivalTime: string | null;
    }[];
  } | null;
  departureTime: string | null;
  arrivalTime: string | null;
  date: string | null;
}
[];

export interface ScheduleBus {
  id: number | null;
  schedule: {
    id: number | null;
    route: {
      id: number | null;
      routeName: string | null;
      stations: {
        id: number | null;
        station: {
          id: number | null;
          stationName: string | null;
          address: string | null;
        };
        stopOrder: number | null;
        arrivalTime: string | null;
      }[];
    } | null;
    departureTime: string | null;
    arrivalTime: string | null;
    date: string | null;
  } | null;
  bus: {
    id: number | null;
    busNumber: string | null;
    plateNumber: string | null;
    capacity: number | null;
    busType: {
      id: number | null;
      typeName: string | null;
    } | null;
    busStatus: {
      id: number | null;
      statusName: string | null;
    } | null;
    description: string | null;
  } | null;
  driver: {
    id: number | null;
    fullname: string | null;
    username: string | null;
    email: string | null;
    role;
  } | null;
}
[];

export interface Route {
  id: number | null;
  routeName: string | null;
  stations: {
    id: number | null;
    station: {
      id: number | null;
      stationName: string | null;
      address: string | null;
    };
    stopOrder: number | null;
    arrivalTime: string | null;
  }[];
}
[];

export interface RouteStation {
  id: number | null;
  routeId: number | null;
  stationId: number | null;
  stopOrder: number | null;
  arrivalTime: string | null;
}
[];

export interface Role {
  id: number | null;
  roleName: string | null;
  permission: {
    id: number | null;
    canCreate: boolean | null;
    canRead: boolean | null;
    canUpdate: boolean | null;
    canDelete: boolean | null;
  }[];
  authorities: {
    authority: string | null;
  }[];
}
[];

export interface DriverLicense {
  id: number | null;
  driverId: number | null;
  licenseNumber: string | null;
  expireDate: string | null;
}
[];

export interface Bus {
  id: number | null;
  busNumber: string | null;
  plateNumber: string | null;
  capacity: number | null;
  busType: {
    id: number | null;
    typeName: string | null;
  } | null;
  busStatus: {
    id: number | null;
    statusName: string | null;
  } | null;
  description: string | null;
}
[];

export interface BusLocation {
  id: number | null;
  bus: {
    id: number | null;
    busNumber: string | null;
    plateNumber: string | null;
    capacity: number | null;
    busType: {
      id: number | null;
      typeName: string | null;
    } | null;
    busStatus: {
      id: number | null;
      statusName: string | null;
    } | null;
    description: string | null;
  } | null;
  latitude: number | null;
  longitude: number | null;
  createdAt: string | null;
  updatedAt: string | null;
  speed: number | null;
}
[];

export interface BusType {
  id: number | null;
  typeName: string | null;
}
[];

export interface Resource {
  id: number | null;
  resourceName: string | null;
}
[];

export interface LoginResponse {
  token: string | null;
  role: string | null;
}
