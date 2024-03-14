import { useState, useEffect, type FC } from "react"
import AdminLayout from "../../../layouts/Layout"
import "tw-elements-react/dist/css/tw-elements-react.min.css"
import img from "../../../assets/images/1.jpg"
import type { Ticket } from "../../../models/UserArea/tickets"
import { getTickets } from "../../../services/ticketsService"
import type { User } from "../../../models/UserArea/user"
import { getUser } from "../../../services/userService"
import { STORAGE } from "../../../utils/configs/storage"
import CustomButton from "../../../components/CustomButton"
const TicketDetailsPage: FC = () => {

    const [tickets, setTickets] = useState({} as Ticket)
    const [user, setUser] = useState({} as User)



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

    // const handleBuyTickets = async () => {
    //     try {
    //         const response = await postTickets();
    //         setBuy(response.data)
    //     } catch (b) {
    //         console.log(b)
    //     }
    // }

    // useEffect(() => {
    //     handleBuyTickets();
    // }, [])

    function convertUserID(userid: any) {
    if (userid != null) {
        return userid as number;
        }
        const parsedValue = parseInt(userid, 10)
        return isNaN(parsedValue) ? parsedValue :parsedValue
    }

    const stringValue1 = sessionStorage.getItem(STORAGE.SBA_USERID) 

    const handleUser = async (id: number) => {
        try {
            const response = await getUser(id);
            setUser(response)
        } catch (u) {
            console.log(u) 
        }
    }

    useEffect(() => {
        handleUser(convertUserID(stringValue1))
    },[stringValue1])

    console.log(convertUserID(stringValue1))
    
    return(
        <AdminLayout isFooter={true}>
            <div className="px-4 pt-2">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-5 gap-y-8 overflow-hidden rounded border-t border-gray-200 pb-4 pt-10 shadow-lg sm:mt-12 sm:pt-12 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="bg-white">
                        <div className="grid gap-y-4 px-6 py-4">

                            <div className="p-2">
                                <span className=" text-gray-900">Payment Information</span>
                            </div>
                            
                            <span className="py-2 font-bold text-gray-900">Personal Details</span>

                            <div className="ml-2 grid justify-between">
                                <span className="text-gray-700">Your Name</span>
                                <h5 className="inline-flex items-center rounded border bg-gradient-to-b px-4 py-2 font-semibold">{user.fullname}</h5>
                            </div>

                            <div className="ml-2 grid justify-between py-2">
                                <span className="text-gray-700">Email</span>
                                <h5 className="inline-flex items-center rounded border bg-gradient-to-b px-4 py-2 font-semibold">{user.email}</h5>
                            </div>
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

                        <CustomButton content="Proceed to payment" type="filled" shape={""}></CustomButton>
                    </div>

                    <div className="p-2">
                        <div className="rounded border-gray-200 p-2 shadow-lg">
                            <span>Time date</span>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default TicketDetailsPage