/* eslint-disable react/prop-types */

export default function MemberManagement({isPopupVisible, togglePopup, searchText,setSearchText,handleAddMember}) {
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
            <h3 className="text-lg font-medium mb-4 text-center">
              Select Members
            </h3>
            <input
              type="text"
              placeholder="Search members..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="block w-full px-4 py-2 mb-4 border rounded-full text-sm"
            />
            <ul className="mb-4">
              {["Alice", "Bob", "Charlie", "David"] // Replace with actual member data
                .filter((name) =>
                  name.toLowerCase().includes(searchText.toLowerCase())
                )
                .map((name) => (
                  <li
                    key={name}
                    onClick={() => handleAddMember(name)}
                    className="py-2 px-4 cursor-pointer "
                  >
                    {name}
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
  