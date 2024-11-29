import CustomButton from "../CustomButton/index.jsx";

const Hero = ()=>{
    return (
        <main className="flex justify-between h-[100svh] p-10 bg-[#F7F7F7]">
            <div className="flex-col">
            <h1 className="text-7xl font-bold flex flex-col"><span>Exchange</span> <span>Skills,</span> <span>Grow</span>  <span>Together</span>
            </h1>
                <CustomButton type={"button"} title={"Get Started"} onClick={()=>{}} color={"blue"} size={"3xl"} />
                </div>
            <img src="src/assets/hero.jpg" alt="Hero Image" className="h-[500px] mt-8 mr-5"/>
        </main>
    )
}
export default Hero;