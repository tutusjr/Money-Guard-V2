import styles from "./StatisticsDashboard.module.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTransactionsByDate } from "../../../redux/transaction/operations";
import StatisticsTable from "../StatisticsTable/StatisticsTable";

const StatisticsDashboard = () => {
  const dispatch = useDispatch();
  const currentYear = new Date().getFullYear();

  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: new Date(0, i).toLocaleString("en-US", { month: "long" }),
  }));

  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    dispatch(
      fetchTransactionsByDate({
        month: selectedMonth || undefined,
        year: selectedYear || undefined,
      })
    );
  }, [selectedMonth, selectedYear, dispatch]);

  return (
    <div className={styles.statisticsDashboard}>
      <div className={styles.selectors}>
      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
      >
        <option value="">Select Year</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      >
        <option value="">Select Month</option>
        {months.map((month) => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </select>
      </div>

      <StatisticsTable className={styles.statisticTable} />
    </div>
  );
};

export default StatisticsDashboard;
