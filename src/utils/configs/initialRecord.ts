import { STORAGE } from "./storage";
import { Record } from "../../models/record";

export const initRecord = {
  staff: {
    email: "",
    firstname: "",
    lastname: "",
  },
  description: "",
  createdUser: JSON.parse(sessionStorage.getItem(STORAGE.PIT_USER) as string),
  publishedDate: new Date(),
  seqNo: 1,
  formNo: "",
  serialNo: "",
} as Record;
