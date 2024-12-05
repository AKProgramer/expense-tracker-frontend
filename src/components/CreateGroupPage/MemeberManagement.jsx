/* eslint-disable react/prop-types */
import { useEffect } from "react";
import useStore from "../../store/store";
export default function MemberManagement({
  isPopupVisible,
  togglePopup,
  searchText,
  setSearchText,
  handleAddMember,
}) {
  const fetchUsers = useStore((state)=>state.fetchUsers);  
  const users = useStore((state)=>state.users);
  const loading = useStore((state)=>state.loading);
  const error = useStore((state)=>state.error);
  // Fetch users from the API when the component mounts
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Filter users based on search text
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchText.toLowerCase())
  );

  // Show only the first 5 users from the filtered list
  const displayedUsers = filteredUsers.slice(0, 5);

  if (loading) {
    return <p>Loading...</p>;  // Display loading message while data is being fetched
  }

  if (error) {
    return <p>Error: {error}</p>;  // Display error message if fetch fails
  }

  return (
    <div className="mb-2">
      <button
        onClick={togglePopup}
        className="w-full transition duration-300 px-4 py-2 border-2 border-black rounded-full font-medium hover:bg-black hover:text-white"
      >
        Add Members
      </button>
      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h3 className="text-lg font-medium mb-4 text-center">Select Members</h3>
            <input
              type="text"
              placeholder="Search members..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="block w-full px-4 py-2 mb-4 border rounded-full text-sm"
            />
            <ul className="mb-4">
              {displayedUsers.map((user) => (
                <li
                  key={user._id}  // Assuming each user has a unique _id
                  onClick={() => handleAddMember(user)}
                  className="py-2 px-4 cursor-pointer"
                >
                  {user.username}  {/* Display the username */}
                </li>
              ))}
            </ul>
            <button
              onClick={togglePopup}
              className="w-full px-4 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
