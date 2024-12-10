import { AiFillBell } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Header = () => {
 

 
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate(); // To programmatically navigate after logout
  const handleNavigation = (path) => {
   navigate(path);     // Navigate to the given path
  };
  const handleLogout = () => {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("token");
    navigate("/register"); // Redirect to login page after logout
  };

  return (
    <div className="flex border-2 border-white w-full fixed items-center justify-between py-2 px-4 bg-glass rounded-full z-50">
      {/* Left Section */}
      <div className="left flex items-center rounded-full">
        <img
          className="w-10 h-10"
          src="https://pngimg.com/uploads/letter_e/letter_e_PNG50.png"
          alt=""
        />
        <button onClick={handleNavigation('/')}>
            <h1 className="m-0 fw-bold text-lg font-semibold ml-2">XPENSE</h1>
        </button>
      </div>

      {/* Right Section */}
      <div className="right flex items-center gap-4 sm:gap-2">
        <button
          onClick={handleLogout} // Trigger logout when button is clicked
          className="py-2 text-sm border-white border-2 px-4 bg-black rounded-full text-white"
        >
          { token ? 'Logout' : 'Login' }
        </button>
        <div className="flex items-center justify-center w-10 h-10 border-2 border-black rounded-full bg-white">
          <AiFillBell className="text-xl" />
        </div>
        <img
          className="w-10 h-10 border-2 border-white rounded-full"
          src="https://www.shareicon.net/download/2017/05/09/885769_user_512x512.png"
          alt="User Avatar"
        />
      </div>
    </div>
  );
};

export default Header;
