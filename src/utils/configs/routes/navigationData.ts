import { HiTicket, HiClipboardList, HiOutlineDocument, HiOutlineCollection, HiHome, HiCreditCard } from "react-icons/hi";
import type { Navigation } from "../../../models/navigation";
import { APPLICATION_URL } from "./applicationUrl";

export const navigationData: Navigation[] = [

  {
    icon: HiHome,
    title: "Home",
    url: APPLICATION_URL.HOME_URL,
    role: "user"
  },
  {
    icon: HiOutlineCollection,
    title: "Schedule",
    url: APPLICATION_URL.SCHEDULE_URL,
    role: "user",
  },
  {
    icon: HiClipboardList,
    title: "History",
    url: APPLICATION_URL.HISTORY_URL,
    role: "user",
  },
  {
    icon: HiTicket,
    title: "Ticket Details",
    url: APPLICATION_URL.TICKETDETAILS_URL,
    role: "user",
  },

  {
    icon: HiCreditCard,
    title: "Payment",
    url: APPLICATION_URL.PAYMENT_URL,
    role: "user",
  },

  {
    icon: HiClipboardList,
    title: "Manage Schedule",
    url: APPLICATION_URL.MANAGE_SCHEDULE_URL,
    role: "admin",
  },
];
