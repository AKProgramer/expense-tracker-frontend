/* eslint-disable no-undef */
import { create } from "zustand";

const useStore = create((set) => ({
  groups: [],
  users: [],
  transactions: [],
  transationLoading: false,
  members: [],
  loading: false,
  error: null,

  fetchGroups: async (userId, token) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/groups/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch groups");
      }
      const data = await response.json();
      set({ groups: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchGroupMembers: async (groupId) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/groups/${groupId}/members`);
      if (!response.ok) {
        throw new Error("Failed to fetch group members");
      }
      const data = await response.json();
      set({ users: data.members, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchTransactions: async (groupId, userId) => {
    set({ transationLoading: true, error: null });
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/groups/${groupId}/${userId}/user-balances`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
      const data = await response.json();
      const transformedData = data.balances.map((item) => ({
        label: item.action === "give" ? `You owe ${item.toUser}` : `${item.fromUser} owes you`,
        expenseName: item.expenseName,
        expenseId: item.expenseId,
        balanceId: item.balanceId,
        amount: `€${item.amount.toFixed(2)}`,
        status: item.action === "give" ? "borrowed" : "owed",
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
      }));
      transformedData.totalOwed = data.totalOwed;
      transformedData.groupName = data.groupName;
      set({ transactions: transformedData, transationLoading: false });
    } catch (error) {
      set({ error: error.message, transationLoading: false });
    }
  },

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/getAllUsers`);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      set({ users: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  fetchGroupDetails: async (groupId) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/groups/${groupId}/members`);
      if (!response.ok) {
        throw new Error("Failed to fetch group details");
      }
      const data = await response.json();
      set({ members: data.members, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  settleExpense: async (expenseId, balanceId) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/expenses/settle-up`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expenseId, balanceId }),
      });

      if (!response.ok) {
        throw new Error("Failed to settle the expense");
      }

      const data = await response.json();
      set({ transactions: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useStore;
