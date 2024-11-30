import Navbar from "../Navbar/index.jsx";
import CustomButton from "../CustomButton/index.jsx";
import {useNavigate} from "react-router-dom";

const Header = ()=>{
    const navigate = useNavigate();
    const handleSignUp = ()=>{
        navigate("/signup");
    }
    return (
        <header className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
            <h2 className="text-2xl font-bold text-blue">SkillSwap</h2>

            <Navbar className="flex-grow mx-4"/>

            <CustomButton type={"button"} title={"Sign Up"} onClick={handleSignUp} color={"#0D92F4"} className="ml-auto"/>
        </header>
    )
}
export default Header;