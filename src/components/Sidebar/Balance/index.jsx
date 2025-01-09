import React, { useEffect, useState } from "react";
import styles from "./Balance.module.css";
import { useSelector } from "react-redux";
import { selectTotalBalance } from "../../../redux/transaction/selectors";

const Balance = () => {
  const totalBalance = useSelector(selectTotalBalance);

  return (
    <div className={styles.balanceContainer}>
      <h2 className={styles.balanceTitle}>YOUR BALANCE</h2>
      <p className={styles.balanceAmount}>
        <span className={styles.currencySymbol}>₴</span>
        <span className={styles.amount}>
          {totalBalance.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      </p>
    </div>
  );
};

export default Balance;
