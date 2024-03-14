import { HiTicket, HiClipboardList, HiOutlineCollection, HiHome, HiCreditCard } from "react-icons/hi";

import manage_booking from "../../../assets/sidebar/manage_booking.svg"
import manage_bus from "../../../assets/sidebar/manage_bus.svg"
import manage_member from "../../../assets/sidebar/manage_member.svg"
import manage_route from "../../../assets/sidebar/manage_route.svg"
import manage_schedule from "../../../assets/sidebar/manage_schedule.svg"
import manage_ticket from "../../../assets/sidebar/manage_ticket.svg"
import dashboard from "../../../assets/sidebar/dashboard.svg"
import history from "../../../assets/sidebar/history.svg"
import home from "../../../assets/sidebar/home.svg"
import schedule from "../../../assets/sidebar/schedule.svg"

import type { Navigation } from "../../../models/navigation";
import { APPLICATION_URL } from "./applicationUrl";

export const navigationData: Navigation[] = [

  {
    title: "Home",
    url: APPLICATION_URL.HOME_URL,
    role: "user",
    src: home,
  },
  {
    title: "Schedule",
    url: APPLICATION_URL.SCHEDULE_URL,
    role: "user",
    src: schedule,
  },
  {
    title: "History",
    url: APPLICATION_URL.HISTORY_URL,
    role: "user",
    src: history,
  },

  {
    title: "Dashboard",
    url: APPLICATION_URL.DASHBOARD_URL,
    role: "admin",
    src: dashboard,
  },
  {
    title: "Manage Schedule",
    url: APPLICATION_URL.MANAGE_SCHEDULE_URL,
    role: "admin",
    src: manage_schedule,
  }, {
    title: "Manage Booking",
    url: APPLICATION_URL.MANAGE_BOOKING_URL,
    role: "admin",
    src: manage_booking,
  }, {
    title: "Manage Bus",
    url: APPLICATION_URL.MANAGE_BUS_URL,
    role: "admin",
    src: manage_bus,
  }, {
    title: "Manage Member",
    url: APPLICATION_URL.MANAGE_MEMBER_URL,
    role: "admin",
    src: manage_member,
  }, {
    title: "Manage Ticket",
    url: APPLICATION_URL.MANAGE_TICKET_URL,
    role: "admin",
    src: manage_ticket,
  },
  {
    title: "Manage Route",
    url: APPLICATION_URL.MANAGE_ROUTE_URL,
    role: "admin",
    src: manage_route,
  },
];
