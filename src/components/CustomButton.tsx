import type { FC, FormEvent } from "react";

interface ButtonProps {
    disabled?: boolean;
    shape: 'rounded' | '';
    type?: "outlined" | "filled";
    content: string;
    onNavbar?: boolean;
    onClick?: (e: FormEvent<HTMLFormElement>) => void;
    buttonWidth?: string;
}

const CustomButton: FC<ButtonProps> = ({
    disabled = false,
    type = "filled",
    content,
    onNavbar = false,
    onClick,
    buttonWidth = "auto"
}) => {
    // Define base button classes with customizable width
    const baseClasses = `text-center inline-block mx-auto rounded-full py-3 px-10 ${buttonWidth}`;

    // Define classes for different button types
    const outlinedClasses = "bg-white border-[#F5821F] text-[#F5821F] border-2";
    const filledClasses = "bg-[#F5821F] text-white";

    // Determine which classes to use based on the type prop
    const buttonClasses = type === 'outlined' ? outlinedClasses : filledClasses;

    // Define classes for disabled state
    const disabledClass = disabled ? 'bg-opacity-50 cursor-not-allowed' : '';

    // Define classes for navbar buttons
    const navbarClasses = onNavbar ? 'py-2 px-4' : '';

    // Combine all classes
    const classNames = `${baseClasses} ${buttonClasses} ${disabledClass} ${navbarClasses}`;

    // Define onClick handler
    const handleClick = disabled ? undefined : onClick;

    return (
        <div
            className={classNames}
            onClick={handleClick}
            role="button"
            tabIndex={0}
        >
            {content}
        </div>
    );
};

export default CustomButton;
