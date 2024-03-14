import type { FC } from "react";
import { useState, useRef, useEffect } from "react";
import image from "../assets/images/arrowdown.svg";

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
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option: string) => {
        setValue(option); // Set the selected option as the new value
        onChange(option); // Call onChange with the selected option
        setIsOpen(false); // Close the dropdown
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <div className="rounded-full bg-[#F5821F] py-3 pl-4 pr-4" onClick={toggleDropdown}>
                <div className="flex items-center justify-center">
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
