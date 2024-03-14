import type { FC, FormEvent } from "react";
import { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/Layout";
import { getStation } from "../../../services/stationService";
import type { Station } from "../../../models/UserArea/station"
import { getTickets, searchTicketPagination } from "../../../services/ticketsService";
import type { Ticket } from "../../../models/UserArea/tickets";
import HeroImage from "../../../assets/images/HeroImage.png";
import CustomButton from "../../../components/CustomButton";
import CustomDropdown from "../../../components/CustomDropdown";
import CustomDatePicker from "../../../components/CustomDatePicker/CustomDatePicker";
import type { Schedule } from "../../../models/UserArea/schedule";


const HomePage: FC = () => {

    const [start, setStart] = useState<string>('')
    const [startID, setStartID] = useState<number>(1)
    const [end, setEnd] = useState<string>('')
    const [endID, setEndID] = useState<number>(1)

    const [stations, setStations] = useState<Station[]>([])
    const [tickets, setTickets] = useState<Ticket[]>([])
    const [searchResult, setSearchResult] = useState<Schedule[]>([])
    const [selectDate, setSelectDate] = useState<string>()

    const handleStartChange = (value: string) => {
        setStart(value);
        setStartID(+value); // Convert to number
    };

    const handleEndChange = (value: string) => {
        setEnd(value);
        setEndID(+value); // Convert to number
    };

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
            setSearchResult(res);
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
            <div className="relative">
                <img src={HeroImage} alt="Hero" className="h-1/2 w-full object-cover"></img>
                <div className="absolute left-1/2 grid w-11/12 -translate-x-1/2 -translate-y-1/2 transform grid-cols-1 items-center justify-center px-4 pt-2 pt-56 lg:top-1/2">
                    <div className="flex flex-col items-center justify-center rounded border-t border-gray-200 bg-white pt-8 shadow-lg" title="search section">
                        <div className="grid w-2/3 grid-cols-1 items-center justify-center lg:w-full lg:grid-cols-3 " title="input section">
                            <div className="flex grow  items-center justify-center px-6 py-4">
                                <CustomDropdown
                                    label="Departure stop"
                                    options={stations.map(st => st.stationName.valueOf())}
                                    value={start}
                                    onChange={handleStartChange}
                                    initial="Choose your start"
                                />
                            </div>

                            <div className="flex grow  items-center justify-center px-6 py-4">
                                <CustomDropdown
                                    label="Arrival stop"
                                    options={stations.map(st => st.stationName.valueOf())}
                                    value={end}
                                    onChange={handleEndChange}
                                    initial="Choose your end"
                                />
                            </div>

                            <div className="flex grow items-center justify-center px-6 py-4">
                                <CustomDatePicker selectedDate={selectDate ? new Date(selectDate) : null} onChange={(date) => handleDateChange(date)} label="Date" />
                            </div>
                        </div>
                        <div className="flex justify-center pb-8 pt-2">
                            <CustomButton content="Search" type="filled" onClick={(e) => Submit(e)} shape={""} />
                        </div>
                    </div>
                </div>

            </div>
            <div className="h-screen"></div>
        </AdminLayout>
    );
};

export default HomePage;
