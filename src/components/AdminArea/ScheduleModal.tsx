import type { FC, Dispatch, SetStateAction } from "react";
import { useState, useEffect } from "react";
import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import { Loading, Notify } from "notiflix";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { Schedule } from "../../models/AdminArea/schedule/schedule";
// import type { HttpResponse } from "../../models/httpResponse";
// import CustomFileInput from "./CustomFileInput";
import { NOTIFY } from "../../utils/configs/notify";
import { TYPE } from "../../utils/configs/type";
// import { RES_CODE } from "../../utils/configs/statusCode";
import {
  createSchedule,
  updateSchedule,
} from "../../services/AdminArea/scheduleService";
import { initSchedule } from "../../utils/configs/initialSchedule";
import { TimeField } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import TimePicker from "react-time-picker";
// import "react-time-picker/dist/react-time-picker.css";

interface Props {
  type: string;
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  schedule: Schedule;
  setSchedule: Dispatch<SetStateAction<Schedule>>;
  setIsCompleted: Dispatch<SetStateAction<boolean>>;
}

export const ScheduleModal: FC<Props> = function ({
  type,
  isOpen,
  setOpen,
  schedule,
  setSchedule,
  setIsCompleted,
}) {
  // const [file, setFile] = useState<File>();
  const [isValid, setIsValid] = useState<boolean>(false);
  // const [dateRange, setDateRange] = useState([] as Date[]);
  // const [startDate, endDate] = dateRange;

  const validateInput = () => {
    if (type === TYPE.ADD) {
      if (
        schedule.route?.id &&
        schedule.departureTime &&
        schedule.arrivalTime &&
        schedule.date
      )
        setIsValid(true);
      else setIsValid(false);
    } else {
      if (
        schedule.route?.id &&
        schedule.departureTime &&
        schedule.arrivalTime &&
        schedule.date
      )
      setIsValid(true);
      else setIsValid(false);
    }
  };

  const handleSubmit = async () => {
    // eslint-disable-next-line no-debugger
    debugger;
    try {
      if (type === TYPE.ADD) {
        Loading.hourglass();
        const res = await createSchedule(schedule);
        if (res.status === 201) {
          setOpen(false);
          setSchedule(initSchedule);
          setIsCompleted(true);
          Loading.remove();
          Notify.success(NOTIFY.CREATE_SUCCESS);
        } else {
          // Notify.failure(res.resMsg.message || res.resMsg);
          Loading.remove();
        }
      } else {
        Loading.hourglass();
        const res = await updateSchedule(schedule);
        if (res.status === 200) {
          setOpen(false);
          setSchedule(initSchedule);
          setIsCompleted(true);
          Loading.remove();
          Notify.success(NOTIFY.UPDATE_SUCCESS);
        } else {
          // Notify.failure(res.resMsg.message || res.resMsg);
          Loading.remove();
        }
      }
    } catch (e) {
      Notify.failure(NOTIFY.SERVER_ERROR);
      Loading.remove();
    }
  };

  useEffect(() => {
    setSchedule({
      ...schedule,
      // uploadFile: file!,
    });
    // }, [file]);
  }, []);

  useEffect(() => {
    validateInput();
  }, [schedule]);

  return (
    <>
      <Modal
        onClose={() => {
          setOpen(false);
          setSchedule(initSchedule);
        }}
        show={isOpen}
      >
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>{type == TYPE.ADD ? "Add" : "Edit"} Schedule</strong>
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {type === TYPE.ADD && (
              <>
                <div>
                  <Label htmlFor="firstName">First Name</Label>{" "}
                  <span className="red-star"> *</span>
                  <div className="mt-1">
                    <TextInput
                      id="firstname"
                      name="firstname"
                      // value={record.staff.firstname}

                      // onChange={(e) => {
                      onChange={() => {
                        setSchedule({
                          ...schedule,
                          /* staff: {
                            ...record.staff,
                            firstname: e.target.value,
                          }, */
                        });
                      }}
                      type="text"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="lastname">Last Name</Label>{" "}
                  <span className="red-star"> *</span>
                  <div className="mt-1">
                    <TextInput
                      id="lastname"
                      name="lastname"
                      // value={record.staff.lastname}

                      // onChange={(e) => {
                      onChange={() => {
                        setSchedule({
                          ...schedule,
                          /*staff: {
                            ...record.staff,
                            lastname: e.target.value,
                          }, */
                        });
                      }}
                      type="text"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>{" "}
                  <span className="red-star"> *</span>
                  <div className="mt-1">
                    <TextInput
                      id="email"
                      name="email"
                      // value={record.staff.email}

                      // onChange={(e) => {
                      onChange={() => {
                        setSchedule({
                          ...schedule,
                          /* staff: {
                            ...record.staff,
                            email: e.target.value,
                          }, */
                        });
                      }}
                      type="email"
                    />
                  </div>
                </div>
              </>
            )}
            <div>
              <Label htmlFor="routeId">Route ID</Label>{" "}
              <span className="red-star"> *</span>
              <div className="mt-1">
              <TextInput
                  id="routeId"
                  name="routeId"
                  value={schedule.route?.id ?? ""}

                  // onChange={(e) => {
                  onChange={(e) => {
                    setSchedule({
                      ...schedule,
                      route: {
                        ...schedule.route,
                        id: +e.target.value,
                        routeName: schedule.route?.routeName ?? "",
                        stations: schedule.route?.stations ?? [],
                      },
                    });
                  }}
                  type="number"
                  pattern="[0-9]{1,7}"
                  min="1"
                  max="9999999"
                  // disabled={type === TYPE.EDIT}
                  title="only allow number input, up to 7 numbers."
                />
              </div>
            </div>
            <div>
              {/* Published date */}
              <Label htmlFor="departureTime">Departure Time</Label>{" "}
              <span className="red-star"> *</span>
                <div className="mt-1">
                <DatePicker
                selected={schedule.departureTime ? new Date(schedule.departureTime) : null}
                onChange={(date) =>
                  setSchedule({
                    ...schedule,
                    departureTime: date ? date.toISOString() : null,
                  })
                }
                dateFormat="dd/MM/yyyy"
              />
                </div>
            </div>
            <div>
              {/* Published date */}
              <Label htmlFor="arrivalTime">Arrival Time</Label>{" "}
              <span className="red-star"> *</span>
                <div className="mt-1">
                <TimePicker
                  onChange={(value) => {
                    if (value) {
                      const [hours, minutes] = value.split(':');
                      const date = new Date(schedule.arrivalTime ?? "");
                      date.setHours(parseInt(hours ?? "00"));
                      date.setMinutes(parseInt(minutes ?? "00"));
                      setSchedule({
                        ...schedule,
                        arrivalTime: date.toISOString(),
                      });
                    }
                  }}
                  value={schedule.arrivalTime ? new Date(schedule.arrivalTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) : ''}
                />
                
                {/* <DatePicker
                selected={schedule.arrivalTime ? new Date(schedule.arrivalTime) : null}
                onChange={(date) =>
                  setSchedule({
                    ...schedule,
                    arrivalTime: date ? date.toISOString() : null,
                  })
                }
                dateFormat="dd/MM/yyyy"
              /> */}
              
                </div>
            </div>
            <div>
              {/* Published date */}
              <Label htmlFor="date">Date</Label>{" "}
              <span className="red-star"> *</span>
                <div className="mt-1">
                <DatePicker
                selected={schedule.date ? new Date(schedule.date) : null}
                onChange={(date) =>
                  setSchedule({
                    ...schedule,
                    date: date ? date.toISOString() : null,
                  })
                }
                dateFormat="dd/MM/yyyy"
              />
                </div>
            </div>
            {/* <div>
              <Label htmlFor="seqNo">Sequence No.</Label>{" "}
              <span className="red-star"> *</span>
              <div className="mt-1">
                <TextInput
                  id="seqNo"
                  name="seqNo"
                  // value={record.seqNo}

                  // onChange={(e) => {
                  onChange={() => {
                    setSchedule({
                      ...schedule,
                      // seqNo: +e.target.value,
                    });
                  }}
                  type="number"
                  pattern="[0-9]{1,7}"
                  min="1"
                  max="9999999"
                  disabled={type === TYPE.EDIT}
                  title="only allow number input, up to 7 numbers."
                />
              </div>
            </div> */}
            {/* <div>
              <Label htmlFor="serialNo">Serial No.</Label>{" "}
              <span className="red-star"> *</span>
              <div className="mt-1">
                <TextInput
                  id="serialNo"
                  name="serialNo"
                  // value={record.serialNo}

                  // onChange={(e) => {
                  onChange={() => {
                    setSchedule({
                      ...schedule,
                      // serialNo: e.target.value,
                    });
                  }}
                  type="text"
                  pattern="^[a-zA-Z0-9\/]+$"
                  title="Only allow alphabet, number and slash"
                  disabled={type === TYPE.EDIT}
                />
              </div>
            </div> */}
            {/* <div>
              <Label htmlFor="formNo">Form No.</Label>{" "}
              <span className="red-star"> *</span>
              <div className="mt-1">
                <TextInput
                  id="formNo"
                  name="formNo"
                  // value={record.formNo}

                  // onChange={(e) => {
                  onChange={() => {
                    setSchedule({
                      ...schedule,
                      // formNo: e.target.value,
                    });
                  }}
                  type="text"
                  pattern="^[a-zA-Z0-9\/]+$"
                  title="Only allow alphabet, number and slash"
                />
              </div>
            </div> */}
          </div>
          <div>
            <Label className="mt-2" htmlFor="Description">
              Description
            </Label>
            <div className="mt-1">
              <Textarea
                id="Description"
                name="Description"
                // value={record.description}

                // onChange={(e) =>
                onChange={() =>
                  setSchedule({
                    ...schedule,
                    // description: e.target.value
                  })
                }
              />
            </div>
          </div>
          {/* {type === TYPE.ADD && (
            <div className="max-w mt-2" id="fileUpload">
              <div className="mb-2 block">
                <Label htmlFor="file" defaultValue="Upload file">
                  Upload file
                </Label>{" "}
                <span className="red-star"> *</span>
              </div>
              <CustomFileInput
                file={file}
                setFile={setFile}
                fileName={record.file.name}
              />
            </div>
          )} */}
        </Modal.Body>
        <Modal.Footer className="justify-end">
          <Button
            color="failure"
            onClick={() => {
              setOpen(false);
              setSchedule(initSchedule);
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={!isValid}
            color="success"
            onClick={() => handleSubmit()}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
