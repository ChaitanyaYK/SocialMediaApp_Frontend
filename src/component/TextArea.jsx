import React, { useId } from "react";

const TextArea = function TextArea({
    children,
    className = ""
}, ref) {
    const id = useId();

    return (
        <div>
            {/* {label && <label htmlFor={id}>{children}</label>} */}
            <textarea 
            ref={ref}
            className={`px-5 py-3 rounded-lg bg-white text-black row-end-4 col-end-5 outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            id={id}>
                {" "}
            </textarea>
        </div>
    )
}

export default React.forwardRef(TextArea);