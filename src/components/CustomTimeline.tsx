import type { FC } from "react";

interface TimelineData {
    time: String;
    station: String | null;
}

interface TimelineProps {
    data: TimelineData[];
}

const CustomTimeline: FC<TimelineProps> = ({ data }) => {
    return (
        <div className="inline-block border-2">
            {data.slice(0, -1).map((item, index) => (
                <div key={index}>
                    <div className="relative flex items-center pb-12">
                        <div className="absolute inset-0 top-1.5 flex h-full w-4 items-center justify-center">
                            <div className="pointer-events-none h-full w-0.5 bg-[#F5821F]"></div>
                        </div>
                        <div className="relative z-10 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-[#F5821F] text-white"></div>
                        <div className="flex justify-center gap-4 pl-4 text-center">
                            <h2 className="font-bold">{item.time}</h2>
                            <p>{item.station}</p>
                        </div>
                    </div>
                </div>
            ))}

            {/* The last timeline item */}
            <div className="relative flex items-center pb-12">
                <div className="relative z-10 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-[#F5821F] text-white"></div>
                <div className="flex justify-center gap-4 pl-4 text-center">
                    <h2 className="font-bold">{data[data.length - 1].time}</h2>
                    <p>{data[data.length - 1].station}</p>
                </div>
            </div>

        </div>
    );
};

export default CustomTimeline;
