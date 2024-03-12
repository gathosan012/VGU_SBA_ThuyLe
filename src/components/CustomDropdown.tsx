import type { FC } from "react";
import { useState, useRef, useEffect } from "react";
import image from "../assets/images/arrowdown.svg";

interface DropdownProps {
    label: string;
    options: string[];
    value: string; // Add value prop
    onChange: (value: string) => void; // Add onChange prop
}

const CustomDropdown: FC<DropdownProps> = function ({ label, options, value: initialValue, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState(initialValue || options[0]); // Initialize value with the first option or the provided value

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

    const handleOptionClick = (option: string) => {
        setValue(option); // Set the selected option as the new value
        onChange(option); // Call onChange with the selected option
        setIsOpen(false); // Close the dropdown
    };

    return (
        <div className="relative inline-block">
            <div className="inline-block bg-[#F5821F] py-3 px-6 rounded-full" onClick={toggleDropdown}>
                <div className="flex gap-2">
                    <p className="font-medium text-white">{label}</p>
                    <p className="text-white font-semibold">{value}</p> {/* Display the selected value */}
                    <img src={image} alt="arrow down" />
                </div>
            </div>
            {isOpen && (
                <div className="absolute align-center bg-white shadow-lg py-3 px-6 rounded-lg" style={{ width: '100%' }}>
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className="py-1 px-4 cursor-pointer hover:bg-gray-100"
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