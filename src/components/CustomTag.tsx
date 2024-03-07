import type { FC } from "react";

interface TagProps {
    content: String;
    color: String;
}

const CustomTag: FC<TagProps> = ({
    content, color
}) => {
    // Define base button classes with customizable width
    const baseClasses = 'text-center inline-block mx-auto font-medium rounded-full py-1.5 px-14';

    const redClass = 'bg-[#F5222D] text-white'
    const grayClass = 'bg-[#D9D9D9] text-black'
    const greenClass = 'bg-[#B7EB8F] text-black'

    let colorClasses = '';
    if (color == 'red') {
        colorClasses = redClass;
    } else if (color == 'green') {
        colorClasses = greenClass;
    } else if (color == 'gray') {
        colorClasses = grayClass
    }

    const classNames = `${baseClasses} ${colorClasses}`;

    return (
        <div
            className={classNames}
        >
            {content}
        </div>
    );
};

export default CustomTag;
