import React, {useId} from 'react';
// focus:bg-gray-50
const Input = function Input({
    label,
    error,
    type="text",
    placeholder,
    className,
    ...props
}, ref) {
   const id = useId()

    return (
        <div className="w-full">
            { label && <label
            className="inline-block mb-1 pl-1 text-neutral-300"
            htmlFor={id}>
                {label} 
            </label>
            }
            <input
             id={id}
             type={type}
             placeholder={placeholder}
             className={`px-3 py-2 rounded-lg bg-zinc-900 text-white outline-none duration-200 border border-gray-200 w-full ${className}`}
             {...props}
             ref={ref}
            />
            {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
        </div>
    );
}

export default React.forwardRef(Input);