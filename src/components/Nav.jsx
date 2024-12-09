import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { MdDashboard } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import { FaUserCog } from "react-icons/fa";
import { BsFillClipboard2CheckFill } from "react-icons/bs";

const Nav = () => {
  return (
    <nav
      className="nav flex w-2/3 gap-2 border-2 border-black justify-between px-6 py-2 sm:w-1/2 md:w-2/5 lg:w-1/4 xl:w-1/5 bg-white shadow-lg rounded-full fixed bottom-3 left-1/2 transform -translate-x-1/2 text-black"
    >
      <Link to="/" aria-label="Home" className="flex flex-col items-center">
        <button className="flex flex-col gap-1 items-center bg-transparent border-none text-black hover:underline">
          <MdDashboard className="text-black text-base sm:text-lg md:text-xl lg:text-2xl" />
          <span className="text-sm sm:text-base font-semibold">Home</span>
        </button>
      </Link>

      <Link to="/groups" aria-label="Groups" className="flex flex-col items-center">
        <button className="flex flex-col gap-1 items-center bg-transparent border-none text-black hover:underline">
          <HiUserGroup className="text-black text-base sm:text-lg md:text-xl lg:text-2xl" />
          <span className="text-sm sm:text-base font-semibold">Groups</span>
        </button>
      </Link>

      <Link to="/approvals" aria-label="Approvals" className="flex flex-col items-center">
        <button className="flex flex-col gap-1 items-center bg-transparent border-none text-black hover:underline">
          <BsFillClipboard2CheckFill className="text-black text-base sm:text-lg md:text-xl lg:text-2xl" />
          <span className="text-sm sm:text-base font-semibold">Approvals</span>
        </button>
      </Link>

      <Link to="/profile" aria-label="Profile" className="flex flex-col items-center">
        <button className="flex flex-col gap-1 items-center bg-transparent border-none text-black hover:underline">
          <FaUserCog className="text-black text-base sm:text-lg md:text-xl lg:text-2xl" />
          <span className="text-sm sm:text-base font-semibold">Profile</span>
        </button>
      </Link>
    </nav>
  );
};

export default Nav;
