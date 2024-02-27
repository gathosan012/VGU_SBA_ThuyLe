import type { FC } from "react"
import AdminLayout from "../../../layouts/AdminArea/AdminLayout"

const PaymentPage: FC = () => {
    return(
        <AdminLayout isFooter={false}>
            <div className="px-4 pt-2">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-5 gap-y-8 overflow-hidden rounded border-t border-gray-200 pb-4 pt-10 shadow-lg sm:mt-12 sm:pt-12 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="px-6 py-4">
                        Qr code here
                    </div>

                    <div className="px-6 py-4">
                        Bank Account Information
                    </div>

                    
                </div>
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-5 gap-y-8 overflow-hidden rounded border-t border-gray-200 pb-4 pt-10 shadow-lg sm:mt-6 sm:pt-6 lg:mx-0 lg:max-w-none lg:grid-cols-1 lg:pt-2">
                    <div className="grid justify-center text-center">
                        <span className="">Click button below after success transfer fees</span>
                        <button className="inline-block max-w-60 rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
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

export default PaymentPage