import type { FC, Dispatch, SetStateAction } from "react";
import { useState, useEffect } from "react";
import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import { Loading, Notify } from "notiflix";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { ScheduleBus } from "../../models/AdminArea/schedule/scheduleBus";
// import type { HttpResponse } from "../../models/httpResponse";
// import CustomFileInput from "./CustomFileInput";
import { NOTIFY } from "../../utils/configs/notify";
import { TYPE } from "../../utils/configs/type";
// import { RES_CODE } from "../../utils/configs/statusCode";
import {
  createScheduleBus,
  updateScheduleBus,
} from "../../services/AdminArea/scheduleBusService";
import { initScheduleBus } from "../../utils/configs/initialScheduleBus";

interface Props {
  type: string;
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  scheduleBus: ScheduleBus;
  setScheduleBus: Dispatch<SetStateAction<ScheduleBus>>;
  setIsCompleted: Dispatch<SetStateAction<boolean>>;
}

export const ScheduleBusModal: FC<Props> = function ({
  type,
  isOpen,
  setOpen,
  scheduleBus,
  setScheduleBus,
  setIsCompleted,
}) {
  // const [file, setFile] = useState<File>();
  const [isValid, setIsValid] = useState<boolean>(false);
  // const [dateRange, setDateRange] = useState([] as Date[]);
  // const [startDate, endDate] = dateRange;

  const validateInput = () => {
    if (type === TYPE.ADD) {
      if (
        scheduleBus.schedule?.id &&
        scheduleBus.bus?.id &&
        scheduleBus.driver?.id
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
        const res = await createScheduleBus(scheduleBus);
        if (res.status === 201) {
          setOpen(false);
          setScheduleBus(initScheduleBus);
          setIsCompleted(true);
          Loading.remove();
          Notify.success(NOTIFY.CREATE_SUCCESS);
        } else {
          // Notify.failure(res.resMsg.message || res.resMsg);
          Loading.remove();
        }
      } else {
        Loading.hourglass();
        const res = await updateScheduleBus(scheduleBus);
        if (res.status === 200) {
          setOpen(false);
          setScheduleBus(initScheduleBus);
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
    setScheduleBus({
      ...scheduleBus,
      // uploadFile: file!,
    });
    // }, [file]);
  }, []);

  useEffect(() => {
    validateInput();
  }, [scheduleBus]);

  return (
    <>
      <Modal
        onClose={() => {
          setOpen(false);
          setScheduleBus(initScheduleBus);
        }}
        show={isOpen}
      >
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>{type == TYPE.ADD ? "Add" : "Edit"} Schedule Bus</strong>
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
                        setScheduleBus({
                          ...scheduleBus,
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
                        setScheduleBus({
                          ...scheduleBus,
                          /* staff: {
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
                        setScheduleBus({
                          ...scheduleBus,
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
              <Label htmlFor="whMonth">Withholding month</Label>{" "}
              <span className="red-star"> *</span>
              <div className="mt-1">
                <DatePicker
                  selectsRange={true}
                  // startDate={record.whMonthStart}
                  // endDate={record.whMonthEnd}

                  // onChange={(update) => {
                  onChange={() => {
                    setScheduleBus({
                      ...scheduleBus,
                      // whMonthStart: update[0]!,
                      // whMonthEnd: update[1]!,
                    });
                  }}
                  isClearable={true}
                  showYearDropdown
                  showMonthDropdown
                />
              </div>
            </div>
            <div>
              {/* Published date */}
              <Label htmlFor="publishedDate">Issue date</Label>{" "}
              <span className="red-star"> *</span>
              <div className="mt-1">
                <DatePicker
                  // selected={record.publishedDate}

                  // onChange={(date) =>
                  onChange={() =>
                    setScheduleBus({
                      ...scheduleBus,
                      // publishedDate: date!,
                    })
                  }
                  dateFormat="dd/MM/yyyy"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="seqNo">Sequence No.</Label>{" "}
              <span className="red-star"> *</span>
              <div className="mt-1">
                <TextInput
                  id="seqNo"
                  name="seqNo"
                  // value={record.seqNo}

                  // onChange={(e) => {
                  onChange={() => {
                    setScheduleBus({
                      ...scheduleBus,
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
            </div>
            <div>
              <Label htmlFor="serialNo">Serial No.</Label>{" "}
              <span className="red-star"> *</span>
              <div className="mt-1">
                <TextInput
                  id="serialNo"
                  name="serialNo"
                  // value={record.serialNo}

                  // onChange={(e) => {
                  onChange={() => {
                    setScheduleBus({
                      ...scheduleBus,
                      // serialNo: e.target.value,
                    });
                  }}
                  type="text"
                  pattern="^[a-zA-Z0-9\/]+$"
                  title="Only allow alphabet, number and slash"
                  disabled={type === TYPE.EDIT}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="formNo">Form No.</Label>{" "}
              <span className="red-star"> *</span>
              <div className="mt-1">
                <TextInput
                  id="formNo"
                  name="formNo"
                  // value={record.formNo}

                  // onChange={(e) => {
                  onChange={() => {
                    setScheduleBus({
                      ...scheduleBus,
                      // formNo: e.target.value,
                    });
                  }}
                  type="text"
                  pattern="^[a-zA-Z0-9\/]+$"
                  title="Only allow alphabet, number and slash"
                />
              </div>
            </div>
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
                  setScheduleBus({
                    ...scheduleBus,
                    // description: e.target.value,
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
              setScheduleBus(initScheduleBus);
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
