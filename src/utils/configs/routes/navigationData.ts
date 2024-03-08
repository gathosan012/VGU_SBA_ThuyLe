import { HiTicket, HiClipboardList, HiOutlineDocument, HiOutlineCollection, HiHome, HiCreditCard } from "react-icons/hi";
import type { Navigation } from "../../../models/navigation";
import { APPLICATION_URL } from "./applicationUrl";

export const navigationData: Navigation[] = [
  {
    icon: HiOutlineDocument,
    title: "Record Management",
    url: APPLICATION_URL.RECORD_URL,
  },

  {
    icon: HiHome,
    title: "Home",
    url: APPLICATION_URL.HOME_URL,
  },
  {
    icon: HiOutlineCollection,
    title: "Schedule",
    url: APPLICATION_URL.SCHEDULE_URL,
  },
  {
    icon: HiClipboardList,
    title: "History",
    url: APPLICATION_URL.HISTORY_URL,
  },
  {
    icon: HiTicket,
    title: "Ticket Details",
    url: APPLICATION_URL.TICKETDETAILS_URL,
  },

  {
    icon: HiCreditCard,
    title: "Payment",
    url: APPLICATION_URL.PAYMENT_URL,
  },

  {
    icon: HiClipboardList,
    title: "Schedule",
    url: APPLICATION_URL.MANAGE_SCHEDULE_URL,
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
