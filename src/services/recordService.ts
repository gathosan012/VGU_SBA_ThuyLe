import type { Record } from "../models/record";
import * as httpRequest from "../utils/httpRequest";
import authHeader from "../utils/authHeader";
import type { HttpResponse } from "../models/httpResponse";
import { toStringDate } from "../utils/utilityFunctions";
import type { UserLogin } from "../models/AdminArea/user/user";
import { STORAGE } from "../utils/configs/storage";

export const getRecordByCode = async (code: string) => {
  const res: HttpResponse = await httpRequest.get(`records/code/${code}`);
  return res;
};

export const searchRecordPagination = async (
  start: number,
  limit: number,
  search?: string
) => {
  const res: HttpResponse = await httpRequest.get("records", {
    params: {
      start,
      limit,
      search,
    },
    headers: authHeader(),
  });
  return res;
};

export const getLdapUsers = async () => {
  const res: HttpResponse = await httpRequest.get("ldapusers", {
    headers: authHeader(),
  });
  return res;
};

export const createRecord = async (record: Record) => {
  const formData: FormData = new FormData();
  formData.append("uploadFile", record.uploadFile);
  formData.append("whMonthStart", toStringDate(record.whMonthStart));
  formData.append("whMonthEnd", toStringDate(record.whMonthEnd));
  formData.append("publishedDate", toStringDate(record.publishedDate));
  formData.append("seqNo", record.seqNo.toString());
  formData.append("serialNo", record.serialNo);
  formData.append("formNo", record.formNo);
  formData.append("description", record.description);
  formData.append(
    "createdUser",
    (record.createdUser as UserLogin).id.toString()
  );
  formData.append("email", record.staff.email);
  formData.append("firstname", record.staff.firstname);
  formData.append("lastname", record.staff.lastname);

  const res: HttpResponse = await httpRequest.post("records", formData, {
    headers: authHeader(),
  });
  return res;
};

export const updateRecord = async (record: Record) => {
  // let user = JSON.parse(sessionStorage.getItem(STORAGE.PIT_USER) as string);
  const user = JSON.parse(sessionStorage.getItem(STORAGE.PIT_ROLE)!); // update
  const updateRecord = {
    id: record.id,
    whMonthStart: toStringDate(record.whMonthStart),
    whMonthEnd: toStringDate(record.whMonthEnd),
    publishedDate: toStringDate(record.publishedDate),
    formNo: record.formNo,
    description: record.description,
    updatedUser: user.id,
  };
  const res: HttpResponse = await httpRequest.put("records", updateRecord, {
    headers: authHeader(),
  });

  return res;
};

export const download = async (path: string) => {
  const res = await httpRequest.post(
    "records/download",
    { path },
    { responseType: "blob" }
  );
  return res;
};

export const publishRecord = async (id: number) => {
  const res = await httpRequest.put(
    `records/publish/${id}`,
    {},
    {
      headers: authHeader(),
    }
  );
  return res;
};

export const withdrawRecord = async (id: number) => {
  const res = await httpRequest.put(
    `records/withdraw/${id}`,
    {},
    { headers: authHeader() }
  );
  return res;
};
