import Navbar from "../Navbar/index.jsx";
import CustomButton from "../CustomButton/index.jsx";

const Header = ()=>{
    const handleSignUp = ()=>{}
    return (
        <header className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
            <h2 className="text-2xl font-bold text-blue">SkillSwap</h2>

            <Navbar className="flex-grow mx-4"/>

            <CustomButton type={"button"} title={"Sign Up"} onClick={()=>{handleSignUp}} color={"blue"} className="ml-auto"/>
        </header>
    )
}
export default Header;