/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function AddExpense({ members, onClose, onSubmit }) {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [splitType, setSplitType] = useState("equal");
  const [splitDetails, setSplitDetails] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { groupId } = useParams();
  const userId = sessionStorage.getItem('userId');
  console.log("userId", userId);
  const handleSplitChange = (memberName, value) => {
    setSplitDetails((prev) => ({
      ...prev,
      [memberName]: value,
    }));
  };

  const validateFields = () => {
    const newErrors = {};
    if(!name){
      newErrors.name = "Please enter a valid expense name.";
    }
    if (!amount || Number(amount) <= 0) {
      newErrors.amount = "Please enter a valid expense amount.";
    }

    if (splitType !== "equal") {
      const invalidMembers = members.filter((member) => {
        const value = splitDetails[member.username];
        return !value || Number(value) <= 0;
      });

      if (invalidMembers.length > 0) {
        newErrors.splitDetails = `Please provide a valid ${
          splitType === "percentage" ? "percentage" : "amount"
        } for all members.`;
      }

      if (splitType === "percentage") {
        const totalPercentage = Object.values(splitDetails).reduce(
          (sum, val) => sum + Number(val || 0),
          0
        );
        if (totalPercentage !== 100) {
          newErrors.splitDetails = "Total percentage must equal 100%.";
        }
      } else if (splitType === "exact") {
        const totalAmount = Object.values(splitDetails).reduce(
          (sum, val) => sum + Number(val || 0),
          0
        );
        if (totalAmount !== Number(amount)) {
          newErrors.splitDetails =
            "Total exact amounts must equal the expense amount.";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateFields()) {
      setIsSubmitting(true);

      let formattedSplitDetails = [];

      if (splitType === "equal") {
        const equalShare = Number(amount) / members.length;
        formattedSplitDetails = members.map((member) => ({
          user: member._id,
          amount: equalShare,
        }));
      } else if (splitType === "percentage") {
        formattedSplitDetails = members.map((member) => ({
          user: member._id,
          amount: Number(splitDetails[member.username] || 0),
        }));
      } else if (splitType === "exact") {
        formattedSplitDetails = members.map((member) => ({
          user: member._id,
          amount: Number(splitDetails[member.username] || 0),
        }));
      }

      const expenseData = {
        userId,
        totalAmount: Number(amount),
        splitType,
        splitDetails: formattedSplitDetails,
        groupId,
      };

      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/expenses/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(expenseData),
        });

        if (!response.ok) {
          throw new Error("Failed to add expense.");
        }

        const data = await response.json();
        onSubmit(data);
        onClose();
      } catch (error) {
        console.error("Error adding expense:", error);
        alert("An error occurred while adding the expense. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] max-h-[80vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Add Expense</h3>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Expense Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Expense Name"
            className={`block w-full border-2 rounded-full p-2 ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Expense Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter total amount"
            className={`block w-full border-2 rounded-full p-2 ${
              errors.amount ? "border-red-500" : ""
            }`}
          />
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Split By</label>
          <select
            value={splitType}
            onChange={(e) => setSplitType(e.target.value)}
            className="block w-full border-2 rounded-full p-2"
          >
            <option value="equal">Split Equally</option>
            <option value="percentage">Split by Percentage</option>
            <option value="exact">Split by Exact Amount</option>
          </select>
        </div>

        {splitType !== "equal" && (
          <div className="mb-4">
            <h4 className="font-semibold mb-2">
              {splitType === "percentage"
                ? "Enter Percentage for Each Member"
                : "Enter Exact Amount for Each Member"}
            </h4>
            {members.map((member, index) => (
              <div key={index} className="flex items-center mb-2">
                <span className="mr-4 w-1/3">{member.username}</span>
                <input
                  type="number"
                  value={splitDetails[member.username] || ""}
                  onChange={(e) =>
                    handleSplitChange(member.username, e.target.value)
                  }
                  placeholder={`Enter ${
                    splitType === "percentage" ? "%" : "amount"
                  }`}
                  className={`w-2/3 border-2 rounded-full p-2 ${
                    errors.splitDetails ? "border-red-500" : ""
                  }`}
                />
              </div>
            ))}
            {errors.splitDetails && (
              <p className="text-red-500 text-sm mt-1">{errors.splitDetails}</p>
            )}
          </div>
        )}

        <div className="flex justify-end mt-4">
          <button
            className={`bg-black text-white py-2 px-4 rounded-full ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          <button
            className="border-2 border-black py-1 px-4 rounded-full ml-2"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
