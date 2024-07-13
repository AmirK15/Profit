import { create } from 'zustand';

type Transaction = {
  id: number;
  category: string;
  description: string;
  date: string;
  price: number;
};

interface TransactionsState {
  transactions: Transaction[];
  getAllTransactions: () => void;
  createTransaction: (price: number) => void;
}

export const useTransactionsStore = create<TransactionsState>()(set => ({
  transactions: [],

  getAllTransactions: async () => {
    const result = await fetch('https://6502dc82a0f2c1f3faeafec8.mockapi.io/transactions');
    const data = await result.json();
    set({ transactions: data });
  },

  createTransaction: async (price: number) => {
    // todo change endpoint source
    // await fetch('https://example.org/post', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ id: Math.random(), category: '', description: 'Dinner', date: '', price: price }),
    // });

    set(state => ({
      transactions: [
        ...state.transactions,
        { id: Math.random(), category: '', description: 'Dinner', date: '', price: price },
      ],
    }));
  },
}));
