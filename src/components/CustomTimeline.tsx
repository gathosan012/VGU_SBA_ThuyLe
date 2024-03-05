import React, { FC } from "react";

interface TimelineData {
    time: string;
    station: string;
}

interface TimelineProps {
    data: TimelineData[];
}

const CustomTimeline: FC<TimelineProps> = ({ data }) => {
    return (
        <div className="inline-block border-2">
            {data.slice(0, -1).map((item, index) => (
                <div key={index}>
                    <div className="flex relative pb-12 items-center">
                        <div className="h-full w-4 absolute top-1.5 inset-0 flex items-center justify-center">
                            <div className="h-full w-0.5 bg-[#F5821F] pointer-events-none"></div>
                        </div>
                        <div className="flex-shrink-0 w-4 h-4 rounded-full bg-[#F5821F] inline-flex items-center justify-center text-white relative z-10"></div>
                        <div className="flex justify-center gap-4 pl-4 text-center">
                            <h2 className="font-bold">{item.time}</h2>
                            <p>{item.station}</p>
                        </div>
                    </div>
                </div>
            ))}

            {/* The last timeline item */}
            <div className="flex relative pb-12 items-center">
                <div className="flex-shrink-0 w-4 h-4 rounded-full bg-[#F5821F] inline-flex items-center justify-center text-white relative z-10"></div>
                <div className="flex justify-center gap-4 pl-4 text-center">
                    <h2 className="font-bold">{data[data.length - 1].time}</h2>
                    <p>{data[data.length - 1].station}</p>
                </div>
            </div>

        </div>
    );
};

export default CustomTimeline;
