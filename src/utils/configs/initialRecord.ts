import { STORAGE } from "./storage";
import type { Record } from "../../models/record";

export const initRecord = {
  staff: {
    email: "",
    firstname: "",
    lastname: "",
    description: "",
    createdUser: JSON.parse(sessionStorage.getItem(STORAGE.SBA_USER) as string),
    // createdUser: JSON.parse(sessionStorage.getItem(STORAGE.PIT_USER) as string),
    role: sessionStorage.getItem(STORAGE.SBA_ROLE)!, // update
    publishedDate: new Date(),
    seqNo: 1,
    formNo: "",
    serialNo: "",
  }
} as Record;
