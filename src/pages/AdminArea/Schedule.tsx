/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { type FC, useState, type FormEvent, useEffect } from "react";
import { Button, Pagination, Table, TextInput, Tooltip } from "flowbite-react";
import {
  HiPencil,
  HiPlus,
  HiSearch,
  HiStatusOnline,
  HiReply,
} from "react-icons/hi";

import AdminLayout from "../../layouts/AdminArea/AdminLayout";
import { HttpResponse } from "../../models/httpResponse";

/* import "./schedule.scss";
import { useTheme } from '@mui/material';
import {Box, ThemeProvider} from '@mui/material'; */
import { Link } from "react-router-dom";
import DataTableSchedule from "../../components/AdminArea/datatable/DatatableSchedule";
// import Sidebar from '../../../components/Sidebar/Sidebar';
import { motion } from "framer-motion";

const Schedule: FC = function () {
  /* //   const theme = useTheme();
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  }; */

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

  return (
    // <ThemeProvider theme={theme}>
    <div>
      <div className="background-container">
        <img
          src="/bg_vgu_campus.jpg"
          alt="background image"
          className="background-image"
        />
      </div>
      <div className="layout-container">
        <motion.div
          transition={{ type: "spring", stiffness: 100 }}
          animate={{ width: open ? "250px" : "50px" }}
          className="sidebar-container"
        >
          <Sidebar onToggleSidebar={toggle} />
        </motion.div>
        <div className="datatableschedule-container">
          <Link to="/schedule" style={{ textDecoration: "none" }}>
            <DataTableSchedule />
          </Link>
        </div>
      </div>
    </div>
    // </ThemeProvider>
  );
};

export default Schedule;
