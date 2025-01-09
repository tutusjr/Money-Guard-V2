export const selectTransactions = (state) => state.transactions.transactionList;
export const selectStatus = (state) => state.transactions.status;
export const selectTransactionsIsLoading = (state) =>
  state.transactions.isLoading;
export const selectTransactionsError = (state) => state.transactions.error;
export const selectCategories = (state) => state.transactions.categories;
export const selectTransactionsByDate = (state) =>
  state.transactions.transactionsByDate;
export const selectLoadingStatus = (state) => state.transactions.isLoading;
export const selectTotalBalance = (state) =>
  state.transactions.transactionList.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
