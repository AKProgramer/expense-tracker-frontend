import { useState } from "react";
import TableHeader from "../components/ApprovalPage/TableHeader";
import TableRow from "../components/ApprovalPage/TableRow";
import ConfirmModal from "../components/ApprovalPage/confirmModal";

const initialData = [
  {
    id: 1,
    owner: { name: "Samson Zap", role: "Engineer", avatar: "https://via.placeholder.com/40" },
    category: { name: "Travel", color: "#3B3B6D" },
    amount: "€780.00",
    frequency: "Once",
    status: null,
  },
  {
    id: 2,
    owner: { name: "Jessica Bowers", role: "Designer", avatar: "https://via.placeholder.com/40" },
    category: { name: "Travel", color: "#3B3B6D" },
    amount: "€430.00",
    frequency: "Once",
    status: null,
  },
  {
    id: 3,
    owner: { name: "John Wilson", role: "Account Executive", avatar: "https://via.placeholder.com/40" },
    category: { name: "Food", color: "#8B0000" },
    amount: "€95.50",
    frequency: "Monthly",
    status: null,
  },
  {
    id: 3,
    owner: { name: "John Wilson", role: "Account Executive", avatar: "https://via.placeholder.com/40" },
    category: { name: "Food", color: "#8B0000" },
    amount: "€95.50",
    frequency: "Monthly",
    status: null,
  },
  {
    id: 3,
    owner: { name: "John Wilson", role: "Account Executive", avatar: "https://via.placeholder.com/40" },
    category: { name: "Food", color: "#8B0000" },
    amount: "€95.50",
    frequency: "Monthly",
    status: null,
  },
  {
    id: 3,
    owner: { name: "John Wilson", role: "Account Executive", avatar: "https://via.placeholder.com/40" },
    category: { name: "Food", color: "#8B0000" },
    amount: "€95.50",
    frequency: "Monthly",
    status: null,
  },
  {
    id: 3,
    owner: { name: "John Wilson", role: "Account Executive", avatar: "https://via.placeholder.com/40" },
    category: { name: "Food", color: "#8B0000" },
    amount: "€95.50",
    frequency: "Monthly",
    status: null,
  },
];

const ApprovalPage = () => {
  const [data, setData] = useState(initialData);
  const [showModal, setShowModal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);

  const handleApprove = (id) => {
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, status: "approved" } : row))
    );
  };

  const handleReject = (id) => {
    setShowModal(true);
    setSelectedRowId(id);
  };

  const confirmReject = () => {
    setData((prevData) => prevData.filter((row) => row.id !== selectedRowId));
    setShowModal(false);
    setSelectedRowId(null);
  };

  const cancelReject = () => {
    setShowModal(false);
    setSelectedRowId(null);
  };

  return (
    <div className="p-6 min-h-screen">
      <TableHeader />
      <div className="mt-4">
        {data.map((row, index) => (
          <TableRow
            key={row.id}
            row={row}
            index={index}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        ))}
      </div>

      {showModal && (
        <ConfirmModal
          onConfirm={confirmReject}
          onCancel={cancelReject}
          message="Are you sure you want to reject this group?"
        />
      )}
    </div>
  );
};

export default ApprovalPage;