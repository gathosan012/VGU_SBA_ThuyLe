import * as httpRequest from "../utils/httpRequest";
import authHeader from "../utils/authHeader";
import type { HttpResponse } from "../models/httpResponse";
import type { Record } from "../models/record";

export const resendEmail = async (record: Record) => {
  const res: HttpResponse = await httpRequest.post(`mails`, record, {
    headers: authHeader(),
  });
  return { data: res, status: 200 };
};
