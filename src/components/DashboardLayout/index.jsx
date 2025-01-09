import { Outlet } from "react-router";
import Header from "../Header";
import Navigation from "../Sidebar/Navigation";
import Balance from "../Sidebar/Balance";
import CurrencyTab from "../Sidebar/Currency";
import styles from "./DashboardLayout.module.css";

const DashboardLayout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <div className={styles.sidebarWrapper}>
          <Navigation />
          <div className={styles.sidebarContent}>
            <Balance />
            <div className={styles.currencyWrapper}>
              <CurrencyTab />
            </div>
          </div>
        </div>
        <div className={styles.contentWrapper}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;

