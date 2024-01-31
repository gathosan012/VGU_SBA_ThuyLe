import { HiOutlineDocument, HiUsers, HiDocumentSearch } from "react-icons/hi";
import { Navigation } from "../../../models/navigation";
import { APPLICATION_URL } from "./applicationUrl";

export const navigationData: Navigation[] = [
    {
        icon: HiOutlineDocument,
        title: "Record Management",
        url: APPLICATION_URL.RECORD_URL
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
]