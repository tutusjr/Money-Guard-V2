import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "../../redux/transaction/selectors";
import { openModal } from "../../redux/modal/slice";
import { deleteTransaction } from "../../redux/transaction/operations";
import styles from './MobileTransactionCard.module.css';
import toast from 'react-hot-toast';

const MobileTransactionCard = ({ transaction }) => {
  const { id, transactionDate, type, categoryId, comment, amount } = transaction;
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const myCategory = categories.find(category => category.id === categoryId);

  const handleDelete = async (id) => {
   const response = await dispatch(deleteTransaction(id));
   if (response.meta.requestStatus === "fulfilled"){
    toast.success("Transaction deleted successfully");
    
  }
  if (response.meta.requestStatus === "rejected"){
      toast.error("An error occurred. Please try again later.");
  }
  }

  return (
    <div className={styles.mobileCard}>
      <div className={styles.cardContent}>
        <div className={styles.cardRow}>
          <span className={styles.cardLabel}>Date</span>
          <span className={styles.cardValue}>
            {new Date(transactionDate).toLocaleDateString()}
          </span>
        </div>
        <div className={styles.cardRow}>
          <span className={styles.cardLabel}>Type</span>
          <span className={`${styles.cardValue} ${type === "EXPENSE" ? styles.typeExpense : styles.typeIncome}`}>
            {type === "EXPENSE" ? "-" : "+"}
          </span>
        </div>
        <div className={styles.cardRow}>
          <span className={styles.cardLabel}>Category</span>
          <span className={styles.cardValue}>{myCategory?.name}</span>
        </div>
        <div className={styles.cardRow}>
          <span className={styles.cardLabel}>Comment</span>
          <span className={styles.cardValue}>{comment}</span>
        </div>
        <div className={styles.cardRow}>
          <span className={styles.cardLabel}>Sum</span>
          <span className={`${styles.cardValue} ${type === "EXPENSE" ? styles.sumNegative : styles.sumPositive}`}>
            {amount.toFixed(2)}
          </span>
        </div>
      </div>
      <div className={styles.cardActions}>
        <button 
          className={styles.editBtn} 
          onClick={() => dispatch(openModal({mode:"edit", id}))}
        >
          ✏️
        </button>
        <button 
          className={styles.deleteBtn}
          onClick={() => handleDelete(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MobileTransactionCard;

