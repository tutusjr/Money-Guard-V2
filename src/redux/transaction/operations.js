import { createAsyncThunk } from "@reduxjs/toolkit";
import { costumAxiosInstance, setAxios } from "../api/authAxios";

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (_, thunkAPI) => {
    try {
      const response = await costumAxiosInstance.get("/api/transactions");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (transactionData, thunkAPI) => {
    try {
      const response = await costumAxiosInstance.post(
        "api/transactions",
        transactionData
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (transactionId, thunkAPI) => {
    try {
      await costumAxiosInstance.delete(`/api/transactions/${transactionId}`);
      return transactionId;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const editTransaction = createAsyncThunk(
  "transactions/editTransaction",
  async ({ transactionId, updateTransaction }, thunkAPI) => {
    try {
      const response = await costumAxiosInstance.patch(
        `/api/transactions/${transactionId}`,
        updateTransaction
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "transactions/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const response = await costumAxiosInstance.get(
        "api/transaction-categories"
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchTransactionsByDate = createAsyncThunk(
  "transactions/fetchTransactionsByDate",
  async ({ month, year } = {}, thunkAPI) => {
    try {
      const query = month && year ? `?month=${month}&year=${year}` : "";
      const response = await costumAxiosInstance.get(
        `/api/transactions-summary${query}`
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
