export interface Schedule {
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
  date: string | null;
}
