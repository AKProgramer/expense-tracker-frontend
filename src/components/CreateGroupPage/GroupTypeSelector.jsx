/* eslint-disable react/prop-types */
import { MdGroup, MdFamilyRestroom, MdPerson, MdHome } from "react-icons/md"; // Import the icons from react-icons

export default function GroupTypeSelector({ selectedGroupType, handleGroupTypeClick }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-600 font-medium mb-2">
        Group Type
      </label>
      <div className="flex gap-4">
        {["Trip", "Couple", "Others", "Home"].map((type) => (
          <div
            key={type}
            className={`flex items-center gap-[2px] px-4 py-2 border rounded-lg cursor-pointer ${
              selectedGroupType === type ? "bg-purple-600 text-white" : "text-gray-600"
            }`}
            onClick={() => handleGroupTypeClick(type)}
          >
            {/* Add respective icons */}
            {type === "Trip" && <MdGroup className="text-xl" />}
            {type === "Couple" && <MdFamilyRestroom className="text-xl" />}
            {type === "Others" && <MdPerson className="text-xl" />}
            {type === "Home" && <MdHome className="text-xl" />}
            {type}
          </div>
        ))}
      </div>
    </div>
  );
}