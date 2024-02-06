/* import "./datatableschedule.scss";

import { scheduleColumns } from "../../datatableScheduleSource"; */

// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
/* import { Link } from "react-router-dom"; */
import React, { useEffect, useState } from "react";
import * as fetcherSchedule from "../../../services/AdminArea/scheduleService";
// import * as fetcherRouteStation from "../../../services/AdminArea/routeStationService";
import * as fetcherStation from "../../../services/AdminArea/stationService";
import * as fetcherScheduleBus from "../../../services/AdminArea/scheduleBusService";
// import { login } from "../../utils/auth";

const DataTableSchedule = () => {
  const [data, setData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [routeStationsData, setRouteStationsData] = useState([]); // Added missing stationData state
  const [stationData, setStationData] = useState([]); // Added missing stationData state
  const [scheduleBusData, setScheduleBusData] = useState([]); // Added missing scheduleBusData state

  useEffect(() => {
    const fetchData = async (token) => {
      try {
        const apiScheduleUrl = "http://localhost:8080/api/schedules";
        const apiScheduleBusUrl = "http://localhost:8080/api/schedules-buses";

        const [schedules, scheduleBuses] = await Promise.all([
          fetcherSchedule.fetchGetAllSchedules(apiScheduleUrl, token),
          fetcherScheduleBus.fetchGetAllScheduleBuses(apiScheduleBusUrl, token),
        ]);

        const mergedData = schedules.map((schedule) => {
          const scheduleBus = scheduleBuses.find(
            (bus) => bus.id === schedule.id
          );
          return { ...schedule, ...scheduleBus };
        });

        console.log("Fetched data:", mergedData);
        setData(mergedData);
      } catch (err: any) {
        console.error("An error occurred when fetching data:", err.message);
      }
    };

    const fetchStations = async (token) => {
      try {
        const apiStationUrl = "http://localhost:8080/api/stations";
        const stations = await fetcherStation.fetchGetAllStations(
          apiStationUrl,
          token
        );
        setStationData(stations);
      } catch (err: any) {
        console.error("An error occurred when fetching stations:", err.message);
      }
    };

    const fetchRouteStations = async (token) => {
      try {
        const apiRouteStationUrl = "http://localhost:8080/api/routes-stations";
        const routeStations = await fetcherStation.fetchGetAllStations(
          apiRouteStationUrl,
          token
        );
        setRouteStationsData(routeStations);
      } catch (err: any) {
        console.error("An error occurred when fetching stations:", err.message);
      }
    };

    const checkAuthentication = async () => {
      try {
        const token = await login("admin", "password");
        setIsLoggedIn(true);
        await fetchData(token);
        await fetchStations(token);
        await fetchRouteStations(token);
      } catch (err: any) {
        console.error("Authentication failed:", err.message);
      }
    };

    checkAuthentication();
  }, []);

  useEffect(() => {
    const fetchData = async (token) => {
      try {
        const apiScheduleUrl = "http://localhost:8080/api/schedules";
        const apiScheduleBusUrl = "http://localhost:8080/api/schedules-buses";

        const [schedules, scheduleBuses] = await Promise.all([
          fetcherSchedule.fetchGetAllSchedules(apiScheduleUrl, token),
          fetcherScheduleBus.fetchGetAllScheduleBuses(apiScheduleBusUrl, token),
        ]);

        const mergedData = schedules.map((schedule) => {
          const scheduleBus = scheduleBuses.find(
            (bus) => bus.id === schedule.id
          );
          return { ...schedule, ...scheduleBus };
        });

        console.log("Fetched data:", mergedData);
        setData(mergedData);
      } catch (err: any) {
        console.error("An error occurred when fetching data:", err.message);
      }
    };

    const fetchDataIfLoggedIn = async () => {
      if (isLoggedIn) {
        try {
          const token = await login("admin", "password");
          fetchData(token);
        } catch (err: any) {
          console.error("Authentication failed:", err.message);
        }
      }
    };

    fetchDataIfLoggedIn();
  }, [isLoggedIn]);

  const dynamicColumns = [];

  // Generate dynamic columns based on the maximum number of stops in a route
  data.forEach((schedule) => {
    if (schedule.route && schedule.route.routeStations) {
      schedule.route.routeStations
        .filter((routeStation) => routeStation.stopOrder !== 0)
        .filter(
          (routeStation) =>
            routeStation.stopOrder !==
            Math.max(...schedule.route.routeStations.map((rs) => rs.stopOrder))
        )
        .forEach((routeStation) => {
          const stopOrder = routeStation.stopOrder;
          const fieldNameBusStop = `busStop${stopOrder}`;
          const fieldNameArrivalTime = `arrivalTime${stopOrder}`;

          if (
            !dynamicColumns.some((column) => column.field === fieldNameBusStop)
          ) {
            dynamicColumns.push({
              field: fieldNameBusStop,
              headerName: `Bus Stop ${stopOrder}`,
              width: 300,
              valueGetter: (params) => {
                const stopOrderSchedule = params.row.route.routeStations
                  .filter((rs) => rs.stopOrder !== 0)
                  .filter(
                    (rs) =>
                      rs.stopOrder !==
                      Math.max(
                        ...params.row.route.routeStations.map(
                          (routeStation) => routeStation.stopOrder
                        )
                      )
                  )
                  .find((rs) => rs.stopOrder === stopOrder);

                const dynamicStopOrderScheduleId = stopOrderSchedule
                  ? stopOrderSchedule.id
                  : "N/A";

                const dynamicStopOrderRouteStationsId =
                  dynamicStopOrderScheduleId
                    ? routeStationsData.find(
                        (routeStation) =>
                          routeStation.id === dynamicStopOrderScheduleId
                      )?.stationId || null
                    : "N/A";

                const dynamicStopOrderName = dynamicStopOrderRouteStationsId
                  ? stationData.find(
                      (station) =>
                        station.id === dynamicStopOrderRouteStationsId
                    )?.stationName || null
                  : "N/A";
                return dynamicStopOrderName || "N/A";
              },
            });

            dynamicColumns.push({
              field: fieldNameArrivalTime,
              headerName: `Arrival Time ${stopOrder}`,
              width: 300,
              valueGetter: (params) => routeStation.arrivalTime || "N/A", // Adjusted variable name from routeStation to routeStations
            });
          }
        });
    }
  });

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/schedule/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            {/* <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>Delete</div> */}
            <div className="deleteButton">Delete</div>
          </div>
        );
      },
    },
  ];

  // Find the index of "startPointArrivalTime" and "endPointName" in scheduleColumns
  const startPointArrivalTimeIndex = scheduleColumns.findIndex(
    (column) => column.field === "startPointArrivalTime"
  );
  const endPointNameIndex = scheduleColumns.findIndex(
    (column) => column.field === "endPointName"
  );

  // Create a new array with the modified order
  const finalColumns = [
    ...scheduleColumns.slice(0, startPointArrivalTimeIndex + 1),
    ...dynamicColumns,
    ...scheduleColumns.slice(
      startPointArrivalTimeIndex + 1,
      endPointNameIndex + 1
    ),
    ...scheduleColumns.slice(endPointNameIndex + 1),
    ...actionColumn,
  ];

  console.log("Final Columns:", finalColumns);

  return (
    <div className="datatableschedule">
      <div className="datatablescheduleTitle">
        <Link to="/schedule/new" className="link">
          Add New Schedule
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={finalColumns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        components={{ Toolbar: GridToolbar }}
        checkboxSelection
        style={{ fontSize: "20px" }}
      />
    </div>
  );
};

export default DataTableSchedule;
