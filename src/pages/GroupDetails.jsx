/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import AddExpense from "../components/GroupDetailsPage/AddExpense";
import { useParams } from "react-router-dom";
import Transaction from "../components/GroupDetailsPage/Transaction";
import Header from "../components/GroupDetailsPage/Header";
import useStore from '../store/store';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'; 
export default function GroupDetails() {
 
  const [showAllMembers, setShowAllMembers] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showBalancesModal, setShowBalancesModal] = useState(false); 
  const [showSettleUpModal, setShowSettleUpModal] = useState(false);
  // transactions state
  const userId = sessionStorage.getItem("userId");
  const { groupId } = useParams();
  const fetchTransactions = useStore((state) => state.fetchTransactions);
  const transactions = useStore((state) => state.transactions);
  const fetchGroupDetails = useStore((state) => state.fetchGroupDetails);
  const loading = useStore((state) => state.transationLoading);
  const groupMembers = useStore((state) => state.members);
  const [balances, setBalances] = useState(groupMembers);
  const settleExpense = useStore((state) => state.settleExpense);
  console.log("sdfsf", transactions)
  console.log("lora mera pehly", loading)
  useEffect(() => {
    fetchTransactions(groupId, userId);
  }, [groupId, userId, fetchTransactions]);
  useEffect(() => {
    fetchGroupDetails(groupId);
  }, [fetchGroupDetails, groupId]);

  

  const handleAddExpense = () => {
    fetchTransactions(groupId, userId);
    setShowAddExpenseModal(false);
    // Update balances logic here
  };

  const handleCloseBalancesModal = () => {
    alert('Not implemented yet');
    setShowBalancesModal(false);
  };

  const handleCloseSettleUpModal = () => {
    setShowSettleUpModal(false); // Close settle-up modal
    fetchTransactions(groupId, userId);
  };

  const handleSettleSelectedExpense = async (expenseId, balanceId) => {
    fetchTransactions(groupId, userId);
    setShowSettleUpModal(false); 
    settleExpense(expenseId, balanceId);
  };

  const visibleMembers = showAllMembers ? groupMembers : groupMembers.slice(0, 3);
  if (loading) {
    return (
      <p className='h-screen text-subHeading flex items-center justify-center dark:text-light-primaryText'>
      <AiOutlineLoading3Quarters className='animate-spin' size={40} />
    </p>
    );
  }
  
  return (
    <div className="pt-24 min-h-screen text-black">
      {/* Header Section */}
     <Header setShowSettleUpModal = {setShowSettleUpModal} setShowBalancesModal = {setShowBalancesModal} visibleMembers = {visibleMembers} groupMembers = {groupMembers} showAllMembers = {showAllMembers} setShowAllMembers= {setShowAllMembers} transactions={transactions}/>

      {/* Transactions Section */}
     <Transaction setShowAddExpenseModal={setShowAddExpenseModal} transactions={transactions} />

      {/* Add Expense Modal */}
      {showAddExpenseModal && (
        <AddExpense
          members={groupMembers}
          showModal={showAddExpenseModal}
          onClose={() => setShowAddExpenseModal(false)}
          onSubmit={handleAddExpense}
        />
      )}

      {/* Balances Modal */}
      {showBalancesModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h3 className="text-lg font-semibold mb-4">Group Balances</h3>
            <ul>
              {balances.map((member, index) => (
                <li key={index} className="flex justify-between py-2 border-b">
                  <span>{member.name}</span>
                  <span className="font-semibold">{member.owes}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-end mt-4">
              <button
                className="bg-black text-white py-1 px-4 rounded-full"
                onClick={handleCloseBalancesModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settle Up Modal */}
      {showSettleUpModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
    <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
      <h3 className="text-lg font-semibold mb-4">Select Expense to Settle</h3>
      <div className="max-h-64 overflow-y-auto">
        <ul>
          {transactions.length > 0 ? transactions.map((expense, index) => (
            <li key={index} className="flex justify-between py-2 border-b">
              <span>{expense.label}</span>
              <span className="font-semibold">{expense.amount}</span>
              <button
                onClick={() => handleSettleSelectedExpense(expense.expenseId, expense.balanceId)}
                className="ml-4 bg-black text-white text-sm py-1 px-4 rounded-full"
              >
                Settle
              </button>
            </li>
          )) : <p className="text-center">No expenses to settle.</p>}
        </ul>
      </div>
      <div className="flex justify-end mt-4">
        <button
          className="border-2 border-black text-sm py-1 px-4 rounded-full"
          onClick={handleCloseSettleUpModal}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
