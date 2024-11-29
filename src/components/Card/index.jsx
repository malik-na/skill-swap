// eslint-disable-next-line react/prop-types
const Card = ({bgcolor, widthX, title, content, icon}) => {
    return (
        <div>
            <div style={{ width: `${widthX}rem` }} className={`bg-${bgcolor} flex flex-1 justify-center items-center rounded-lg shadow-lg p-5 bg-gray-light`}>
                <div className="flex flex-col justify-center items-center">
                    <div className="flex flex-row justify-center items-center">
                        <img src={icon} alt="icon" className="h-12 w-12"/>
                        <h1 className="text-2xl font-bold">{title}</h1>
                    </div>
                    <p className="text-md">{content}</p>
                </div>
            </div>
        </div>
    )
}
export default Card;