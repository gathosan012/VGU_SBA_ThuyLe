import { useState, useEffect, type FC } from "react"
import AdminLayout from "../../../layouts/AdminArea/AdminLayout"
import "tw-elements-react/dist/css/tw-elements-react.min.css"
import { TECollapse, TERipple } from "tw-elements-react"
import img from "../../../assets/images/1.jpg"
import type { Ticket } from "../../../models/UserArea/tickets"
import { getTickets } from "../../../services/ticketsService"
import type { User } from "../../../models/UserArea/user"
import { getUser } from "../../../services/userService"
const TicketDetailsPage: FC = () => {

    const [tickets, setTickets] = useState<Ticket[]>([]) 
    const [user,setUser] = useState<User[]>([])
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

    const handleUser = async () => {
        try {
            const response = await getUser();
            setUser(response.data)
        } catch (u) {
            console.log(u)
        }
    }

    useEffect(() =>{
        handleUser();
    })


    return(
        <AdminLayout isFooter={false}>
            <div className="px-4 pt-2">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-5 gap-y-8 overflow-hidden rounded border-t border-gray-200 pb-4 pt-10 shadow-lg sm:mt-12 sm:pt-12 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="px-6 py-4">
                        <img src={img} alt="images"/>
                        
                        {
                            tickets.map((t,id) => {
                                return(
                                    <div key={id}>
                                        <div className="flex justify-between p-2">
                                            <div className="text-sm text-gray-700">From {t.startStation.stationName}</div>
                                            <div className="text-sm text-gray-700">To{t.endStation.stationName}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        

                        <div className="p-2">
                            <TERipple rippleColor="light">
                                <div className="relative inline-block text-left">
                                    <div>
                                        <button onClick={toggleShow} type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Station</button>
                                    </div>

                                </div>
                            </TERipple>
                            <TECollapse show={show}>
                                <div className="block w-[400px] rounded-lg bg-white p-6 shadow-lg">
                                    <div className="py-1" role="none">
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700" >Account settings</a>
    "                               <a href="#" className="block px-4 py-2 text-sm text-gray-700" >Account settings</a>
                                    </div>
                                </div>
                            </TECollapse>
                        </div>
                        {
                            tickets.map((t,id) =>{
                                return(
                                    <div key={id}>
                                        <div className="grid p-2 ">
                                            <div className="text-sm text-gray-900">Date: {t.schedule.date}</div>
                                            <div className="text-sm text-gray-900">Time: {t.schedule.departureTime}</div>
                                        </div> 
                                    </div>
                                )
                            })
                        }
                          
                    </div>

                    <div className="grid gap-y-4 px-6 py-4">
                       <div className="p-2">
                            <span className=" text-gray-900">Payment Information</span>
                       </div>

                        {
                            user.map((u,id) => {
                                return(
                                    <div key={id} className="p-2">
                                        <span className="py-2 text-gray-900">Buyer Information</span>

                                        <div className="flex justify-between py-2">
                                            <span className="ml-2 text-gray-700">Email</span>
                                            <h5>{u.email}</h5>
                                        </div>

                                        <div className="ml-2 flex justify-between ">
                                            <span className="text-gray-700">Your Name</span>
                                            <h5>{u.fullname}</h5>
                                        </div>
                                    </div>
                                )
                            })
                        }
                       
                       
                       <div className="flex justify-between p-2">
                            <span className="text-gray-900">Total</span>
                            <span className="text-gray-900">Call API here</span>
                       </div>

                        <button className=" inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                            data-te-ripple-init
                            data-te-ripple-color="light">
                            Proceed to payment
                        </button>
                    </div>

                </div>
            </div>
        </AdminLayout>
    )
}

export default TicketDetailsPage