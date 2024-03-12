import type { FC } from "react";
import ReactDatePicker from "react-datepicker";
import "./CustomDatePicker.css"

interface DatePickerProps {
    label: string;
    selectedDate: Date | null;
    onChange: (date: Date | null) => void;
}

const CustomDatePicker: FC<DatePickerProps> = ({ label, selectedDate, onChange }) => {

    return (
        <div className="inline-block">
            <div className="flex items-center justify-center rounded-full bg-[#F5821F] px-6 py-1">
                <p className="mr-2 font-medium text-white">{label}</p>
                <ReactDatePicker
                    selected={selectedDate}
                    onChange={onChange}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Choose your date"
                    className="w-4/5 border-none bg-[#F5821F] font-semibold text-white custom-datepicker-input"
                />
            </div>

        </div>
    );
};

export default CustomDatePicker;
