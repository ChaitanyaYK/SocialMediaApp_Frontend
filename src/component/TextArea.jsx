import React, { useId } from "react";

const TextArea = function TextArea({
    label,
    className = "",
    error,
    placeholder,
    ...props
}, ref) {
    const id = useId();

    return (
      <div>
        {label && <label htmlFor={id}>{label}</label>}
        <textarea 
          ref={ref}
          className={`px-5 py-3 rounded-lg bg-black text-black row-end-4 col-end-5 outline-none focus:bg-gray-800 duration-200 border border-2 border-gray-400 w-full ${className}`}
          id={id} 
          placeholder={placeholder}
          {...props}
        >
            
        </textarea>
        {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
      </div>
    )
}

export default React.forwardRef(TextArea);