/* // import "./schedule.scss";
// import { useTheme } from '@mui/material';
// import {Box, ThemeProvider} from '@mui/material';
import { Link } from "react-router-dom";
import DataTableSchedule from "../../components/AdminArea/datatable/DatatableSchedule";
// import Sidebar from '../../../components/Sidebar/Sidebar';
import { motion } from "framer-motion";

const SchedulePage: FC = function () {
  // //   const theme = useTheme();
  // const [open, setOpen] = useState(false);

  // const toggle = () => {
  //   setOpen(!open);
  // };

  const [search, setSearch] = useState<string>("");

  // modal
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [type, setType] = useState<string>(TYPE.ADD);
  const [record, setRecord] = useState<Record>(initRecord);
  const [isCompleted, setIsCompleted] = useState<boolean>(false); // track on create success
  // end of modal

  const [searchResult, setSearchResult] = useState<Record[]>([]);

  // pagination
  const LIMIT = 10;
  const [start, setStart] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const onPageChange = (page: number) => {
    setPage(page);
    setStart((page - 1) * LIMIT - 1);
  };
  // end of pagination

  return (
    // <ThemeProvider theme={theme}>
    <div>
      <div className="background-container">
        <img
          src="/bg_vgu_campus.jpg"
          alt="background image"
          className="background-image"
        />
      </div>
      <div className="layout-container">
        <motion.div
          transition={{ type: "spring", stiffness: 100 }}
          animate={{ width: open ? "250px" : "50px" }}
          className="sidebar-container"
        >
          <Sidebar onToggleSidebar={toggle} />
        </motion.div>
        <div className="datatableschedule-container">
          <Link to="/schedule" style={{ textDecoration: "none" }}>
            <DataTableSchedule />
          </Link>
        </div>
      </div>
    </div>
    // </ThemeProvider>
  );
};

export default SchedulePage;
 */

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { type FC, useState, type FormEvent, useEffect } from "react";
import {
  Button,
  Pagination,
  Table,
  TextInput,
  Tooltip,
  Dropdown,
} from "flowbite-react";
import ReactDatePicker from "react-datepicker";
import {
  HiPencil,
  HiPlus,
  HiSearch,
  HiStatusOnline,
  HiReply,
} from "react-icons/hi";

import { HiPaperAirplane } from "react-icons/hi2";

import AdminLayout from "../../layouts/AdminArea/AdminLayout";
import { ScheduleModal } from "../../components/AdminArea/ScheduleModal";
import { ScheduleBusModal } from "../../components/AdminArea/ScheduleBusModal";
// import { type Record } from "../../models/record";
// import { HttpResponse } from "../../models/httpResponse";
import {
  fetchRoundPageNumber,
  getAllSchedule,
  searchSchedulePagination,
} from "../../services/AdminArea/scheduleService";

// eslint-disable-next-line no-unused-vars
import { Loading, Notify } from "notiflix";
// import { toStringDate, toStringTime } from "../../utils/utilityFunctions";

import type { Schedule } from "../../models/AdminArea/schedule/schedule";
import { initSchedule } from "../../utils/configs/initialSchedule";
import type { ScheduleBus } from "../../models/AdminArea/schedule/scheduleBus";
import { initScheduleBus } from "../../utils/configs/initialScheduleBus";

// import { resendEmail } from "../../services/mailService";

// import { NOTIFY } from "../../utils/configs/notify";

// import { RES_CODE, STATUS_CODE } from "../../utils/configs/statusCode";
import { TYPE } from "../../utils/configs/type";
import { APPLICATION_URL } from "../../utils/configs/routes/applicationUrl";
import type { Station } from "../../models/AdminArea/station/station";
import httpRequest from "../../utils/httpRequest";
import authHeader from "../../utils/authHeader";
import { HttpResponse } from "../../models/httpResponse";
import type { Stations } from "../../models/AdminArea/station/stations/stations";
import { getAllStation } from "../../services/AdminArea/stationService";
import { initStation } from "../../utils/configs/initialStation";
import { getAllScheduleBus } from "../../services/AdminArea/scheduleBusService";

const MANAGE_SchedulePage: FC = () => {
  const [date, setDate] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // modal
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [type, setType] = useState<string>(TYPE.ADD);
  const [schedule, setSchedule] = useState<Schedule>(initSchedule);
  const { data: initialStations } = initStation;
  const [stations, setStations] = useState<Station[]>(initialStations);

  const [startStation, setStartStation] = useState<string>("");
  const [startStationId, setStartStationId] = useState<number | null>(null);
  const [endStation, setEndStation] = useState<string>("");
  const [endStationId, setEndStationId] = useState<number | null>(null);
  const [departureStop, setDepartureStop] = useState("");
  const [arrivalStop, setArrivalStop] = useState("");

  const [scheduleBus, setScheduleBus] = useState<ScheduleBus>(initScheduleBus);
  const [isCompleted, setIsCompleted] = useState<boolean>(false); // track on create success
  // end of modal

  const [searchResultSchedule, setSearchResultSchedule] = useState<Schedule[]>(
    []
  );

  const [getAllScheduleBusData, setGetAllScheduleBusData] = useState<
    ScheduleBus[]
  >([]);

  const [stationNames, setStationNames] = useState<string[]>([]);
  const [stationIds, setStationIds] = useState<number[]>([]);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const year = date.getFullYear().toString();
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-indexed
      const day = date.getDate().toString().padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      setSelectedDate(formattedDate);
      console.log("Selected Date:", formattedDate);
    } else {
      setSelectedDate(null);
      console.log("No date selected");
    }
  };

  // pagination
  const LIMIT = 10;
  const [start, setStart] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const onPageChange = (page: number) => {
    setPage(page);
    setStart((page - 1) * LIMIT - 1);
  };
  // end of pagination

  const Submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // convert into filter
    if (startStationId !== null && endStationId !== null) {
      searchSchedule(startStationId, endStationId, date);
    }
  };

  useEffect(() => {
    const fetchStationNames = async () => {
      try {
        const res = await getAllStation();
        if (res.status === 200) {
          // console.log("res.data: ", res.data);
          if (Array.isArray(res.data)) {
            const stationName: string[] = res.data.flatMap(
              (station: Station) => station.stationName ?? ""
            );
            const stationId: number[] = res.data.flatMap(
              (station: Station) => station.id ?? 0
            );
            // console.log("stationName: ", stationName);
            // console.log("stationId: ", stationId);
            setStationNames(stationName);
            setStationIds(stationId);
            setStations(res.data);
          } else {
            console.error("Response data is not an array:", res.data);
          }
        } else {
          console.error("Failed to fetch station data:", res);
        }
      } catch (error) {
        console.error("An error occurred when fetching station names:", error);
      }
    };

    fetchStationNames();
  }, []);

  // Fetch all schedule data
  useEffect(() => {
    const fetchScheduleBusData = async () => {
      try {
        Loading.hourglass();
        const res = await getAllScheduleBus();

        if (res.status === 200 && Array.isArray(res.data)) {
          const scheduleBusData: ScheduleBus[] = res.data.flatMap(
            (scheduleBus: ScheduleBus) => scheduleBus
          );
          setGetAllScheduleBusData(scheduleBusData);

          // Calculate total pages based on the length of scheduleData and LIMIT
          setTotalPage(fetchRoundPageNumber(scheduleBusData.length, LIMIT));
        }

        Loading.remove();
      } catch (e) {
        // Handle error
        Loading.remove();
      }
    };

    fetchScheduleBusData();
  }, []);

  // search handler
  const searchSchedule = async (
    startStationId?: number,
    endStationId?: number,
    searchString?: string
  ) => {
    try {
      Loading.hourglass();
      const res = await searchSchedulePagination(
        startStationId ?? 0,
        endStationId ?? null,
        searchString ?? null
      );
      if (res.status === 200) {
        setSearchResultSchedule(res.data as Schedule[]);
        const totalSchedule = res.data.length;
        /* ---------------------------------------------- round page number logic --------------------------------------------- */
        // 50 / 10 = 5
        //  55 / 10 = 6
        setTotalPage(fetchRoundPageNumber(totalSchedule, LIMIT));
        Loading.remove();
      } else {
        // Handle error or show notification
        Loading.remove();
      }
    } catch (e) {
      // Notify.failure(NOTIFY.SERVER_ERROR);

      // Notify.failure(res.resMsg.message || res.resMsg);
      Loading.remove();
    }
  };

  // Search on page changed
  useEffect(() => {
    searchSchedule();
  }, [page, start]);
  // Search again after created new schedule
  useEffect(() => {
    if (!isOpen && isCompleted) {
      searchSchedule();
      setIsCompleted(false);
    }
  }, [isCompleted, isOpen]);

  /* // Resend email handler
  const handleResendEmail = async (record: Record) => {
    Loading.hourglass();
    try {
      const res = await resendEmail(record);
      if (res.resCode === RES_CODE.OK) {
        Notify.success(NOTIFY.RESEND_SUCCESS);
        Loading.remove();
      } else {
        Notify.failure(res.resMsg);
        Loading.remove();
      }
    } catch (e) {
      Notify.failure(NOTIFY.SERVER_ERROR);
      Loading.remove();
    }
  }; */

  /* // Publish button handler
  const handlePublish = async (id: number) => {
    Loading.hourglass();
    try {
      const res = await publishRecord(id);
      if (res.resCode === RES_CODE.OK) {
        Notify.success(res.resMsg || NOTIFY.PUBLISH_SUCCESS);
        Loading.remove();
        setIsCompleted(true);
      } else {
        Notify.failure(res.resMsg || res.resMsg.message);
        Loading.remove();
      }
    } catch (e) {
      Notify.failure(NOTIFY.SERVER_ERROR);
      Loading.remove();
    }
  }; */

  /* // Withdraw button handler
  const handleWithdraw = async (id: number) => {
    Loading.hourglass();
    try {
      const res = await withdrawRecord(id);
      if (res.resCode === RES_CODE.OK) {
        Notify.success(res.resMsg || NOTIFY.WITHDRAW_SUCCESS);
        Loading.remove();
        setIsCompleted(true);
      } else {
        Notify.failure(res.resMsg || res.resMsg.message);
        Loading.remove();
      }
    } catch (e) {
      Notify.failure(NOTIFY.SERVER_ERROR);
      Loading.remove();
    }
  }; */

  /* useEffect(() => {
    // Filter the stations array
    const filteredStations = stations.filter(
      (station) =>
        station.stationName !== endStation &&
        station.stationName !== startStation
    );
    console.log("Filtered Stations Array:", filteredStations);
    console.log("stationName Array:", stationNames);
    console.log("stationId Array:", stationIds);
  }, [startStation, endStation, stations, stationNames, stationIds]); */

  useEffect(() => {
    const fetchAllScheduleBuses = async () => {
      try {
        const res = await getAllScheduleBus();

        if (res.status === 200) {
          // Assuming res.data is an array of Station objects
          const scheduleBusData: ScheduleBus[] = Array.isArray(res.data)
            ? res.data
            : [res.data];

          console.log("scheduleBusData Array:", scheduleBusData);

          const busNumber = scheduleBusData.map(
            (scheduleBus: ScheduleBus) => scheduleBus.bus?.busNumber
          );

          const driverFullName = scheduleBusData.map(
            (scheduleBus: ScheduleBus) => scheduleBus.driver?.fullname ?? "N/A"
          );

          const seatCapacity = scheduleBusData.map(
            (scheduleBus: ScheduleBus) => scheduleBus.leftSeats
          );

          console.log("busNumber Array:", busNumber);
          console.log("driverFullName Array:", driverFullName);
          console.log("seatCapacity Array:", seatCapacity);
        } else {
          console.error("Failed to fetch data for scheduleBusData array:", res);
        }
      } catch (error) {
        console.error(
          "An error occurred when fetching data for filtering stations array:",
          error
        );
      }
    };

    fetchAllScheduleBuses();
  }, []);

  useEffect(() => {
    const fetchDataForFilteringStationsArray = async () => {
      try {
        const res = await getAllStation();

        if (res.status === 200) {
          // Assuming res.data is an array of Station objects
          const stationsData: Station[] = Array.isArray(res.data)
            ? res.data
            : [res.data];

          // Filter the stations array
          const filteredStations = stationsData.filter(
            (station: Station) =>
              station.stationName !== endStation &&
              station.stationName !== startStation
          );

          console.log("Filtered Stations Array:", filteredStations);

          // Extract station names and ids from the filtered stations
          const stationNames = filteredStations.map(
            (station: Station) => station.stationName
          );
          const stationIds = filteredStations.map(
            (station: Station) => station.id
          );

          console.log("stationName in Filtered Stations Array:", stationNames);
          console.log("stationId in Filtered Stations Array:", stationIds);
        } else {
          console.error(
            "Failed to fetch data for filtering stations array:",
            res
          );
        }
      } catch (error) {
        console.error(
          "An error occurred when fetching data for filtering stations array:",
          error
        );
      }
    };

    fetchDataForFilteringStationsArray();
  }, [startStation, endStation]);

  useEffect(() => {
    const fetchDataForDepartureAndArrivalStop = async () => {
      try {
        const res = await getAllScheduleBus();

        if (res.status === 200) {
          // Assuming res.data is an array of ScheduleBus objects
          const scheduleBusData = Array.isArray(res.data)
            ? res.data
            : [res.data];

          console.log("scheduleBusData:", scheduleBusData);
        }
      } catch (error) {
        console.error(
          "An error occurred when fetching data for departureStop and arrivalStop: ",
          error
        );
      }
    };

    fetchDataForDepartureAndArrivalStop();
  }, []);

  function formatDate(dateString: string | undefined): string {
    if (!dateString) return ""; // Return empty string if dateString is null or undefined

    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`; // Return formatted date string
  }

  return (
    <AdminLayout isFooter={false}>
      <div className="px-4 pt-6">
        <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
          <div className="mb-1 w-full">
            <div className="sm:flex">
              <div className="mb-3 items-center dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">
                <form className="lg:pr-3" onSubmit={(e) => Submit(e)}>
                  <div className="relative mt-1 lg:w-64 xl:w-96">
                    <div
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "8px",
                      }}
                    >
                      <Dropdown
                        label={
                          startStation ? `${startStation}` : "Start Station"
                        }
                        inline
                        name="users-search"
                        value={startStation}
                      >
                        {stations
                          .filter(
                            (station) =>
                              station.stationName !== endStation &&
                              station.stationName !== startStation
                          )
                          .map((station, index) => (
                            <Dropdown.Item
                              key={index}
                              onClick={() => {
                                console.log(
                                  `Selected Start Station: ${station.stationName} with stationId: ${station.id}`
                                );
                                setStartStation(station.stationName ?? "");
                                setStartStationId(station.id);
                              }}
                            >
                              {station.stationName}
                            </Dropdown.Item>
                          ))}
                      </Dropdown>
                    </div>
                    <div
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "8px",
                      }}
                    >
                      <Dropdown
                        label={endStation ? `${endStation}` : "End Station"}
                        inline
                        name="users-search"
                        value={endStation}
                      >
                        {stations
                          .filter(
                            (station) =>
                              station.stationName !== startStation &&
                              station.stationName !== endStation
                          )
                          .map((station, index) => (
                            <Dropdown.Item
                              key={index}
                              onClick={() => {
                                console.log(
                                  `Selected Start Station: ${station.stationName} with stationId: ${station.id}`
                                );
                                setEndStation(station.stationName ?? "");
                                setEndStationId(station.id);
                              }}
                            >
                              {station.stationName}
                            </Dropdown.Item>
                          ))}
                      </Dropdown>
                    </div>
                    {/* <TextInput
                      id="users-search"
                      name="users-search"
                      placeholder="Select date..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    /> */}
                    <div>
                      <ReactDatePicker
                        selected={selectedDate ? new Date(selectedDate) : null}
                        onChange={(date) => {
                          if (date instanceof Date && !isNaN(date.getTime())) {
                            // Check if 'date' is a valid Date object
                            const year = date.getFullYear();
                            const month = String(date.getMonth() + 1).padStart(
                              2,
                              "0"
                            );
                            const day = String(date.getDate()).padStart(2, "0");
                            const formattedDate = `${year}-${month}-${day}`;
                            console.log("Formatted Date:", formattedDate);
                            console.log("date:", date);
                            setDate(formattedDate);
                            handleDateChange(date);
                          }
                        }}
                        placeholderText="Select date..."
                        dateFormat="yyyy-MM-dd"
                        title="Flowbite Datepicker"
                      />
                    </div>
                    <button
                      type="submit"
                      className="absolute inset-y-0 right-0 flex items-center pr-2"
                    >
                      <HiSearch />
                    </button>
                  </div>
                </form>
              </div>
              <div className="ml-auto flex items-center space-x-2 sm:space-x-3">
                <Button
                  color="primary"
                  onClick={() => {
                    setIsOpen(true);
                    setType(TYPE.ADD);
                  }}
                >
                  <div className="flex items-center gap-x-3">
                    <HiPlus className="text-xl" />
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden shadow">
                <>
                  {/* Table of Record page */}
                  <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                    <Table.Head className="bg-gray-100 dark:bg-gray-700">
                      {/* <Table.HeadCell className="action-column text-center">
                        {null}
                      </Table.HeadCell> */}
                      <Table.HeadCell>No.</Table.HeadCell>
                      <Table.HeadCell>Bus Number</Table.HeadCell>
                      <Table.HeadCell>Driver</Table.HeadCell>
                      <Table.HeadCell>Field Capacity</Table.HeadCell>
                      <Table.HeadCell>Route Name</Table.HeadCell>
                      <Table.HeadCell>Route</Table.HeadCell>
                      <Table.HeadCell>Date</Table.HeadCell>
                      <Table.HeadCell>Departure Time</Table.HeadCell>
                      <Table.HeadCell>Arrival Time</Table.HeadCell>
                      <Table.HeadCell>Departure Stop</Table.HeadCell>
                      <Table.HeadCell>Arrival Stop</Table.HeadCell>

                      {/* <Table.HeadCell>Price</Table.HeadCell> */}

                      {/* <Table.HeadCell>Owner</Table.HeadCell> */}
                      {/* <Table.HeadCell className="created-column">
                        Created{" "}
                      </Table.HeadCell> */}
                      <Table.HeadCell className="action-column text-center">
                        Actions
                      </Table.HeadCell>
                      <Table.HeadCell className="action-column text-center">
                        {null}
                      </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                      {searchResultSchedule.length > 0
                        ? searchResultSchedule.map((value, index) => (
                          <Table.Row
                            key={index}
                            className="hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <Table.Cell className="whitespace-nowrap  text-base font-medium text-gray-900 dark:text-white">
                              {index + 1}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap  text-base font-medium text-gray-900 dark:text-white">
                              {/* {value.serialNo} */}
                              {(value as Schedule).route?.routeName}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap  text-base font-medium text-gray-900 dark:text-white">
                              {/* {value.formNo} */}
                              {(value as Schedule).departureTime}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap  text-base font-medium text-gray-900 dark:text-white">
                              {/* {value.code} */}
                              {(value as Schedule).arrivalTime}
                            </Table.Cell>
                            <Table.Cell>
                              <div className="flex items-center gap-x-2 whitespace-nowrap">
                                <Tooltip content="Resend email">
                                  <button
                                  // onClick={() => handleResendEmail(value)}
                                  >
                                    <HiPaperAirplane className="action-btn text-xl" />
                                  </button>
                                </Tooltip>
                                <Tooltip content="Edit">
                                  <button
                                    onClick={() => {
                                      setIsOpen(true);
                                      setType(TYPE.EDIT);
                                      setSchedule({
                                        ...value,
                                        route: null,
                                        departureTime: null,
                                        arrivalTime: null,
                                        date: null,
                                      });
                                      /* setScheduleBus({
                                      ...value,
                                      schedule: null,
                                      bus: null,
                                      driver: null,
                                      leftSeats: null,
                                    }); */
                                    }}
                                  /* disabled={
                                  value.status === STATUS_CODE.DEACTIVE
                                } */
                                  >
                                    <HiPencil className="action-btn text-xl" />
                                  </button>
                                </Tooltip>

                                {/* <Tooltip content="Publish">
                                  <button
                                  // disabled={
                                  //     value.status === STATUS_CODE.ACTIVE
                                  //   }
                                  //   onClick={() => handlePublish(value.id)}
                                  >
                                    <HiStatusOnline
                                      className={`action-btn text-xl`}
                                    />
                                  </button>
                                </Tooltip> */}

                                {/* <Tooltip content="Withdraw">
                                  <button
                                  // disabled={
                                  //     value.status === STATUS_CODE.DEACTIVE
                                  //   }
                                  //   onClick={() => handleWithdraw(value.id)}
                                  >
                                    <HiReply className={`action-btn text-xl`} />
                                  </button>
                                </Tooltip> */}
                              </div>
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap  text-base font-medium text-gray-900 dark:text-white">
                              {null}
                            </Table.Cell>
                          </Table.Row>
                        ))
                        : getAllScheduleBusData.map((value, index) => (
                          <Table.Row
                            key={index}
                            className="hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <Table.Cell className="whitespace-nowrap  text-base font-medium text-gray-900 dark:text-white">
                              {index + 1}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap  text-base font-medium text-gray-900 dark:text-white">
                              {(value as ScheduleBus).bus?.busNumber}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap  text-base font-medium text-gray-900 dark:text-white">
                              {/* {value.serialNo} */}
                              {(value as ScheduleBus).driver?.fullname ??
                                "N/A"}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap  text-base font-medium text-gray-900 dark:text-white">
                              {/* {value.serialNo} */}
                              {(value as ScheduleBus).bus?.capacity}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap  text-base font-medium text-gray-900 dark:text-white">
                              {
                                (value as ScheduleBus).schedule?.route
                                  ?.routeName
                              }
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap  text-base font-medium text-gray-900 dark:text-white">
                              {/* {value.serialNo} */}
                              {(value as ScheduleBus).schedule?.route?.id}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap  text-base font-medium text-gray-900 dark:text-white">
                              {/* {value.code} */}
                              {formatDate(
                                (value as ScheduleBus).schedule?.date ?? ""
                              )}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap  text-base font-medium text-gray-900 dark:text-white">
                              {(value as ScheduleBus).schedule?.departureTime}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap  text-base font-medium text-gray-900 dark:text-white">
                              {/* {value.code} */}
                              {(value as ScheduleBus).schedule?.arrivalTime}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap  text-base font-medium text-gray-900 dark:text-white">
                              {departureStop}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap  text-base font-medium text-gray-900 dark:text-white">
                              {arrivalStop}
                            </Table.Cell>
                            <Table.Cell>
                              <div className="flex items-center gap-x-2 whitespace-nowrap">
                                <Tooltip content="Resend email">
                                  <button
                                  // onClick={() => handleResendEmail(value)}
                                  >
                                    <HiPaperAirplane className="action-btn text-xl" />
                                  </button>
                                </Tooltip>
                                <Tooltip content="Edit">
                                  <button
                                    onClick={() => {
                                      setIsOpen(true);
                                      setType(TYPE.EDIT);
                                      setSchedule({
                                        ...value,
                                        route: null,
                                        departureTime: null,
                                        arrivalTime: null,
                                        date: null,
                                      });
                                    }}
                                  /* disabled={
                                  value.status === STATUS_CODE.DEACTIVE
                                } */
                                  >
                                    <HiPencil className="action-btn text-xl" />
                                  </button>
                                </Tooltip>

                                {/* <Tooltip content="Publish">
                                  <button
                                  // disabled={
                                  //     value.status === STATUS_CODE.ACTIVE
                                  //   }
                                  //   onClick={() => handlePublish(value.id)}
                                  >
                                    <HiStatusOnline
                                      className={`action-btn text-xl`}
                                    />
                                  </button>
                                </Tooltip> */}

                                {/* <Tooltip content="Withdraw">
                                  <button
                                  // disabled={
                                  //     value.status === STATUS_CODE.DEACTIVE
                                  //   }
                                  //   onClick={() => handleWithdraw(value.id)}
                                  >
                                    <HiReply className={`action-btn text-xl`} />
                                  </button>
                                </Tooltip> */}
                              </div>
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap  text-base font-medium text-gray-900 dark:text-white">
                              {null}
                            </Table.Cell>
                          </Table.Row>
                        ))}
                    </Table.Body>
                  </Table>
                  {/* Pagination of table */}
                  {searchResultSchedule.length > 0 && (
                    <Pagination
                      currentPage={page}
                      onPageChange={(page) => {
                        onPageChange(page);
                      }}
                      showIcons
                      totalPages={totalPage}
                    />
                  )}
                </>
              </div>
            </div>
          </div>
        </div>
        {/* Modal of record page */}
        <ScheduleModal
          type={type}
          isOpen={isOpen}
          setOpen={setIsOpen}
          schedule={schedule}
          setSchedule={setSchedule}
          setIsCompleted={setIsCompleted}
        />

        {/* <ScheduleBusModal
          type={type}
          isOpen={isOpen}
          setOpen={setIsOpen}
          scheduleBus={scheduleBus}
          setScheduleBus={setScheduleBus}
          setIsCompleted={setIsCompleted}
        /> */}
      </div>
    </AdminLayout>
  );
};
export default MANAGE_SchedulePage;
