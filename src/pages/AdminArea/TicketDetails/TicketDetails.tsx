import { useState, useEffect, type FC } from "react"
import AdminLayout from "../../../layouts/Layout"
import "tw-elements-react/dist/css/tw-elements-react.min.css"
import { TECollapse, TERipple } from "tw-elements-react"
import img from "../../../assets/images/1.jpg"
import type { Ticket } from "../../../models/UserArea/tickets"
import { getTickets, postTickets } from "../../../services/ticketsService"
import type { User } from "../../../models/UserArea/user"
import { getUser } from "../../../services/userService"
const TicketDetailsPage: FC = () => {

    const [tickets, setTickets] = useState({} as Ticket)
    const [buy, setBuy] = useState<string>('')
    const [user, setUser] = useState<User[]>([])
    const [show, setShow] = useState(false)

    const toggleShow = () => setShow(!show)

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

    const handleBuyTickets = async () => {
        try {
            const response = await postTickets();
            setBuy(response.data)
        } catch (b) {
            console.log(b)
        }
    }

    useEffect(() => {
        handleBuyTickets();
    }, [])

    const handleUser = async () => {
        try {
            const response = await getUser();
            setUser(response.data)
        } catch (u) {
            console.log(u)
        }
    }

    useEffect(() => {
        handleUser();
    })


    return (
        <AdminLayout isFooter={false}>
            <div className="px-4 pt-2">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-5 gap-y-8 overflow-hidden rounded border-t border-gray-200 pb-4 pt-10 shadow-lg sm:mt-12 sm:pt-12 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div>
                        <div className="grid gap-y-4 px-6 py-4">
                            <div className="p-2">
                                <span className=" text-gray-900">Payment Information</span>
                            </div>
                            {
                                user.map((u, id) => {
                                    return (
                                        <div key={id} className="rounded border-t border-gray-200 p-2 shadow-lg">
                                            <span className="py-2 text-gray-900">Personal Details</span>

                                            <div className="ml-2 grid justify-between">
                                                <span className="text-gray-700">Your Name</span>
                                                <h5 className="inline-flex items-center rounded border bg-gradient-to-b shadow-md">{u.fullname}</h5>
                                            </div>

                                            <div className="ml-2 grid justify-between py-2 shadow-md">
                                                <span className="text-gray-700">Email</span>
                                                <h5 className="inline-flex items-center rounded border bg-gradient-to-b shadow-md">{u.email}</h5>
                                            </div>

                                        </div>
                                    )
                                })
                            }

                        </div>

                    </div>

                    <div className="px-6 py-4">
                        <img src={img} alt="images" />

                        {/* <div className="flex justify-between p-2">
                            <div className="text-sm text-gray-700">From {tickets.startStation.stationName}</div>
                            <div className="text-sm text-gray-700">To{tickets.endStation.stationName}</div>
                        </div> */}

                        {/* <div className="grid p-2 ">
                            <div className="text-sm text-gray-900">Date: {tickets.schedule.date}</div>
                            <div className="text-sm text-gray-900">Time: {tickets.schedule.departureTime}</div>
                        </div>  */}
                        <div className="flex justify-between p-2">
                            <span className="text-gray-900">Total</span>
                            <span className="text-gray-900">{tickets.totalPrice}</span>
                        </div>

                        <button
                            className="bg-blue-500 mr-4 rounded-lg px-6 py-3 font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            data-ripple-light="true"
                        >
                            Proceed to payment
                        </button>
                    </div>

                    <div className="p-2">
                        <TERipple rippleColor="light">
                            <div className="relative inline-block text-left">
                                <div>
                                    <button onClick={toggleShow} type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                        Station
                                    </button>
                                </div>

                            </div>
                        </TERipple>
                        <TECollapse show={show}>
                            <div className="block w-[400px] rounded-lg bg-white p-6 shadow-lg">
                                <div className="py-1" role="none">
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700" >Account settings</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700" >Account settings</a>
                                </div>
                            </div>
                        </TECollapse>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default TicketDetailsPage