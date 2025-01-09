import { useSelector, useDispatch } from "react-redux";
import { selectTransactions } from "../../redux/transaction/selectors";
import { openModal } from "../../redux/modal/slice";
import styles from "./TransactionList.module.css";
import TransactionItem from "../TransactionsItem";
import MobileTransactionCard from "../MobileTransactionCard";
import { Plus } from "lucide-react";

const TransactionList = () => {
  const transactions = useSelector(selectTransactions);
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(openModal({ mode: "add" }));
  };

  return (
    <div className={styles.tableContainer}>
      {/* Desktop View */}
      <div className={styles.tableWrapper}>
        <table className={styles.transactionTable}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Category</th>
              <th>Comment</th>
              <th>Sum</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-white text-center">
                  No transactions yet. Start by adding your first income or
                  expense!
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className={styles.mobileWrapper}>
        {transactions.map((transaction) => (
          <MobileTransactionCard
            key={transaction.id}
            transaction={transaction}
          />
        ))}
      </div>

      <button className={styles.addButton} onClick={handleAdd}>
        <Plus />
      </button>
    </div>
  );
};

export default TransactionList;
