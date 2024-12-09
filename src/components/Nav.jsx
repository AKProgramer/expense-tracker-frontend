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
      <Link to="/" aria-label="Home">
        <button className="flex flex-col gap-1 items-center cursor-pointer hover:underline bg-transparent border-none">
          <MdDashboard className="text-lg" />
          <span className="under text-sm font-semibold">Home</span>
        </button>
      </Link>

      <Link to="/groups" aria-label="Groups">
        <button className="flex flex-col gap-1 items-center cursor-pointer hover:underline bg-transparent border-none">
          <HiUserGroup className="text-lg" />
          <span className="under text-sm font-semibold">Groups</span>
        </button>
      </Link>

      <Link to="/approvals" aria-label="Approvals">
        <button className="flex flex-col gap-1 items-center cursor-pointer hover:underline bg-transparent border-none">
          <BsFillClipboard2CheckFill className="text-lg" />
          <span className="under text-sm font-semibold">Approvals</span>
        </button>
      </Link>

      <Link to="/profile" aria-label="Profile">
        <button className="flex flex-col gap-1 items-center cursor-pointer hover:underline bg-transparent border-none">
          <FaUserCog className="text-lg" />
          <span className="under text-sm font-semibold">Profile</span>
        </button>
      </Link>
    </nav>
  );
};

export default Nav;
