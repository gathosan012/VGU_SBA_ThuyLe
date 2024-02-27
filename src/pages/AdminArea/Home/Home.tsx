import type { FC} from "react";
import { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminArea/AdminLayout";
import { Label } from "flowbite-react";
import { getStation } from "../../../services/stationService";
import type { Station } from "../../../models/UserArea/station"
import { getTickets } from "../../../services/ticketsService";
import type { Ticket } from "../../../models/UserArea/tickets";

const HomePage: FC =  () => {

    const [start, setStart] = useState<string>('')
    const [end, setEnd] = useState<string>('')
    const [stations, setStations] = useState<Station[]>([])
    const [tickets, setTickets] = useState<Ticket[]>([])

    // const [schedules, setSchedules] = useState<Schedules>
    

    const handleChange = (s: string) => {
        setStart(s)
    }
    const handleChanges = (e: string) =>{
        setEnd(e)
    }

    // const searchHandle = async () => {
    //     const date = dateRef.current.value;

    //     const response = await getSchedules();
    //     setStations(response.data)
    // }

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

    const handleTickets = async () => {
        // Loading.hourglass();
        try {
            const response = await getTickets();
            setTickets(response.data)
        } catch (t) {
            console.log(t)
        }
    }

    useEffect(() => {
        handleTickets();
    }, [])

    return (
    <AdminLayout isFooter={false}>
      <div className="px-4 pt-2">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-5 gap-y-8 overflow-hidden rounded border-t border-gray-200 pt-10 shadow-lg sm:mt-12 sm:pt-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <div className="px-6 py-4">
                <Label htmlFor="start">Search your start</Label>
                <select id="start" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
                    value={start}
                    onChange={s => handleChange(s.target.value)}>
                    <option selected>Choose your start </option>
                    {
                        stations.map((s,id) => {
                            return(
                                <option key={id} value={s.id}>{s.stationName}</option>
                            )
                        })
                    }
                </select>
            </div>

            <div className="px-6 py-4">
                <Label htmlFor="start">Search your destination</Label>
                <select id="start" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
                    value={end}
                    onChange={e => handleChanges(e.target.value)}>
                    <option selected>Choose your destination </option>
                    {
                        stations.map((dx, id) => {
                            return(
                                <option key={id} value={dx.id}>{dx.stationName}</option>
                            )
                        })
                    }
                </select>
            </div>

            <div className="px-6 py-4">
                <label htmlFor="date"> Search your date</label>
                <div>
                    <input type="date" className=" rounded-md"/> 
                </div>
            </div>

            <div className="flex justify-center p-2">
                <button type="button"
                    className="inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    data-te-ripple-init
                    data-te-ripple-color="light">
                    Search
                </button>
            </div>
            
        </div>

        <div className="grid grid-cols-1 gap-x-5 gap-y-8 overflow-hidden rounded border-t pt-4 shadow-lg sm:mt-4 sm:grid-cols-2 sm:pt-4  lg:mx-0 lg:max-w-none lg:grid-cols-4">
            <div className="mx-4 mb-4 min-h-24 rounded-lg bg-white py-3 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                <a href="#!">
                    <img className="max-h-16 rounded-t-lg object-fill" src="https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg" alt="" />
                </a>
                <div className="divide-y-2 p-6">
                    {
                        tickets.map((t,id) => {
                            return(
                                <div key={id}>
                                    <div className="flex">
                                        <h5 className="mb-2 text-xl font-medium leading-tight">Start :{t.startStation.stationName} </h5>
                                        <h5 className="mb-2 text-xl font-medium leading-tight">End :{t.endStation.stationName} </h5>
                                    </div>
                        
                                    <div className="flex justify-between">
                                        <h5 className="mb-2 text-xl font-medium leading-tight">Type: {t.ticketType.name} </h5>
                                        <h5 className="mb-2 text-xl font-medium leading-tight">Fees {t.totalPrice}</h5>
                                    </div>

                                    <div className="grid">
                                        <h5 className="mb-2 text-xl font-bold leading-tight">Date: {t.schedule.date}</h5>
                                        <h5 className="mb-2 text-xl font-medium leading-tight">Time:</h5>
                                    </div>
                    
                                    <button type="button"
                                    className="inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                    data-te-ripple-init
                                    data-te-ripple-color="light">
                                    Buy
                                    </button>
                                </div>
                                
                            )
                        })
                    }
                    
                </div>
            </div>

            
        </div>
      </div>
    </AdminLayout>
  );
};

export default HomePage;