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


const HomePage: FC = () => {

    const [start, setStart] = useState<string>('')
    const [startID, setStartID] = useState<number>(1)
    const [end, setEnd] = useState<string>('')
    const [endID, setEndID] = useState<number>(1)

    const [stations, setStations] = useState<Station[]>([])
    const [tickets, setTickets] = useState<Ticket[]>([])
    const [searchResult, setSearchResult] = useState<Ticket[]>([])
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
            <div className="relative">
                <img src={HeroImage} alt="Hero"></img>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 grid grid-cols-1 items-center justify-center px-4 pt-2">
                    <div className="rounded border-t pt-8 bg-white border-gray-200 shadow-lg" title="search section">
                        <div className="grid grid-cols-1 items-center lg:grid-cols-3 " title="input section">
                            <div className="px-6 py-4">
                                <CustomDropdown
                                    label="Departure stop"
                                    options={stations.map(st => st.stationName.valueOf())}
                                    value={start}
                                    onChange={handleStartChange}
                                    initial="Choose your start"
                                />
                            </div>

                            <div className="px-6 py-4">
                                <CustomDropdown
                                    label="Arrival stop"
                                    options={stations.map(st => st.stationName.valueOf())}
                                    value={end}
                                    onChange={handleEndChange}
                                    initial="Choose your end"
                                />
                            </div>

                            <div className="px-6 py-4">
                                <CustomDatePicker selectedDate={selectDate ? new Date(selectDate) : null} onChange={(date) => handleDateChange(date)} label="Date" />
                            </div>
                        </div>
                        <div className="flex justify-center pt-2 pb-8">
                            <CustomButton content="Search" type="filled" onClick={(e) => Submit(e)} shape={""} />
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default HomePage;
