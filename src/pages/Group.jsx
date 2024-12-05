/* eslint-disable no-undef */
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import GroupCard from "../components/GroupPage/GroupCard";
import { MdFamilyRestroom, MdPerson, MdHome } from "react-icons/md";
const fetchGroups = async (userId, token) => {
  
 
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/groups/${userId}`, {
    method: "GET",
    headers: {
      "Authorization": `${token}`, 
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch groups");
  }
  return response.json();
};

const Group = () => {
  const token = sessionStorage.getItem('token');
  const userId = sessionStorage.getItem('userId'); // Replace this with the user ID stored in the session or context
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["groups", userId],
    queryFn: () => fetchGroups(userId, token),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const groups = data.groups.map((group) => ({
    id: group._id,
    name: group.groupName,
    type: group.groupType,
    icon:
      group.groupType === "Home" ? (
        <MdHome size={25} />
      ) : group.groupType === "Trip" ? (
        <MdFamilyRestroom size={25} />
      ) : (
        <MdPerson size={25} />
      ),
    members: group.members.map((member) => member.username),
    totalAmount: "245.00", // Replace with actual amount if available
  }));
 
    

  return (
    <div className="p-6 bg-gray-100 text-black min-h-screen font-poppins pt-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Groups</h1>
        <Link
          to="/create-group"
          className="bg-black hover:bg-blue-600 text-white py-2 px-4 rounded-full"
        >
          + Create Group
        </Link>
      </div>

     {data.groups.length > 0 && <GroupCard groups={groups} />}
    </div>
  );
};

export default Group;
