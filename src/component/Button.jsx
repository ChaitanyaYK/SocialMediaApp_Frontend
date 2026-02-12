import { useId } from "react";

function Button({
    children,  //children is a simple text
    type = 'button',
    rounded = 'rounded-sm',
    bgColor = 'bg-neutral-800 hover:bg-neutral-600',
    textColor = 'text-white',
    className = '',
    ...props
}) {
    const id = useId();

    return (
        <button className={`flex items-center cursor-pointer hover:cursor-pointer ${className} ${bgColor} ${textColor} ${rounded}`} {...props}>
            {children}
        </button>
    )
}

export default Button;