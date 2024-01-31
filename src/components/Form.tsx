import { Table, Tooltip } from "flowbite-react";
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { FormEvent, useEffect, useState } from "react";


import { HttpResponse } from "../models/httpResponse";
import { Record } from "../models/record";
import { download, getRecordByCode } from "../services/recordService";
import { toStringDate, toStringTime } from "../utils/utilityFunctions";

import { HiCloudDownload, HiEye } from "react-icons/hi";
import { NOTIFY } from "../utils/configs/notify";
import { RES_CODE } from "../utils/configs/statusCode";



function Form() {
  const [text, setText] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [fileURL, setFileURL] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fileResult, setFileResult] = useState<Record>({} as Record);



  const [isOpen, setIsOpen] = useState<boolean>(false);

  const SubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const res: HttpResponse = await getRecordByCode(text);
      if (res.resCode === RES_CODE.OK) {
        setFileResult({ ...res.payload });
        let path = res.payload.file.path;
        await download(path).then((response) => {
          const url = window.URL.createObjectURL(new Blob([response]));
          setFileURL(url);
          setIsLoading(false);
        })
      }
      else {
        setIsError(true);
        setIsLoading(false);
      }
    } catch (e) {
      Notify.failure(NOTIFY.SERVER_ERROR);
      setIsLoading(false);
    }
  };


  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = fileURL;
    link.setAttribute('download', fileResult.file.name);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  useEffect(() => {
    if (isLoading)
      Loading.hourglass();
    else
      Loading.remove();
  }, [isLoading]);

  useEffect(() => {
    if (isError)
      Notify.failure(NOTIFY.CODE_INVALID);
  }, [isError]);

  return (
    <div>
      <form action="" className="py-5" onSubmit={(e) => SubmitForm(e)}>
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-[90%] md:w-[65%] mb-0 md:-mb-[29px]">
            <input
              type="text"
              value={text}
              onChange={(e) => { setText(e.target.value.toUpperCase()); setIsError(false) }}
              className={`${isError ? "border-red-600" : "border-gray-500"
                } select-all w-full placeholder:text-gray-500 rounded-full py-3 px-6 mb-7 bg-transparent dark:text-white`}
              placeholder="Your Tax File Code..."
            />
          </div>
          <button
            type="submit"
            disabled={text.length === 0}
            className="w-[90%] md:w-[30%] py-3 px-6 bg-blue text-white 
              hover:opacity-70 rounded-full mx-auto shadow-xl 
              shadow-light-blue disabled:bg-gray-400"
          >
            View
          </button>
        </div>
      </form>
      {fileURL && (
        <>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>
                File name
              </Table.HeadCell>
              <Table.HeadCell>
                Owner
              </Table.HeadCell>
              <Table.HeadCell>
                Created
              </Table.HeadCell>
              <Table.HeadCell>
                Action
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              <Table.Row className="text-base font-semibold text-gray-900 dark:text-white">
                <Table.Cell>
                  <div className="text-base font-semibold text-gray-900 dark:text-white">
                    {fileResult.file.name}
                  </div>
                  <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    {(fileResult.file.size / (1024 * 1000)).toFixed(2)} MB
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="text-base font-semibold text-gray-900 dark:text-white">
                    {fileResult.staff.firstname} {fileResult.staff.lastname}
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="text-base font-semibold text-gray-900 dark:text-white">
                    {toStringDate(fileResult.createdDate as Date)}
                  </div>
                  <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    {toStringTime(fileResult.createdDate as Date)}
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center justify-items-center gap-x-3 whitespace-nowrap">
                    <Tooltip content="Preview">
                      <HiEye className="text-xl action-btn cursor-pointer" onClick={() => setIsOpen(true)} />
                    </Tooltip>
                    <Tooltip content="Download">
                      <HiCloudDownload className="text-xl action-btn cursor-pointer" onClick={handleDownload} />
                    </Tooltip>
                  </div>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </>
      )}

    </div>
  );
}

export default Form;
