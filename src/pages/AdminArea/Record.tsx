/* eslint-disable jsx-a11y/anchor-is-valid */
import { type FC, useState, type FormEvent, useEffect } from "react";
import { Button, Pagination, Table, TextInput, Tooltip } from "flowbite-react";
import {
  HiPencil,
  HiPlus,
  HiSearch,
  HiStatusOnline,
  HiReply,
} from "react-icons/hi";

import AdminLayout from "../../layouts/AdminArea/AdminLayout";
import { RecordModal } from "../../components/AdminArea/RecordModal";
import { type Record } from "../../models/record";
import { HttpResponse } from "../../models/httpResponse";
import {
  publishRecord,
  searchRecordPagination,
  withdrawRecord,
} from "../../services/recordService";
import { Loading, Notify } from "notiflix";
import { toStringDate, toStringTime } from "../../utils/utilityFunctions";

import { initRecord } from "../../utils/configs/initialRecord";
import { HiPaperAirplane } from "react-icons/hi2";
import { resendEmail } from "../../services/mailService";
import { NOTIFY } from "../../utils/configs/notify";
import { RES_CODE, STATUS_CODE } from "../../utils/configs/statusCode";
import { TYPE } from "../../utils/configs/type";

const RecordPage: FC = function () {
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

  const Submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // convert into filter
    searchRecord(search);
  };
  // search handler
  const searchRecord = async (searchString?: string) => {
    try {
      Loading.hourglass();
      const res = await searchRecordPagination(start, LIMIT, searchString);
      if (res.resCode === RES_CODE.OK) {
        setSearchResult([...res.payload.data]);
        /* ---------------------------------------------- round page number logic --------------------------------------------- */
        // 50 / 10 = 5
        //  55 / 10 = 6
        setTotalPage(Math.ceil(res.payload.maxSize / LIMIT));
        Loading.remove();
      } else {
        Notify.failure(res.resMsg.message || res.resMsg);
        Loading.remove();
      }
    } catch (e) {
      Notify.failure(NOTIFY.SERVER_ERROR);
      Loading.remove();
    }
  };

  // Search on page changed
  useEffect(() => {
    searchRecord();
  }, [page, start]);
  // Search again after created new record
  useEffect(() => {
    if (!isOpen && isCompleted) {
      searchRecord();
      setIsCompleted(false);
    }
  }, [isCompleted, isOpen]);
  // Resend email handler
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
  };
  // Publish button handler
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
  };
  // Withdraw button handler
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
  };

  return (
    <AdminLayout isFooter={false}>
      <div className="px-4 pt-6">
        <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
          <div className="mb-1 w-full">
            <div className="sm:flex">
              <div className="mb-3 items-center dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">
                <form className="lg:pr-3" onSubmit={(e) => Submit(e)}>
                  <div className="relative mt-1 lg:w-64 xl:w-96">
                    <TextInput
                      id="users-search"
                      name="users-search"
                      placeholder="Search for records..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
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
                      <Table.HeadCell>Sequence No</Table.HeadCell>
                      <Table.HeadCell>Withholding month</Table.HeadCell>
                      <Table.HeadCell>Serial number</Table.HeadCell>
                      <Table.HeadCell>Form no</Table.HeadCell>
                      <Table.HeadCell>Lookup code</Table.HeadCell>
                      <Table.HeadCell>Owner</Table.HeadCell>
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
                              {value.seqNo.toString().padStart(7, "0")}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap  text-base font-medium text-gray-900 dark:text-white">
                              {toStringDate(value.whMonthStart)} -{" "}
                              {toStringDate(value.whMonthEnd)}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap  text-base font-medium text-gray-900 dark:text-white">
                              {value.serialNo}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap  text-base font-medium text-gray-900 dark:text-white">
                              {value.formNo}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap  text-base font-medium text-gray-900 dark:text-white">
                              {value.code}
                            </Table.Cell>
                            <Table.Cell className="mr-12 flex items-center space-x-6 whitespace-nowrap  lg:mr-0">
                              <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                <div className="text-base font-semibold text-gray-900 dark:text-white">
                                  {value.staff.firstname} {value.staff.lastname}
                                </div>
                                <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                  {value.staff.email}
                                </div>
                              </div>
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap  text-base font-medium text-gray-900 dark:text-white">
                              <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                <div className="text-base font-semibold text-gray-900 dark:text-white">
                                  {toStringDate(value.createdDate!)}
                                </div>
                                <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                  {toStringTime(value.createdDate!)}
                                </div>
                              </div>
                            </Table.Cell>
                            <Table.Cell>
                              <div className="flex items-center gap-x-2 whitespace-nowrap">
                                <Tooltip content="Resend email">
                                  <button
                                    onClick={() => handleResendEmail(value)}
                                  >
                                    <HiPaperAirplane className="action-btn text-xl" />
                                  </button>
                                </Tooltip>
                                <Tooltip content="Edit">
                                  <button
                                    onClick={() => {
                                      setIsOpen(true);
                                      setType(TYPE.EDIT);
                                      setRecord({
                                        ...value,
                                        whMonthStart: new Date(
                                          value.whMonthStart
                                        ),
                                        whMonthEnd: new Date(value.whMonthEnd),
                                        publishedDate: new Date(
                                          value.publishedDate
                                        ),
                                      });
                                    }}
                                    disabled={
                                      value.status === STATUS_CODE.DEACTIVE
                                    }
                                  >
                                    <HiPencil className="action-btn text-xl" />
                                  </button>
                                </Tooltip>
                                <Tooltip content="Publish">
                                  <button
                                    disabled={
                                      value.status === STATUS_CODE.ACTIVE
                                    }
                                    onClick={() => handlePublish(value.id)}
                                  >
                                    <HiStatusOnline
                                      className={`action-btn text-xl`}
                                    />
                                  </button>
                                </Tooltip>
                                <Tooltip content="Withdraw">
                                  <button
                                    disabled={
                                      value.status === STATUS_CODE.DEACTIVE
                                    }
                                    onClick={() => handleWithdraw(value.id)}
                                  >
                                    <HiReply className={`action-btn text-xl`} />
                                  </button>
                                </Tooltip>
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
        <RecordModal
          type={type}
          isOpen={isOpen}
          setOpen={setIsOpen}
          record={record}
          setRecord={setRecord}
          setIsCompleted={setIsCompleted}
        />
      </div>
    </AdminLayout>
  );
};
export default RecordPage;
