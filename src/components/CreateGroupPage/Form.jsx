/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useState } from "react";
import MemberManagement from "./MemeberManagement";
import GroupTypeSelector from "./GroupTypeSelector";

export default function Form({
  selectedGroupType,
  searchText,
  handleGroupTypeClick,
  togglePopup,
  handleAddMember,
  membersId,
  isPopupVisible,
  setSearchText,
}) {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState([]); // Store only member IDs
  const [groupImage, setGroupImage] = useState(null); // Placeholder for image
  const [loading, setLoading] = useState(false);

  const handleCreateGroup = async () => {
    if (!groupName || !description || !selectedGroupType) {
      alert("Please fill all required fields.");
      return;
    }

    const requestBody = {
      groupName,
      description,
      groupImage,
      groupType: selectedGroupType,
      members : membersId, // Store only the member IDs
    };

    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/groups/create`, {
        method: "POST",
        headers: {
          "Authorization": sessionStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Group created successfully!");
        console.log(data.group);
        // Reset form or redirect
      } else {
        alert(`Failed to create group: ${data.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-2">
        <label htmlFor="groupName" className="block text-gray-600 font-medium mb-1 text-sm">
          Group Name
        </label>
        <input
          type="text"
          id="groupName"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Enter group name"
          className="block w-full px-3 py-2 border rounded-full shadow-sm focus:ring-purple-500 focus:border-purple-500 text-sm"
        />
      </div>

      {/* Description */}
      <div className="mb-2">
        <label htmlFor="description" className="block text-gray-600 font-medium mb-1 text-sm">
          Description
        </label>
        <textarea
          id="description"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          className="block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-sm"
        ></textarea>
      </div>

      {/* Member Management */}
      <MemberManagement
        isPopupVisible={isPopupVisible}
        togglePopup={togglePopup}
        searchText={searchText}
        setSearchText={setSearchText}
        handleAddMember={handleAddMember} // Only store member ID
      />

      {/* Group Type */}
      <GroupTypeSelector
        selectedGroupType={selectedGroupType}
        handleGroupTypeClick={handleGroupTypeClick}
      />

      {/* Buttons */}
      <div className="flex flex-col gap-2 my-3">
        <div className="flex justify-between gap-3">
          <button
            className="px-4 font-medium py-2 w-1/4 border-2 border-black rounded-full hover:underline focus:outline-none focus:ring-2 focus:ring-opacity-50 text-sm"
            onClick={() => {
              // Reset form logic
              setGroupName("");
              setDescription("");
              setMembers([]); // Clear members list
              setGroupImage(null);
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleCreateGroup}
            disabled={loading}
            className="px-4 py-2 w-3/4 bg-black text-white rounded-full font-medium focus:outline-none focus:ring-2 focus:ring-opacity-50 hover:underline text-sm"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </>
  );
}
