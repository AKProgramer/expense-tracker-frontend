/* eslint-disable react/prop-types */
import { MdGroup, MdFamilyRestroom, MdPerson, MdHome } from "react-icons/md"; // Import the icons from react-icons

export default function GroupTypeSelector({ selectedGroupType, handleGroupTypeClick }) {
  return (
    <div className="">
      <label className="block text-gray-600 font-medium mb-2">
        Group Type
      </label>
      <div className="flex justify-between">
        {["Home", "Trip", "Others"].map((type) => (
          <div
            key={type}
            className={`flex gap-[2px] px-10 py-2 rounded-full border-2 border-black cursor-pointer ${
              selectedGroupType === type ? "bg-black text-white" : "text-gray-600"
            }`}
            onClick={() => handleGroupTypeClick(type)}
          >
            {/* Add respective icons */}
            {type === "Trip" && <MdGroup className="text-lg" />}
            {type === "Couple" && <MdFamilyRestroom className="text-lg" />}
            {type === "Others" && <MdPerson className="text-lg" />}
            {type === "Home" && <MdHome className="text-lg" />}
            {type}
          </div>
        ))}
      </div>
    </div>
  );
}
