import { create } from 'zustand';
import { db } from './firebase-config';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export type Transaction = {
  id: number;
  sum: number;
  category: string;
  description: string;
  date: string;
};

interface TransactionsState {
  transactions: Transaction[];
  getAllTransactions: () => void;
  createTransaction: (transactionInfo: Omit<Transaction, 'id'>) => void;
}

const transactionsCollection = collection(db, 'transactions');

export const useTransactionsStore = create<TransactionsState>()(set => ({
  transactions: [],

  getAllTransactions: async () => {
    const data = await getDocs(transactionsCollection);
    // @ts-ignore
    set({ transactions: data.docs.map(item => ({ id: item.id, ...item.data() })) });
  },

  createTransaction: async transactionInfo => {
    await addDoc(transactionsCollection, transactionInfo);
  },
}));
