import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { MdDashboard } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import { FaUserCog } from "react-icons/fa";
import { BsFillClipboard2CheckFill } from "react-icons/bs";

const Nav = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleNavigation = (path) => {
    navigate(path) // Navigate to the given path
  };

  return (
    <nav className="nav flex w-2/3 gap-2 border-2 border-black justify-between px-6 py-2 sm:w-1/2 md:w-2/5 lg:w-1/4 xl:w-1/5 bg-white shadow-lg rounded-full fixed bottom-3 left-1/2 transform -translate-x-1/2">
      <button
        onClick={() => handleNavigation("/")}
        aria-label="Home"
        className="flex flex-col gap-1 items-center cursor-pointer hover:underline"
      >
        <MdDashboard className="text-lg" />
        <span className="under text-sm font-semibold">Home</span>
      </button>

      <button
        onClick={() => handleNavigation("/groups")}
        aria-label="Groups"
        className="flex flex-col gap-1 items-center cursor-pointer hover:underline"
      >
        <HiUserGroup className="text-lg" />
        <span className="under text-sm font-semibold">Groups</span>
      </button>

      <button
        onClick={() => handleNavigation("/approvals")}
        aria-label="Approvals"
        className="flex flex-col gap-1 items-center cursor-pointer hover:underline"
      >
        <BsFillClipboard2CheckFill className="text-lg" />
        <span className="under text-sm font-semibold">Approvals</span>
      </button>

      <button
        onClick={() => handleNavigation("/profile")}
        aria-label="Profile"
        className="flex flex-col gap-1 items-center cursor-pointer hover:underline"
      >
        <FaUserCog className="text-lg" />
        <span className="under text-sm font-semibold">Profile</span>
      </button>
    </nav>
  );
};

export default Nav;
