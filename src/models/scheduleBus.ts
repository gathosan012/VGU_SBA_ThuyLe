export interface ScheduleBus {
  id: number | null;
  schedule: {
    id: number | null;
    route: {
      id: number | null;
      routeName: string | null;
      stations:
        | {
            id: number | null;
            station: {
              id: number | null;
              stationName: string | null;
              address: string | null;
            };
            stopOrder: number | null;
            arrivalTime: string | null;
          }[]
        | null;
    } | null;
    departureTime: string | null;
    arrivalTime: string | null;
    date: string | null; // Assuming date is represented as a string in the JSON data
  };
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
    role: {
      id: number | null;
      roleName: string | null;
      permissions:
        | {
            id: number | null;
            canCreate: boolean | null;
            canRead: boolean | null;
            canUpdate: boolean | null;
            canDelete: boolean | null;
          }[]
        | null;
      authorities: {
        authority: string | null;
      }[];
    };
    status: {
      id: number | null;
      statusName: string | null;
    };
  } | null;
  leftSeats: number | null;
}
