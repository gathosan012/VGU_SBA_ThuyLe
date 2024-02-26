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

const SchedulePage: FC = () => {
  const [search, setSearch] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // modal
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [type, setType] = useState<string>(TYPE.ADD);
  const [schedule, setSchedule] = useState<Schedule>(initSchedule);
  const { data: initialStations } = initStation;
  const [stations, setStations] = useState<Station[]>(initialStations);

  const [startStation, setStartStation] = useState<string>("");
  const [endStation, setEndStation] = useState<string>("");

  const [scheduleBus, setScheduleBus] = useState<ScheduleBus>(initScheduleBus);
  const [isCompleted, setIsCompleted] = useState<boolean>(false); // track on create success
  // end of modal

  const [searchResult, setSearchResult] = useState<(Schedule | ScheduleBus)[]>(
    []
  );
  const [stationNames, setStationNames] = useState<string[]>([]);
  const [stationIds, setStationIds] = useState<string[]>([]);

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
    searchSchedule(search);
  };

  /* useEffect(() => {
    const fetchStationNames = async () => {
      try {
        const response = await getAllSchedule();
        if (response.status === 200) {
          // Check if response.data is an array
          if (Array.isArray(response.data)) {
            // Use flatMap to extract and flatten the station names array
            const stationNames = response.data.flatMap((schedule: Schedule) => {
              // Use optional chaining to access 'route' and 'stations'
              const stations = schedule.route?.stations;
              // Use optional chaining to access 'stationName'
              return (
                stations?.map(
                  (station) => station.station?.stationName ?? ""
                ) ?? []
              );
            });

            // Set the station names state
            setStationNames(stationNames);
          } else {
            console.error("Response data is not an array:", response.data);
          }
        } else {
          console.error("Failed to fetch station data:", response);
        }
      } catch (error) {
        console.error("An error occurred when fetching station names:", error);
      }
    };

    fetchStationNames();
  }, []); */

  useEffect(() => {
    const fetchStationNames = async () => {
      try {
        const response = await getAllStation();
        if (response.status === 200) {
          console.log("response.data: ", response.data);
          if (Array.isArray(response.data)) {
            const stationName: string[] = response.data.flatMap(
              (station: Station) => station.stationName ?? ""
            );
            const stationId: string[] = response.data.flatMap(
              (station: Station) => station.id?.toString() ?? ""
            );
            console.log("stationName: ", stationName);
            console.log("stationId: ", stationId);
            setStationNames(stationName);
            setStationIds(stationId);
          } else {
            console.error("Response data is not an array:", response.data);
          }
        } else {
          console.error("Failed to fetch station data:", response);
        }
      } catch (error) {
        console.error("An error occurred when fetching station names:", error);
      }
    };

    fetchStationNames();
  }, []);

  // Your component JSX and logic here

  // search handler
  const searchSchedule = async (searchString?: string) => {
    try {
      Loading.hourglass();
      const res = await searchSchedulePagination(
        start,
        LIMIT,
        searchString ?? null
      );
      if (res.status === 200) {
        setSearchResult([...res]);
        const totalRecords = res.length;
        /* ---------------------------------------------- round page number logic --------------------------------------------- */
        // 50 / 10 = 5
        //  55 / 10 = 6
        setTotalPage(fetchRoundPageNumber(totalRecords, LIMIT));
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
                        onChange={(e) => {
                          const selectedValue = (e.target as HTMLSelectElement)
                            .value;
                          console.log("Selected Start Station:", selectedValue);
                          setStartStation(selectedValue);
                        }}
                      >
                        {stationNames.map((stationName, index) => (
                          <Dropdown.Item
                            key={index}
                            onClick={() => {
                              /* console.log(
                                "Selected Start Station:",
                                stationName
                              );
                              console.log(
                                "Selected Start Station Id:",
                                stationIds[index]
                              ); */
                              console.log(
                                `Selected Start Station: ${stationName} with stationId: ${stationIds[index]}`,
                              );
                              setStartStation(stationName);
                            }}
                          >
                            {stationName}
                            {/* {`${stationName} (${stationIds[index]})`}{" "} */}
                            {/* Display both stationName and stationId */}
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
                        onChange={(e) => {
                          const selectedValue = (e.target as HTMLSelectElement)
                            .value;
                          console.log("Selected End Station:", selectedValue);
                          setStartStation(selectedValue);
                        }}
                      >
                        {stationNames.map((stationName, index) => (
                          <Dropdown.Item
                            key={index}
                            onClick={() => {
                              /* console.log(
                                "Selected Start Station:",
                                stationName
                              );
                              console.log(
                                "Selected Start Station Id:",
                                stationIds[index]
                              ); */
                              console.log(
                                `Selected End Station: ${stationName} with stationId: ${stationIds[index]}`,
                              );
                              setEndStation(stationName);
                            }}
                          >
                            {stationName}
                            {/* {`${stationName} (${stationIds[index]})`}{" "} */}
                            {/* Display both stationName and stationId */}
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
                        onChange={(date) => handleDateChange(date)}
                        placeholderText="Select date..."
                        dateFormat="yyyy-MM-dd" // Set the date format
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
                      <Table.HeadCell>No.</Table.HeadCell>
                      <Table.HeadCell>Bus Number</Table.HeadCell>
                      <Table.HeadCell>Driver</Table.HeadCell>
                      <Table.HeadCell>Seat Capacity</Table.HeadCell>
                      <Table.HeadCell>Route Name</Table.HeadCell>
                      <Table.HeadCell>Time Start</Table.HeadCell>
                      <Table.HeadCell>Arrival Time</Table.HeadCell>
                      {/* <Table.HeadCell>Owner</Table.HeadCell> */}
                      <Table.HeadCell className="created-column">
                        Created{" "}
                      </Table.HeadCell>
                      <Table.HeadCell className="action-column text-center">
                        Actions
                      </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                      {searchResult.length > 0 ? (
                        searchResult.map((value, index) => (
                          <Table.Row
                            key={index}
                            className="hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <Table.Cell className="whitespace-nowrap  text-base font-medium text-gray-900 dark:text-white">
                              {index + 1}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap  text-base font-medium text-gray-900 dark:text-white">
                              {/* {value.seqNo.toString().padStart(7, "0")} */}
                              {(value as ScheduleBus).bus?.busNumber}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap  text-base font-medium text-gray-900 dark:text-white">
                              {/* {toStringDate(value.whMonthStart)} -{" "} */}
                              {/* {toStringDate(value.whMonthEnd)} */}
                              {(value as ScheduleBus).driver?.fullname}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap  text-base font-medium text-gray-900 dark:text-white">
                              {/* {value.serialNo} */}
                              {(value as ScheduleBus).leftSeats}
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
                            <Table.Cell className="mr-12 flex items-center space-x-6 whitespace-nowrap  lg:mr-0">
                              <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                <div className="text-base font-semibold text-gray-900 dark:text-white">
                                  {/* {value.staff.firstname} {value.staff.lastname} */}
                                </div>
                                <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                  {/* {value.staff.email} */}
                                </div>
                              </div>
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap  text-base font-medium text-gray-900 dark:text-white">
                              <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                <div className="text-base font-semibold text-gray-900 dark:text-white">
                                  {/* {toStringDate(value.createdDate!)} */}
                                </div>
                                <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                  {/* {toStringTime(value.createdDate!)} */}
                                </div>
                              </div>
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
                                      setScheduleBus({
                                        ...value,
                                        schedule: null,
                                        bus: null,
                                        driver: null,
                                        leftSeats: null,
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
                          </Table.Row>
                        ))
                      ) : (
                        <Table.Row>
                          <Table.Cell colSpan={10} className="text-center">
                            No Data Found!
                          </Table.Cell>
                        </Table.Row>
                      )}
                    </Table.Body>
                  </Table>
                  {/* Pagination of table */}
                  {searchResult.length > 0 && (
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

        <ScheduleBusModal
          type={type}
          isOpen={isOpen}
          setOpen={setIsOpen}
          scheduleBus={scheduleBus}
          setScheduleBus={setScheduleBus}
          setIsCompleted={setIsCompleted}
        />
      </div>
    </AdminLayout>
  );
};
export default SchedulePage;
