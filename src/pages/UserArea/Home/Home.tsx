import type { FC, FormEvent } from "react";
import { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/Layout";
import { Label } from "flowbite-react";
import { getStation } from "../../../services/stationService";
import type { Station } from "../../../models/UserArea/station"
import { getTickets, searchTicketPagination } from "../../../services/ticketsService";
import type { Ticket } from "../../../models/UserArea/tickets";
import { Link } from "react-router-dom";
import ReactDatePicker from "react-datepicker";
import { Loading } from "notiflix";
import images from "../../../assets/images/1.jpg";
import CustomButton from "../../../components/CustomButton";


const HomePage: FC = () => {

    const [start, setStart] = useState<string>('')
    const [startID, setStartID] = useState<number>(1)
    const [end, setEnd] = useState<string>('')
    const [endID, setEndID] = useState<number>(1)

    const [stations, setStations] = useState<Station[]>([])
    const [tickets, setTickets] = useState<Ticket[]>([])
    const [searchResult, setSearchResult] = useState<Ticket[]>([])
    const [selectDate, setSelectDate] = useState<string>()

    const handleChange = (s: string) => {
        setStart(s)
    }
    const handleChanges = (e: string) => {
        setEnd(e)
    }

    const handleDateChange = (date: Date | null) => {
        if (date) {
            const year = date.getFullYear().toString();
            const month = (date.getMonth() + 1).toString().padStart(2, "0")
            const day = date.getDate().toString().padStart(2, "0")
            const formatDate = `${year}-${month}-${day}`
            setSelectDate(formatDate)
            console.log("Selected Date:", formatDate)
        } else {
            console.log("Please select date")
        }
    }


    // -----call Station----- 
    const handleStation = async () => {
        // Loading.hourglass();
        try {
            const response = await getStation();
            setStations(response.data)
        } catch (s) {
            console.error(s)
        }
    }

    useEffect(() => {
        handleStation();
    }, [])


    // -----call Ticket-----
    const handleTickets = async () => {
        // Loading.hourglass();
        try {
            const response = await getTickets();
            setTickets(response.data)
        } catch (t) {
            console.error(t)
        }
    }

    useEffect(() => {
        handleTickets();
    }, [])

    const Submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        SearchResult(startID, endID, selectDate)
    }

    const SearchResult = async (startID?: number, endID?: number, searchString?: string) => {
        try {
            // Loading.hourglass()
            const res = await searchTicketPagination(startID ?? null, endID ?? null, searchString ?? null)
            setSearchResult(res.data);
        }
        catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        SearchResult();
    }, [])

    return (
        <AdminLayout isFooter={true}>
            <div className="px-4 pt-2">
                <div className=" rounded border-t border-gray-200 shadow-lg">
                    <form onSubmit={(e) => Submit(e)}>
                        <div className="grid grid-cols-1 gap-x-5 gap-y-8 overflow-hidden lg:grid-cols-3">
                            <div className="px-6 py-4">
                                <Label htmlFor="start">Search your start</Label>
                                <select id="start" name="start" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
                                    value={start}
                                    onChange={(s) => {handleChange(s.target.value); setStartID(+s.target.value);}}>
                                    <option selected>Choose your start </option>
                                    {
                                        stations.map((st,id) => {
                                            return(
                                                <option key={id} value={st.id} >{st.stationName}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className="px-6 py-4">
                                <Label htmlFor="start">Search your destination</Label>
                                <select id="destination" name="end" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
                                    value={end}
                                    onChange={e => {handleChanges(e.target.value); setEndID(+e.target.value)}}>
                                    <option selected>Choose your destination </option>
                                    {
                                        stations.map((dx, id) => {
                                            return(
                                                <option key={id} value={dx.id} >{dx.stationName}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className="px-6 py-4">
                                <Label htmlFor="date"> Search your date</Label>
                                <div>
                                    <ReactDatePicker selected={selectDate ? new Date(selectDate) : null} onChange={(date) => handleDateChange(date) } dateFormat="yyyy-MM-dd" title="Flowbite Datepicker" className=" rounded-md" /> 
                                
                                </div>
                            </div>
                        </div>
                    
                        <div className="flex justify-center p-2">
                        <CustomButton content="Search" type="filled" onClick={(e) => Submit(e)} shape={""} />
                        </div>
                    </form>
                </div>

                

                <div className="mx-auto grid max-w-2xl grid-cols-1 divide-y-4 divide-red-500 overflow-hidden rounded border-t border-gray-200 pt-10 shadow-lg sm:mt-12 sm:pt-12 lg:mx-0 lg:max-w-none">
                    <div className="p-2">
                        <span className="text-lg font-bold">Popular plans</span>
                    </div>

                    <div className="mx-auto grid grid-cols-1 gap-x-5 gap-y-8 overflow-hidden rounded border-t border-gray-200 shadow-lg sm:mt-12 sm:pt-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        <div className="mx-4 mb-4 min-h-24 rounded-lg bg-white py-3 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                            <div className="grid text-left">
                                <span>Single Ticket</span>
                                <span>Price / ticket</span>
                            </div>

                            <div className="my-4 grid justify-center">
                                <img src={images} alt="images" className="mb-4"></img>
                                <CustomButton type="filled" content="Buy">
                                </CustomButton>
                            </div>

                        </div>

                        <div className="mx-4 mb-4 min-h-24 rounded-lg bg-white py-3 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                            <div className="grid text-left">
                                <span>Daily Ticket</span>
                                <span>Price / ticket</span>
                            </div>

                            <div className="my-4 grid justify-center">
                                <img src={images} alt="images" className="mb-4"></img>
                                <CustomButton type="filled" content="Buy">
                                </CustomButton>
                            </div>

                        </div>

                        <div className="mx-4 mb-4 min-h-24 rounded-lg bg-white py-3 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                            <div className="grid text-left">
                                <span>Monthly Ticket</span>
                                <span>Price / ticket</span>
                            </div>

                            <div className="my-4 grid justify-center">
                                <img src={images} alt="images" className="mb-4"></img>
                                <CustomButton type="filled" content="Buy">
                                </CustomButton>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default HomePage;


