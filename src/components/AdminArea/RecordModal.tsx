import { FC, useState, useEffect, Dispatch, SetStateAction } from "react";
import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import { Loading, Notify } from "notiflix";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Record } from "../../models/record";
import { createRecord, updateRecord } from "../../services/recordService";
import { HttpResponse } from "../../models/httpResponse";
import CustomFileInput from "./CustomFileInput";
import { initRecord } from "../../utils/configs/initialRecord";
import { NOTIFY } from "../../utils/configs/notify";
import { TYPE } from "../../utils/configs/type";
import { RES_CODE } from "../../utils/configs/statusCode";

type Props = {
  type: string;
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  record: Record;
  setRecord: Dispatch<SetStateAction<Record>>;
  setIsCompleted: Dispatch<SetStateAction<boolean>>;
};

export const RecordModal: FC<Props> = function ({
  type,
  isOpen,
  setOpen,
  record,
  setRecord,
  setIsCompleted,
}) {
  const [file, setFile] = useState<File>();
  const [isValid, setIsValid] = useState<boolean>(false);
  // const [dateRange, setDateRange] = useState([] as Date[]);
  // const [startDate, endDate] = dateRange;

  const validateInput = () => {
    if (type === TYPE.ADD) {
      if (
        record.staff.firstname &&
        record.staff.lastname &&
        record.staff.email &&
        record.seqNo &&
        record.serialNo &&
        record.formNo &&
        record.uploadFile &&
        record.publishedDate &&
        record.whMonthStart &&
        record.whMonthEnd
      )
        setIsValid(true);
      else setIsValid(false);
    } else {
      if (
        record.seqNo &&
        record.serialNo &&
        record.formNo &&
        record.publishedDate &&
        record.whMonthStart &&
        record.whMonthEnd
      )
        setIsValid(true);
      else setIsValid(false);
    }
  };

  const handleSubmit = async () => {
    debugger;
    try {
      if (type === TYPE.ADD) {
        Loading.hourglass();
        const res: HttpResponse = await createRecord(record);
        if (res.resCode === RES_CODE.OK) {
          setOpen(false);
          setRecord(initRecord);
          setIsCompleted(true);
          Loading.remove();
          Notify.success(NOTIFY.CREATE_SUCCESS);
        } else {
          Notify.failure(res.resMsg.message || res.resMsg);
          Loading.remove();
        }
      } else {
        Loading.hourglass();
        const res: HttpResponse = await updateRecord(record);
        if (res.resCode === RES_CODE.OK) {
          setOpen(false);
          setRecord(initRecord);
          setIsCompleted(true);
          Loading.remove();
          Notify.success(NOTIFY.UPDATE_SUCCESS);
        } else {
          Notify.failure(res.resMsg.message || res.resMsg);
          Loading.remove();
        }
      }
    } catch (e) {
      Notify.failure(NOTIFY.SERVER_ERROR);
      Loading.remove();
    }
  };

  useEffect(() => {
    setRecord({
      ...record,
      uploadFile: file!,
    });
  }, [file]);

  useEffect(() => {
    validateInput();
  }, [record]);

  return (
    <>
      <Modal
        onClose={() => {
          setOpen(false);
          setRecord(initRecord);
        }}
        show={isOpen}
      >
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>{type == TYPE.ADD ? "Add" : "Edit"} record</strong>
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
                      value={record?.staff?.firstname}
                      onChange={(e) => {
                        setRecord({
                          ...record,
                          staff: {
                            ...record.staff,
                            firstname: e.target.value,
                          },
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
                      value={record?.staff?.lastname}
                      onChange={(e) => {
                        setRecord({
                          ...record,
                          staff: {
                            ...record.staff,
                            lastname: e.target.value,
                          },
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
                      value={record?.staff?.email}
                      onChange={(e) => {
                        setRecord({
                          ...record,
                          staff: {
                            ...record.staff,
                            email: e.target.value,
                          },
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
                  startDate={record.whMonthStart}
                  endDate={record.whMonthEnd}
                  onChange={(update) => {
                    setRecord({
                      ...record,
                      whMonthStart: update[0] as Date,
                      whMonthEnd: update[1] as Date,
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
                  selected={record.publishedDate}
                  onChange={(date) =>
                    setRecord({
                      ...record,
                      publishedDate: date as Date,
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
                  value={record.seqNo}
                  onChange={(e) => {
                    setRecord({
                      ...record,
                      seqNo: +e.target?.value,
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
                  value={record.serialNo}
                  onChange={(e) => {
                    setRecord({
                      ...record,
                      serialNo: e.target.value,
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
                  value={record.formNo}
                  onChange={(e) => {
                    setRecord({
                      ...record,
                      formNo: e.target.value,
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
                value={record.description}
                onChange={(e) =>
                  setRecord({ ...record, description: e.target.value })
                }
              />
            </div>
          </div>
          {type === TYPE.ADD && (
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
                fileName={record?.file?.name}
              />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="justify-end">
          <Button
            color="failure"
            onClick={() => {
              setOpen(false);
              setRecord(initRecord);
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
