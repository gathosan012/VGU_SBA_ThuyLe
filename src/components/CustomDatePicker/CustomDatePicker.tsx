import type { FC } from "react";
import ReactDatePicker from "react-datepicker";
import "./CustomDatePicker.css";

interface DatePickerProps {
    label: string;
    selectedDate: Date | null;
    onChange: (date: Date | null) => void;
}

const CustomDatePicker: FC<DatePickerProps> = ({ label, selectedDate, onChange }) => {
    return (
        <div className="relative w-full">
            <div className="rounded-full bg-[#F5821F] px-6 py-1 flex justify-center items-center">
                <p className="font-medium text-white mr-4">{label}</p>
                <div className="w-1/2 lg:w-4/5">
                    <ReactDatePicker
                        selected={selectedDate}
                        onChange={onChange}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Choose your date"
                        className=" bg-[#F5821F] font-semibold text-white custom-datepicker-input border-none"
                    /></div>
            </div>
        </div>
    );
};

export default CustomDatePicker;
