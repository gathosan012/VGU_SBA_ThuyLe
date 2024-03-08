import type { FormEvent } from "react";
import { useState, type FC, useEffect } from "react"
import AdminLayout from "../../../layouts/AdminArea/AdminLayout"
import { Label } from "flowbite-react"
import { searchTicketPagination } from "../../../services/ticketsService"
import { Link } from "react-router-dom"
import type { Station } from "../../../models/UserArea/station";
import { getStation } from "../../../services/stationService";
import ReactDatePicker from "react-datepicker";
import CustomButton from "../../../components/CustomButton";
import CustomTimeline from "../../../components/CustomTimeline";
import CustomTag from "../../../components/CustomTag";
import type { Schedule } from "../../../models/UserArea/schedule";


const SchedulePage: FC = () => {


    const [start, setStart] = useState<string>('')
    const [startID, setStartID] = useState<number>(1)
    const [end, setEnd] = useState<string>('')
    const [endID, setEndID] = useState<number>(1)

    const [stations, setStations] = useState<Station[]>([])
    const [searchResult, setSearchResult] = useState<Schedule[]>([])
    const [selectDate, setSelectDate] = useState<string>()


    const handleChange = (s: string) => {
        setStart(s)
    }
    const handleChanges = (e: string) =>{
        setEnd(e)
    }

    const handleDateChange = (date: Date | null) => {
        if (date) 
        {
            const year = date.getFullYear().toString();
            const month = (date.getMonth() +1).toString().padStart(2, "0")
            const day = date.getDate().toString().padStart(2, "0")
            const formatDate = `${year}-${month}-${day}`
            setSelectDate(formatDate)
            console.log("Selected Date:", formatDate)
        } else {
            console.log("Please select date")
        }
    } 

    // -----call Station----- 
    const handleStation = async () =>{
        // Loading.hourglass();
        try {
            const response = await getStation();
            setStations(response.data)
        } catch (s) {
            console.error(s)
        }
    }

    useEffect(() =>{
        handleStation();
    }, [])


    const Submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await SearchResult(startID,endID, selectDate );
    }

    const SearchResult = async (startID?:number, endID?:number, searchString?: string) => {
        try {
            // Loading.hourglass()
            const res = await searchTicketPagination(startID ?? null , endID ?? null, searchString ?? null);
            console.log(res);
            
            setSearchResult(res);
            }
         catch (e) {
            console.error(e)
        }
    }

    useEffect(() =>{
        SearchResult();
    },[])


    return(
        <AdminLayout isFooter={true}>
            <div className="px-4 pt-2">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-8 overflow-hidden rounded border-t border-gray-200 pb-4 pt-10 shadow-lg sm:mt-12 sm:pt-12 lg:mx-0 lg:max-w-none">
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
                                                <option key={id} value={st.id} >{st.stationName}+{st.id}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className="px-6 py-4">
                                <Label htmlFor="start">Search your destination</Label>
                                <select id="destination" name="end" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
                                    value={end}
                                    onChange={e => {handleChanges(e.target.value); setEndID(+e.target.value); console.log(e.target.value) }}>
                                    <option selected>Choose your destination </option>
                                    {
                                        stations.map((dx, id) => {
                                            return(
                                                <option key={id} value={dx.id} >{dx.stationName}+{dx.id}</option>
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

                    <div className="justify-center rounded border-t border-gray-200 px-2 py-4 ">
                        {
                            searchResult.map((t,id) => {
                                return(
                                    <div key={id} className="mb-5 grid grid-cols-1 justify-between gap-x-10 divide-x-2 rounded-lg bg-white shadow-lg md:mb-5 lg:mx-24 lg:my-10 lg:grid-cols-2 lg:flex-row">
                                        <div className="ml-5 mr-auto flex gap-x-4 px-3 py-4">
                                            <CustomTimeline data={[{time:t.departureTime, station:t.createdBy},{time:t.arrivalTime, station:t.createdTime}]}></CustomTimeline>

                                        </div>

                                        <div className="grid justify-center gap-y-4 py-10  lg:ml-32 xl:ml-40">
                                            <CustomTag color={"red"} content={"Full"}></CustomTag>
                                            <Link to={`/ticket-details/${t.id}`}>
                                                <CustomButton type="filled" content="Buy Ticket" shape={""}>
                                                    Buy
                                                </CustomButton>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            }) 
                        }
                        
                        <div className="p-2 text-center ">
                            <span>No more result</span>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default SchedulePage