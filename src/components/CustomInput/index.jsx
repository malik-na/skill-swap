import React from "react";

const CustomInput = React.forwardRef(({ widthX, placeholder, type, ...rest }, ref) => {
    return (
        <div>
            <input
                ref={ref} // Forward the ref here
                type={type}
                placeholder={placeholder}
                className={`p-2 border-gray-light border-[1px] rounded`}
                style={{ width: `${widthX}rem` }}
                {...rest} // Pass down any additional props from React Hook Form
            />
        </div>
    );
});

// Optionally set a display name for debugging
CustomInput.displayName = "CustomInput";

export default CustomInput;
