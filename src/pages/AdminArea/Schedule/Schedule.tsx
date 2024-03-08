import { useState, type FC, useEffect } from "react"
import AdminLayout from "../../../layouts/Layout"
import { Label } from "flowbite-react"
import img from "../../../assets/images/1.jpg"
import type { Ticket } from "../../../models/UserArea/tickets"
import { getTickets } from "../../../services/ticketsService"
import { Link } from "react-router-dom"


const SchedulePage: FC = () => {

    const [ticket, setTicket] = useState<Ticket[]>([])

    const handleTicket = async () => {
        try {
            const response = await getTickets();
            setTicket(response.data)
        } catch (t) {
            console.error(t)
        }
    }

    useEffect(() => {
        handleTicket();
    }, [])


    return (
        <AdminLayout isFooter={false}>
            <div className="px-4 pt-2">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-5 gap-y-8 overflow-hidden rounded border-t border-gray-200 pt-10 shadow-lg sm:mt-12 sm:pt-12 lg:mx-0 lg:max-w-none">
                    <div className="pt-1 text-center ">
                        <Label className="font-semibold" htmlFor="pick-date">Choose the day</Label>

                        <div className="cursor-pointer py-2 text-center">
                            {
                                ticket.map((t, id) => {
                                    return (
                                        <div key={id}>{t.schedule.date}</div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className="mx-auto max-w-2xl rounded border-t border-gray-200 px-2 py-4 lg:mx-0 lg:max-w-none">

                        {
                            ticket.map((t, id) => {
                                return (
                                    <div key={id}>
                                        <img src={img} alt="images" className="max-h-10 w-max object-fill" />
                                        <div className="mx-auto flex w-max justify-between gap-x-4 px-3 py-4">
                                            <div className="mx-auto grid min-w-40 pt-1">
                                                <h5>TimeStart: {t.schedule.departureTime}</h5>
                                                <span>Station: {t.startStation.stationName}</span>
                                            </div>

                                            <div className="mx-auto grid min-w-40 pt-1">
                                                <h5>TimeEnd: {t.schedule.arrivalTime}</h5>
                                                <span>Station: {t.endStation.stationName}</span>
                                            </div>

                                            <div className="grid min-w-40 text-right">
                                                <span>Type: {t.ticketType.name}</span>
                                                <h5>Fees: {t.totalPrice}</h5>
                                            </div>

                                            <button className=" inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                                data-te-ripple-init
                                                data-te-ripple-color="light">
                                                <Link to={`/ticket-details/${t.id}`}>Buy</Link>

                                            </button>
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