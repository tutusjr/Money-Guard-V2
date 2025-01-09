import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTransactions,
  addTransaction,
  deleteTransaction,
  editTransaction,
  fetchCategories,
  fetchTransactionsByDate,
} from "./operations";

const initialState = {
  transactionList: [],
  status: "idle",
  error: null,
  isLoading: false,
  categories: [],
  transactionsByDate: []
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  extraReducers: (builder) => {
    builder
      // Fetch transactions
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactionList = action.payload;
        state.isLoading = false;
        state.error = null;
        state.status = "success";
      })
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = "failed";
      })

      // Add transaction
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactionList.push(action.payload);
        state.isLoading = false;
        state.error = null;
        state.status = "success";
      })
      .addCase(addTransaction.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = "failed";
      })

      // Edit transaction
      .addCase(editTransaction.fulfilled, (state, action) => {
        const updatedTransaction = action.payload;
        const index = state.transactionList.findIndex(
          (transaction) => transaction.id === updatedTransaction.id
        );
        if (index !== -1) {
          state.transactionList[index] = updatedTransaction;
        }
        state.isLoading = false;
        state.error = null;
        state.status = "success";
      })
      .addCase(editTransaction.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(editTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = "failed";
      })

      // Delete transaction
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactionList = state.transactionList.filter(
          (transaction) => transaction.id !== action.payload
        );
        state.isLoading = false;
        state.error = null;
        state.status = "success";
      })
      .addCase(deleteTransaction.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = "failed";
      })

      // Fetch categories
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.isLoading = false;
        state.error = null;
        state.status = "success";
      })
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = "failed";
      })
      //Fetch by date
      .addCase(fetchTransactionsByDate.fulfilled, (state, action) => {
        state.status = "success";
        state.transactionsByDate = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchTransactionsByDate.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(fetchTransactionsByDate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export default transactionSlice.reducer;
