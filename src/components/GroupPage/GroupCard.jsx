/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

export default function GroupCard({groups}) {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const handleNavigation = (path) => {
    navigate(path)    // Navigate to the given path
  };
  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 font-poppins">
    {groups.map((group) => (
      <div
        key={group.id}
        className="bg-white border-2 border-black p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
      >
        <div className="flex items-center mb-4">
          <div
            className="w-12 h-12 rounded-full mr-4 border-2 border-black flex items-center justify-center"
          >
            {group.icon}
        </div>
          <div>
            <h2 className="text-xl font-semibold">{group.name}</h2>
            <p className="text-sm text-gray-500">{group.type}</p>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-600 mb-2">Members:</p>
          <div className="flex flex-wrap gap-2">
            {group.members.map((member, index) => (
              <span
                key={index}
                className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium"
              >
                {member}
              </span>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-600">
            Total Amount:{" "}
            <span className="text-gray-800 font-semibold">
              {group.totalAmount}
            </span>
          </p>
        </div>
        <button
          onClick={handleNavigation(`/group-details/${group.id}`)}
          className="block text-center hover:bg-black hover:text-white border-2 border-black py-2 px-4 rounded-full"
        >
          View Details
        </button>
      </div>
    ))}
  </div>
  )
}
