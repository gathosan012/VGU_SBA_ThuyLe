import {
  HiOutlineDocument,
  HiUsers,
  HiDocumentSearch,
  HiClipboardList,
} from "react-icons/hi";
import { type Navigation } from "../../../models/navigation";
import { APPLICATION_URL } from "./applicationUrl";

export const navigationData: Navigation[] = [
  {
    icon: HiOutlineDocument,
    title: "Record Management",
    url: APPLICATION_URL.RECORD_URL,
  },

  {
    icon: HiClipboardList,
    title: "Schedule",
    url: APPLICATION_URL.SCHEDULE_URL,
  },
  // {
  //     icon: HiUsers,
  //     title: "Staff Management",
  //     url: APPLICATION_URL.STAFF_URL
  // },
  // {
  //     icon: HiDocumentSearch,
  //     title: "File Management",
  //     url: APPLICATION_URL.FILE_URL
  // }
];
