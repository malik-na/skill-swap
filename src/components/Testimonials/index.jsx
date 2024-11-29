
const Testimonials = ()=>{

    const testimonials = [
        {
            username : "Jane Doe",
            location : "New York",
            stars : 5,
            remark: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam."
        },{
            username : "Jane Doe",
            location : "New York",
            stars : 5,
            remark: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam."
        },{
            username : "Jane Doe",
            location : "New York",
            stars : 5,
            remark: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam."
        },
    ]

    return (
        <div className="h-[100vh] bg-[#F7F7F7] flex flex-col items-center justify-around">
            <h1 className="text-4xl text-center font-bold">What Our Users Are Saying</h1>
            {testimonials.map((item, i) => (
                <div key={i} className="rounded-lg shadow-lg p-5 bg-gray-light will-change-transform w-4/5">
                    <p className="font-semibold">{item.username}, {item.location}</p>
                    <span>{item.stars}</span>
                    <p>{item.remark}</p>
                </div>
            ))}
        </div>
    )
}
export default Testimonials;