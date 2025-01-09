import StatisticsDashboard from "../StatisticsDashboard/StatisticsDashboard";
import Chart from "../Chart/Chart";
import styles from "./StatisticsTab.module.css";

const StatisticsTab = () => {
  return (
      <div className={styles.statisticsTab}>
        <div className={styles.chartContainer}>
          <Chart className={styles.chart} />
        </div>
        <div className={styles.statisticsDashboardContainer}>
          <StatisticsDashboard />
        </div>
      </div>
  );
};

export default StatisticsTab;
