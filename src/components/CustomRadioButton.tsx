import React, { useState } from "react";
import CustomButton from "./CustomButton";

type RadioProps = {
    options: string[];
    onChange: (value: string) => void;
};

const CustomRadioButton: React.FC<RadioProps> = ({ options, onChange }) => {
    const [selectedOption, setSelectedOption] = useState<string>(options[0]); // Initially selected option is the first option (All)

    const handleOptionChange = (value: string) => {
        setSelectedOption(value);
        onChange(value);
    };

    return (
        <div className="grid-column space-x-6">
            {options.map((option, index) => (
                <CustomButton
                    key={index}
                    content={option}
                    type={selectedOption === option ? "filled" : "outlined"}
                    onClick={() => handleOptionChange(option)}
                />
            ))}
        </div>
    );
};

export default CustomRadioButton;

// how to use
// const [selectedOption, setSelectedOption] = useState('All');

//   const handleOptionChange = (selectedOption) => {
//     setSelectedOption(selectedOption);
//   };

//   const options = ['All', 'Option 2', 'Option 3'];
//   <CustomRadioButton options={options} onChange={handleOptionChange} />