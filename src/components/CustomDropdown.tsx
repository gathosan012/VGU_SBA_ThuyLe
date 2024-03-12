import { FC, useState } from "react";
import image from "../assets/images/arrowdown.svg";
import { it } from "node:test";

interface DropdownProps {
    label: string;
    options: string[];
    value: string; // Add value prop
    onChange: (value: string) => void; // Add onChange prop
    initial: string;
}

const CustomDropdown: FC<DropdownProps> = function ({ label, options, value: initialValue, onChange, initial }) {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState(initialValue || initial); // Initialize value with the first option or the provided value

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option: string) => {
        setValue(option); // Set the selected option as the new value
        onChange(option); // Call onChange with the selected option
        setIsOpen(false); // Close the dropdown
    };

    return (
        <div className="relative">
            <div className=" rounded-full bg-[#F5821F] pl-6 pr-4 py-3 " onClick={toggleDropdown}>
                <div className="flex justify-between">
                    <p className="shrink-0 font-medium text-white">{label}</p>
                    <p className="mx-2 truncate text-center font-semibold text-white">{value}</p> {/* Display the selected value */}
                    <img src={image} alt="arrow down" />
                </div>
            </div>
            {isOpen && (
                <div className="absolute z-40 rounded-lg bg-white px-6 py-3 shadow-lg" style={{ width: '100%' }}>
                    {options.map((option, index) => (
                        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                        <div
                            key={index}
                            className="cursor-pointer px-4 py-1 hover:bg-gray-100"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;


// To use it
// const [selectedOption, setSelectedOption] = useState('');

//     const handleDropdownChange = (option) => {
//         setSelectedOption(option);
//     };

//     return (
//         <div>
//             <CustomDropdown
//                 label="Select Option"
//                 options={["Option 1", "Option 2", "Option 3"]}
//                 value={selectedOption}
//                 onChange={handleDropdownChange}
//             />
//         </div>
//     );