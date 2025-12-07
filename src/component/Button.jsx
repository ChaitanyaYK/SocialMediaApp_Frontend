import { useId } from "react";

function Button({
    children,  //children is a simple text
    type = 'button',
    rounded = 'rounded-sm',
    bgColor = 'bg-neutral-800',
    textColor = 'text-white',
    className = '',
    ...props
}) {
    const id = useId();

    return (
        <button className={`px-4 py-2 flex items-center cursor-pointer hover:cursor-pointer ${bgColor} ${textColor} ${rounded}`} {...props}>
            {children}
        </button>
    )
}

export default Button;