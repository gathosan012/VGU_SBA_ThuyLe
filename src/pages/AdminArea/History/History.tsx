import type { FC } from "react"
import AdminLayout from "../../../layouts/AdminArea/AdminLayout"
import ButtonGroup from "flowbite-react/lib/esm/components/Button/ButtonGroup"
import { Button } from "flowbite-react"
import CustomButton from "../../../components/CustomButton"
import CustomTag from "../../../components/CustomTag"
import { Link } from "react-router-dom"
import CustomTimeline from "../../../components/CustomTimeline"

const HistoryPage: FC = () => {
    return(
        <AdminLayout isFooter={true}>
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
                        

                        <div className="justify-center rounded border-t border-gray-200 px-2 py-4">
                                    
                                    <div className="mb-5 grid grid-cols-1 justify-between gap-x-10 divide-x-2 rounded-lg bg-white shadow-lg md:mb-5 lg:mx-24 lg:my-10 lg:grid-cols-2 lg:flex-row">
                                        <div className="ml-5 mr-auto grid gap-x-4 px-3 py-4">
                                            <span className="font-bold">Date: </span>
                                            <CustomTimeline data={[{time:"9h", station:"Station A"},{time:"11h", station:"Station B"}]}></CustomTimeline>
                                        </div>

                                        <div className="grid justify-center gap-y-4 py-10  lg:ml-32 xl:ml-40">
                                            <CustomTag color={"red"} content={"Expire"}></CustomTag>
                                            <Link to={`/ticket-details/:id`}>
                                                <CustomButton type="outlined" content="More Details" shape={""}></CustomButton>
                                            </Link>
                                        </div>
                                    </div>
                        </div>
                        
                </div>
            </div>
            
        </AdminLayout>
    )
}

export default HistoryPage