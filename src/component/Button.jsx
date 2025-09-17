import { useId } from "react";

function Button({
    children,  //children is a simple text
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props
}) {
    const id = useId();

    return (
        <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor}`} {...props}>
            {children}
        </button>
    )
}

export default Button;