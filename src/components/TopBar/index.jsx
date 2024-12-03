import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import CustomButton from "../CustomButton";

const TopBar = () => {
  const { currentUser, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/signin");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="h-16 bg-white shadow-md flex items-center justify-between px-6">
      <div className="flex items-center">
        <h2 className="text-xl font-semibold">Welcome, {currentUser?.email}</h2>
      </div>

      <div className="flex items-center gap-4">
        <CustomButton
          type="button"
          title="Logout"
          onClick={handleLogout}
          color="#0D92F4"
        />
      </div>
    </header>
  );
};

export default TopBar;
