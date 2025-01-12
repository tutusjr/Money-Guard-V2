import React, { useEffect, useState } from "react";
import styles from "./Currency.module.css";
import { useSelector } from "react-redux";
import { selectedCurrency } from "../../../redux/bankApi/selectors";

const CurrencyTab = () => {

  const currencies = useSelector(selectedCurrency)

  console.log(currencies)

  currencies.map((currency) => {
    console.log(currency.Isim);
  });

  return (
    <div className={styles.currencyTab}>
      <div className={styles.tableWrapper}>
        <table className={styles.currencyTable}>
          <thead>
            <tr>
              <th>Currency</th>
              <th>Purchase</th>
              <th>Sale</th>
            </tr>
          </thead>
          <tbody>
            {currencies.map((currency, index) => (
              <tr key={index}>
                <td>{currency.CurrencyName}</td>
                <td>{(currency.ForexBuying).toFixed(2)}</td>
                <td>{Number(currency.ForexSelling).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.backgroundSvg}>
        <svg width="100%" height="167" viewBox="0 0 480 167" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M38.4 42.1037L0 67.5585V167H480V22.0282C478.251 21.335 475.705 21.1035 474.624 21.0492C466.207 20.6267 461.379 24.6567 454.656 28.3919L454.573 28.4384C452.585 29.5434 447.614 32.3081 438.528 32.3081C429.312 32.3081 422.912 29.6973 420.864 28.3919L390.144 7.83226C386.048 5.22151 377.088 0 367.104 0C357.12 0 349.184 5.22151 345.6 7.83226L203.52 95.461C201.216 97.0927 194.15 100.356 184.32 100.356C174.49 100.356 167.424 97.0927 165.12 95.461L82.944 39.6561C80.128 37.6981 71.8848 33.7819 61.44 33.7819C50.9952 33.7819 41.728 39.3298 38.4 42.1037Z" fill="url(#paint0_linear_15_252)" fillOpacity="0.6"/>
          <path d="M38.4 42.1037L0 67.5585V167H480V22.0282C478.251 21.335 475.705 21.1035 474.624 21.0492C466.207 20.6267 461.379 24.6567 454.656 28.3919L454.573 28.4384C452.585 29.5434 447.614 32.3081 438.528 32.3081C429.312 32.3081 422.912 29.6973 420.864 28.3919L390.144 7.83226C386.048 5.22151 377.088 0 367.104 0C357.12 0 349.184 5.22151 345.6 7.83226L203.52 95.461C201.216 97.0927 194.15 100.356 184.32 100.356C174.49 100.356 167.424 97.0927 165.12 95.461L82.944 39.6561C80.128 37.6981 71.8848 33.7819 61.44 33.7819C50.9952 33.7819 41.728 39.3298 38.4 42.1037Z" fill="#390096" fillOpacity="0.2"/>
          <defs>
            <linearGradient id="paint0_linear_15_252" x1="240" y1="18.5" x2="240" y2="146" gradientUnits="userSpaceOnUse">
              <stop stopColor="white"/>
              <stop offset="0.374892" stopColor="white" stopOpacity="0.536458"/>
              <stop offset="0.6091" stopColor="white" stopOpacity="0.269957"/>
              <stop offset="0.766012" stopColor="white" stopOpacity="0.151176"/>
              <stop offset="1" stopColor="white" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default CurrencyTab;

