import { useState, type FC } from "react"
import AdminLayout from "../../../layouts/AdminArea/AdminLayout"
import MyModal from "./mymodal"
import CustomButton from "../../../components/CustomButton"

const PaymentPage: FC = () => {

    const [modal, setModal] = useState(false)

    const handleOnclose = () => setModal(false)

    return(
        <AdminLayout isFooter={true}>
            <div className="px-4 pt-2">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-5 gap-y-8 overflow-hidden rounded border-t border-gray-200 pb-4 pt-10 shadow-lg sm:mt-12 sm:pt-12 lg:mx-0 lg:max-w-none ">
                    <div className="grid px-6 py-4">
                        <div className="grid py-2 text-center">
                            <span className="font-semibold">Please make payment by bank transfer to account number below</span>
                            <span className="font-semibold">Carefully check the content of the transfer according to the instructions</span>
                        </div>

                        <div className="grid gap-x-6">
                            <div className="flex py-2">
                                <span className="min-w-60 items-center py-2">Account Holder</span>
                                <span className="inline-flex items-center rounded border bg-gradient-to-b px-4 py-2 font-semibold ">Truong Dai hoc Viet Duc</span>
                            </div>

                            <div className="flex py-2">
                                <span className="min-w-60 items-center py-2">Acoount Number</span>
                                <span className="inline-flex items-center rounded border bg-gradient-to-b px-4 py-2 font-semibold ">1002220990</span>
                            </div>

                            <div className="flex py-2">
                                <span className="min-w-60 items-center py-2">Name of Bank</span>
                                <span className="inline-flex items-center rounded border bg-gradient-to-b px-4 py-2 font-semibold ">JSC Bank of Foreign Trade of Vietnam (Vietcombank)/Branch: Binh Duong</span>
                            </div>

                            <div className="flex py-2">
                                <span className="min-w-60 items-center py-2">Transfer Note</span>
                                <span className="inline-flex items-center rounded border bg-gradient-to-b px-4 py-2 font-semibold ">"Ticket type" - "DD/MM/YYYY" - "Student ID" - "Your Full Name"</span>
                            </div>
                        </div>
                    </div>
                    <span className="flex items-center px-20">
                        <span className="h-px flex-1 bg-black"></span>
                        <span className="shrink-0 px-6">OR</span>
                        <span className="h-px flex-1 bg-black"></span>
                    </span>

                    <div className="grid  px-6 py-4">
                        <span className="min-w-max text-center ">Scan this QR code</span>
                    </div>                    

                    <CustomButton content="Proceed to payment"
                        onClick={() => setModal(true)}
                        >
                        Proceed to payment
                    </CustomButton>


                    <MyModal onclose={handleOnclose} visible={modal}/>
                </div>
                
            </div>
        </AdminLayout>
    )
}

export default PaymentPage