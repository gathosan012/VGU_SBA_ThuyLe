import type { FC } from "react"
import AdminLayout from "../../../layouts/AdminArea/AdminLayout"
import ButtonGroup from "flowbite-react/lib/esm/components/Button/ButtonGroup"
import { Button } from "flowbite-react"
import CustomButton from "../../../components/CustomButton"

const HistoryPage: FC = () => {
    return(
        <AdminLayout isFooter={false}>
            <div className="px-4 py-2">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-5 gap-y-8 overflow-hidden rounded border-t border-gray-200 pb-4 pt-6 shadow-lg sm:mt-12 sm:pt-12 lg:mx-0 lg:max-w-none ">
                        <ButtonGroup>
                            <Button type="submit" color="primary" className="ml-5 max-w-16">
                                All
                            </Button>
                            <Button type="submit" color="primary" className="ml-5 max-w-16">
                                Valid
                            </Button>
                            <Button type="submit" color="primary" className="ml-5 max-w-16">
                                Invalid
                            </Button>

                            <Button type="submit" color="primary" className="ml-5 max-w-16">
                                Expired
                            </Button>
                        </ButtonGroup>
                        

                        <div className="px-2">
                            <div className="flex justify-between divide-x-2 rounded-lg bg-white p-4 py-3 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                                <div className="">
                                    <span>Monday 1.1.2024</span>
                                    <div>
                                        stepper here
                                    </div>
                                </div>
                                <div className="grid gap-y-4 px-6 py-10">
                                    <CustomButton type="filled" content="Invalid" shape={""}></CustomButton>
                                    <CustomButton type="outlined" content="More details" shape={""}></CustomButton>
                                </div>
                            </div>
                        </div>
                        
                </div>
            </div>
            
        </AdminLayout>
    )
}

export default HistoryPage