import type { FC } from "react";
import check from "../assets/sidebar/check-svgrepo-com.svg"
import { APPLICATION_URL } from "../utils/configs/routes/applicationUrl";
interface Props {
    currentPage: string;
}

const ProgressBar: FC<Props> = function ({ currentPage }) {
    let chooseRouteClass = "";
    let ticketDetailsClass = "";
    let paymentClass = "";

    if (currentPage === APPLICATION_URL.CHOOSE_ROUTE_URL) {
        chooseRouteClass = "bg-[#F28130]";
        ticketDetailsClass = "bg-[#D9D9D9]";
        paymentClass = "bg-[#D9D9D9]";
    } else if (currentPage === APPLICATION_URL.TICKETDETAILS_URL) {
        chooseRouteClass = "bg-[#F28130]";
        ticketDetailsClass = "bg-[#F28130]";
        paymentClass = "bg-[#D9D9D9]";
    } else if (currentPage === APPLICATION_URL.PAYMENT_URL) {
        chooseRouteClass = "bg-[#F28130]";
        ticketDetailsClass = "bg-[#F28130]";
        paymentClass = "bg-[#F28130]";
    } else {
        chooseRouteClass = "bg-[#D9D9D9]";
        ticketDetailsClass = "bg-[#D9D9D9]";
        paymentClass = "bg-[#D9D9D9]";
    }

    return (
        <div className="ml-4 mt-3">
            <a href={APPLICATION_URL.CHOOSE_ROUTE_URL}>
                <div className="relative flex items-center pb-4" >
                    <div className={`relative z-10 inline-flex size-7 shrink-0 items-center justify-center rounded-full text-white ${chooseRouteClass}`}>
                        {(currentPage === APPLICATION_URL.TICKETDETAILS_URL || currentPage === APPLICATION_URL.PAYMENT_URL) && <img src={check} alt="Check Icon" className="border-white" />}
                    </div>

                    <div className="flex justify-center gap-4 pl-3 text-center">
                        <p>Choose route</p>
                    </div>
                </div>
            </a>

            <a href={APPLICATION_URL.TICKETDETAILS_URL}>
                <div className="relative flex items-center pb-4">
                    <div className="absolute -top-4 ml-2 flex h-full w-4 items-center justify-center">
                        <div className={`pointer-events-none h-full w-0.5 ${ticketDetailsClass}`}></div>
                    </div>
                    <div className={`relative z-10 mt-1 inline-flex size-7 shrink-0 items-center justify-center rounded-full text-white ${ticketDetailsClass}`}>
                        {currentPage === APPLICATION_URL.PAYMENT_URL && <img src={check} alt="Check Icon" className="border-white" />}
                    </div>
                    <div className="flex justify-center gap-4 pl-3 text-center">
                        <p>Ticket details</p>
                    </div>
                </div>
            </a>

            <a href={APPLICATION_URL.PAYMENT_URL}>
                <div className="relative flex items-center pb-4 ">
                    <div className="absolute -top-4 ml-2 flex h-full w-4 items-center justify-center">
                        <div className={`pointer-events-none h-full w-0.5 ${paymentClass}`}></div>
                    </div>
                    <div className={`relative z-10 mt-1 inline-flex size-7 shrink-0 items-center justify-center rounded-full text-white ${paymentClass}`}>
                        {/* <img src={check} alt="Check Icon" className="border-white" /> */}
                    </div>
                    <div className="flex justify-center gap-4 pl-3 text-center">
                        <p>Payment</p>
                    </div>
                </div>
            </a>
        </div>
    );
};

export default ProgressBar;
