// eslint-disable-next-line react/prop-types
const CustomButton = ({title, type, onClick, color, size })=>{
    return(
        <button type={type}
                onClick={onClick}
                style={{background: color, fontSize: `${size}px`}}
                className={`
                 text-white font-semibold py-1 px-4 rounded hover:opacity-90
                `}>
            {title}
        </button>
    )
}
export default CustomButton;