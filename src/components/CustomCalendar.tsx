import React, { FC } from "react";

interface DatePickerProps {
    label: string;
    selectedDate: string; // Ensure selectedDate is a string
    onChange: (date: string) => void;
}

const CustomDatePicker: FC<DatePickerProps> = ({ label, selectedDate, onChange }) => {
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value); // Pass the value directly
    };

    return (
        <div className="relative inline-block">
            <div className="inline-block bg-[#F5821F] py-3 px-6 rounded-full">
                <div className="flex gap-2 items-center justify-center">
                    <p className="font-medium text-white">{label}</p>
                    <input
                        type="date"
                        className="text-white font-semibold bg-transparent border-none outline-none"
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default CustomDatePicker;
